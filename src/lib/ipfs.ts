export type PinResult = { pinned: boolean; cid: string };
export type UploadResult = { cid: string; name?: string };

function getApiBase(): string {
  const envUrl = (import.meta as any).env?.VITE_IPFS_API_URL as string | undefined;
  // In Vite dev, use the proxy to avoid CORS when targeting local daemon
  try {
    if (typeof window !== 'undefined' && (location.port === '8080' || location.port === '8081')) {
      return '/ipfs-api';
    }
  } catch {}
  return envUrl || 'http://127.0.0.1:5002';
}

// Quick health check to see if a local IPFS API is reachable
// Calls /api/v0/version and returns true if reachable
export async function ipfsHealthCheck(): Promise<{ ok: boolean; message?: string }>{
  const api = getApiBase().replace(/\/$/, '');
  const auth = (import.meta as any).env?.VITE_IPFS_API_AUTH as string | undefined; // e.g., "Bearer <token>" or "Basic <b64>"
  try {
    const res = await fetch(`${api}/api/v0/version`, { method: 'POST', headers: auth ? { authorization: auth } : undefined });
    if (!res.ok) return { ok: false, message: `IPFS API responded with ${res.status}` };
    return { ok: true };
  } catch (e: any) {
    // If proxy fails, try direct connection
    if (api.includes('/ipfs-api')) {
      try {
        const directRes = await fetch('http://127.0.0.1:5002/api/v0/version', { method: 'POST', headers: auth ? { authorization: auth } : undefined });
        if (directRes.ok) return { ok: true };
      } catch {}
    }
    return { ok: false, message: e?.message || 'Failed to reach IPFS API' };
  }
}

// Pin by CID using the IPFS HTTP API directly (no external client lib)
// API: POST /api/v0/pin/add?arg=<cid>&recursive=true
export async function pinByCID(cid: string): Promise<PinResult> {
  const clean = cid.startsWith('ipfs://') ? cid.slice('ipfs://'.length) : cid;
  const api = getApiBase().replace(/\/$/, '');
  const auth = (import.meta as any).env?.VITE_IPFS_API_AUTH as string | undefined; // optional
  try {
    const res = await fetch(`${api}/api/v0/pin/add?arg=${encodeURIComponent(clean)}&recursive=true`, {
      method: 'POST',
      headers: auth ? { authorization: auth } : undefined
    });
    if (!res.ok) {
      // Map common cases to clearer guidance
      if (res.status === 403) {
        // Likely CORS on local IPFS API. Provide actionable hint.
        throw new Error(
          'IPFS pin failed: 403. If using a local IPFS daemon, enable CORS for http://localhost:8080 and http://127.0.0.1:8080.\n' +
          'Run: ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\",\"http://localhost:8080\",\"http://127.0.0.1:8080\"]" && \\\n' +
          '     ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"GET\",\"POST\"]" && \\\n' +
          '     ipfs daemon'
        );
      }
      throw new Error(`IPFS pin failed: ${res.status}`);
    }
    return { pinned: true, cid: clean };
  } catch (e) {
    console.warn('IPFS pin failed:', e);
    return { pinned: false, cid: clean };
  }
}

export function toGatewayUrl(uri: string) {
  const gateway = (import.meta as any).env?.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
  if (uri.startsWith('ipfs://')) return uri.replace('ipfs://', gateway);
  return uri;
}

// Upload a File to IPFS HTTP API and return its CID
// API: POST /api/v0/add (multipart/form-data) with field name 'file'
export async function uploadFileToIPFS(file: File): Promise<UploadResult> {
  const api = getApiBase().replace(/\/$/, '');
  const auth = (import.meta as any).env?.VITE_IPFS_API_AUTH as string | undefined;
  const form = new FormData();
  form.append('file', file, file.name || 'upload');
  
  const tryUpload = async (baseUrl: string) => {
    const url = `${baseUrl}/api/v0/add?pin=true&wrap-with-directory=false`;
    const res = await fetch(url, {
      method: 'POST',
      body: form,
      // Don't set content-type for FormData; browser will set proper boundary
      headers: auth ? { authorization: auth } : undefined,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`IPFS upload failed: ${res.status} ${text}`);
    }
    const text = await res.text();
    // Kubo can stream newline-delimited JSON; take the last JSON line
    const lastLine = text.trim().split(/\r?\n/).filter(Boolean).pop() || '{}';
    const json = JSON.parse(lastLine);
    const cid: string = json.Hash || json.Cid || json.cid || '';
    if (!cid) throw new Error('IPFS upload succeeded but no CID returned');
    return { cid, name: json.Name };
  };
  
  try {
    return await tryUpload(api);
  } catch (e: any) {
    // If proxy fails, try direct connection
    if (api.includes('/ipfs-api')) {
      try {
        return await tryUpload('http://127.0.0.1:5002');
      } catch {}
    }
    throw e;
  }
}
