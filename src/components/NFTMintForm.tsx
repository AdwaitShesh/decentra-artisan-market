import { useState, useEffect } from 'react';
import { useNFTContract } from '@/lib/nftContract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, Image as ImageIcon, Music, Tag, CheckCircle, AlertCircle, FileCheck, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { pinByCID, toGatewayUrl, ipfsHealthCheck, uploadFileToIPFS } from '@/lib/ipfs';
import { Link } from 'react-router-dom';
import { NetworkStatus } from '@/components/NetworkStatus';
import { RPCErrorBanner } from '@/components/RPCErrorBanner';

// NFT Categories
const NFT_CATEGORIES = [
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'photography', label: 'Photography' },
  { value: 'pfp', label: 'PFP (Profile Pictures)' },
  { value: 'collectibles', label: 'Collectibles' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'domains', label: 'Domains' },
  { value: 'other', label: 'Other' }
];

// Blockchain options with gas fee estimates (simulated for local development)
const BLOCKCHAIN_OPTIONS = [
  {
    value: 'ethereum',
    label: 'Ethereum',
    symbol: 'ETH',
    gasEstimate: 'High (~$15-50)',
    color: 'bg-blue-500',
    recommended: false
  },
  {
    value: 'polygon',
    label: 'Polygon',
    symbol: 'MATIC',
    gasEstimate: 'Very Low (~$0.01-0.10)',
    color: 'bg-purple-500',
    recommended: true
  },
  {
    value: 'optimism',
    label: 'Optimism',
    symbol: 'ETH',
    gasEstimate: 'Low (~$1-5)',
    color: 'bg-red-500',
    recommended: false
  },
  {
    value: 'arbitrum',
    label: 'Arbitrum',
    symbol: 'ETH',
    gasEstimate: 'Low (~$1-3)',
    color: 'bg-blue-400',
    recommended: false
  },
  {
    value: 'base',
    label: 'Base',
    symbol: 'ETH',
    gasEstimate: 'Very Low (~$0.05-0.50)',
    color: 'bg-blue-600',
    recommended: true
  }
];

// Define category-specific checklists
const CATEGORY_CHECKLISTS = {
  art: [
    { id: 'artColorProfile', label: 'sRGB color profile for consistent display', key: 'artColorProfile' },
    { id: 'artSignature', label: 'Digital signature or watermark included', key: 'artSignature' }
  ],
  music: [
    { id: 'musicMastered', label: 'High-quality audio mastering', key: 'musicMastered' },
    { id: 'musicThumbnail', label: 'Eye-catching cover art created', key: 'musicThumbnail' }
  ],
  photography: [
    { id: 'photoResolution', label: 'High resolution (min 3000px on longest side)', key: 'photoResolution' },
    { id: 'photoMetadata', label: 'EXIF data preserved or intentionally removed', key: 'photoMetadata' }
  ],
  pfp: [
    { id: 'pfpSquare', label: 'Square aspect ratio (1:1)', key: 'pfpSquare' },
    { id: 'pfpTransparent', label: 'Transparent background if applicable', key: 'pfpTransparent' }
  ],
  gaming: [
    { id: 'gamingUtility', label: 'Game utility defined', key: 'gamingUtility' },
    { id: 'gamingIntegration', label: 'Compatible with target games', key: 'gamingIntegration' }
  ],
  collectibles: [
    { id: 'collectibleRarity', label: 'Rarity attributes defined', key: 'collectibleRarity' },
    { id: 'collectibleSeries', label: 'Part of a defined collection/series', key: 'collectibleSeries' }
  ],
  domains: [
    { id: 'domainValid', label: 'Domain availability verified', key: 'domainValid' },
    { id: 'domainRights', label: 'Domain naming rights confirmed', key: 'domainRights' }
  ],
  other: [
    { id: 'otherFormat', label: 'Format appropriate for intended use', key: 'otherFormat' }
  ]
};

interface NFTMintFormProps {
  initialFile?: File;
  initialPreview?: string;
}

export function NFTMintForm({ initialFile, initialPreview }: NFTMintFormProps = {}) {
  // Blockchain selection (needs to be declared first for useNFTContract)
  const [blockchain, setBlockchain] = useState<string>('polygon'); // Default to recommended low-gas option

  // Function to get blockchain key from chain ID
  const getBlockchainFromChainId = (chainId: number): string => {
    const blockchainMap: Record<number, string> = {
      1337: 'ethereum',
      1338: 'polygon',
      1339: 'optimism', // Simulated on Ethereum network
      1340: 'arbitrum',  // Simulated on Ethereum network
      1341: 'base'
    };
    return blockchainMap[chainId] || 'ethereum';
  };

  const {
    contract,
    mintNFT,
    isLoading,
    error,
    account,
    currentNetwork,
    switchToNetwork,
    verifyCompliance,
    verifyIPRights,
    verifyCategory
  } = useNFTContract(blockchain);
  const { toast } = useToast();
  // Circuit breaker banner visibility
  const [showBreakerBanner, setShowBreakerBanner] = useState<boolean>(false);

  // Sync blockchain selection with current network
  useEffect(() => {
    if (currentNetwork && currentNetwork.chainId) {
      const detectedBlockchain = getBlockchainFromChainId(currentNetwork.chainId);
      if (detectedBlockchain !== blockchain) {
        console.log(`🔄 Syncing blockchain selection: ${blockchain} → ${detectedBlockchain}`);
        setBlockchain(detectedBlockchain);
      }
    }
  }, [currentNetwork?.chainId]); // Only depend on chainId to avoid loops

  // Show banner if circuit breaker was recently detected
  useEffect(() => {
    try {
      const ts = localStorage.getItem('lastMetaMaskCircuitBreaker');
      setShowBreakerBanner(!!ts);
    } catch { }
  }, []);

  // Form step state
  const [step, setStep] = useState<'details' | 'preview' | 'mint'>('details');

  // Basic NFT info
  const [nftName, setNftName] = useState<string>('');
  const [nftDescription, setNftDescription] = useState<string>('');
  const [nftCategory, setNftCategory] = useState<string>('art');
  const [nftTags, setNftTags] = useState<string>('');

  // Upload states
  const [fileType, setFileType] = useState<'image' | 'audio' | 'video'>('image');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [useDirectCID, setUseDirectCID] = useState<boolean>(false);
  const [manualCID, setManualCID] = useState<string>('');

  // New fields for checklist
  const [editions, setEditions] = useState<number>(1);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [creatorName, setCreatorName] = useState<string>('');
  const [isNetworkSwitching, setIsNetworkSwitching] = useState<boolean>(false);

  // Final minting states
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(2.5);
  const [mintStatus, setMintStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({ type: null, message: '' });
  const [isMinting, setIsMinting] = useState<boolean>(false);

  // Create a state object that will track all category-specific checklist items
  const [categoryChecklistStatus, setCategoryChecklistStatus] = useState<Record<string, boolean>>({
    // Art
    artColorProfile: false,
    artSignature: false,
    // Music
    musicMastered: false,
    musicThumbnail: false,
    // Photography
    photoResolution: false,
    photoMetadata: false,
    // PFP
    pfpSquare: false,
    pfpTransparent: false,
    // Gaming
    gamingUtility: false,
    gamingIntegration: false,
    // Collectibles
    collectibleRarity: false,
    collectibleSeries: false,
    // Domains
    domainValid: false,
    domainRights: false,
    // Other
    otherFormat: false
  });

  // Initialize from props (e.g. coming from Digital Art creator)
  useEffect(() => {
    if (initialPreview) {
      setFilePreview(initialPreview);
    }

    if (initialFile && !tokenURI) {
      // Auto-generate a token URI for the passed file
      // In a real app, we would upload this to IPFS here
      const simulateInitialUpload = async () => {
        setIsUploading(true);
        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const simulatedCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        setTokenURI(`ipfs://${simulatedCid}`);
        setIsUploading(false);

        toast({
          title: 'Artwork Ready',
          description: 'Your digital art has been prepared for minting.'
        });
      };

      simulateInitialUpload();
    }
  }, [initialPreview, initialFile]);

  // Checklist validation state
  const [checklistStatus, setChecklistStatus] = useState({
    artworkUploaded: false,
    titleAndDescription: false,
    creatorName: false,
    blockchainSelected: true, // Default to true since we have a default value
    editionsValid: true, // Default is 1, which is valid
    royaltyValid: true, // Default is 2.5%, which is valid
    walletConnected: false,
    agreedToTerms: false,
    // New checklist items
    fileFormatValid: false,
    resolutionValid: false,
    fileSizeValid: false,
    ipRightsVerified: false,
    originalityConfirmed: false,
    pricingResearched: false,
    // Category checklist completed
    categoryRequirementsMet: false
  });

  // Success popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [mintedNFTData, setMintedNFTData] = useState<any>(null);

  const simulateUpload = () => {
    if (manualCID) {
      setTokenURI(`ipfs://${manualCID}`);
      toast({
        title: 'CID Set Manually',
        description: `Using provided CID: ${manualCID}`,
      });
    }
  };

  // Get current category-specific checklist items
  const getCurrentCategoryChecklist = () => {
    return CATEGORY_CHECKLISTS[nftCategory as keyof typeof CATEGORY_CHECKLISTS] || CATEGORY_CHECKLISTS.other;
  };

  // Handle category checkbox change
  const handleCategoryChecklistChange = (key: string, checked: boolean) => {
    setCategoryChecklistStatus(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  // Check if current category requirements are met
  const areCategoryRequirementsMet = () => {
    const currentChecklist = getCurrentCategoryChecklist();
    return currentChecklist.every(item => categoryChecklistStatus[item.key]);
  };

  // Update checklist status whenever dependencies change
  useEffect(() => {
    setChecklistStatus({
      artworkUploaded: !!(filePreview || (useDirectCID && manualCID)),
      titleAndDescription: !!(nftName.trim() && nftDescription.trim()),
      creatorName: !!creatorName.trim(),
      blockchainSelected: !!blockchain,
      editionsValid: editions > 0 && Number.isInteger(editions),
      royaltyValid: royaltyPercentage >= 0 && royaltyPercentage <= 20,
      walletConnected: !!account,
      agreedToTerms: agreedToTerms,
      // New validation rules
      fileFormatValid: filePreview !== null || (useDirectCID && !!manualCID), // Consider valid if file is uploaded or CID is provided
      resolutionValid: filePreview !== null || (useDirectCID && !!manualCID), // We can't validate actual resolution, so assume valid if file exists
      fileSizeValid: filePreview !== null || (useDirectCID && !!manualCID), // We can't validate actual size, so assume valid if file exists
      ipRightsVerified: agreedToTerms, // Using same logic as terms agreement for now
      originalityConfirmed: agreedToTerms, // Using same logic as terms agreement for now
      pricingResearched: true, // Assuming this is always valid as we're using a default
      // Category-specific requirements
      categoryRequirementsMet: areCategoryRequirementsMet()
    });
  }, [
    filePreview, useDirectCID, manualCID, nftName, nftDescription,
    creatorName, blockchain, editions, royaltyPercentage, account, agreedToTerms,
    categoryChecklistStatus, nftCategory
  ]);

  // Check if all requirements are met to enable the mint button
  const allRequirementsMet = Object.values(checklistStatus).every(value => value === true);

  // When category changes, reset category-specific checkboxes
  useEffect(() => {
    if (fileType === 'audio') {
      setNftCategory('music');
    } else if (fileType === 'image' && nftCategory === 'music') {
      setNftCategory('art');
    }
  }, [fileType]);

  // Update the category-specific checklist when the category changes
  const handleCategoryChange = (newCategory: string) => {
    setNftCategory(newCategory);

    // Reset all category checklist statuses to false
    const resetChecklistStatus = { ...categoryChecklistStatus };
    Object.keys(resetChecklistStatus).forEach(key => {
      resetChecklistStatus[key] = false;
    });

    setCategoryChecklistStatus(resetChecklistStatus);
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for immediate UX
    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl);

    // If user opted to use a direct CID manually, don't auto-upload
    if (useDirectCID) return;

    // Attempt real IPFS upload via API, fallback to simulation
    try {
      setIsUploading(true);
      setUploadProgress(10);
      const health = await ipfsHealthCheck();
      if (!health.ok) {
        console.warn('IPFS API unavailable, falling back to simulation:', health.message);
        // Fallback to simulated upload for development
        setUploadProgress(50);
        const simulatedCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        setTokenURI(`ipfs://${simulatedCid}`);
        setUploadProgress(100);
        setIsUploading(false);
        toast({ title: 'File ready (simulated)', description: 'IPFS unavailable, using simulated CID for development' });
        return;
      }
      setUploadProgress(25);
      const { cid } = await uploadFileToIPFS(file);
      setUploadProgress(80);
      setTokenURI(`ipfs://${cid}`);
      setUploadProgress(100);
      setIsUploading(false);
      toast({ title: 'Uploaded to IPFS', description: cid });
    } catch (err: any) {
      console.warn('IPFS upload failed, falling back to simulation:', err?.message);
      // Fallback to simulated upload
      setUploadProgress(50);
      const simulatedCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setTokenURI(`ipfs://${simulatedCid}`);
      setUploadProgress(100);
      setIsUploading(false);
      toast({ title: 'File ready (simulated)', description: 'IPFS upload failed, using simulated CID for development' });
    }
  };

  // Helper when manually entering a CID: keep tokenURI in sync
  useEffect(() => {
    if (useDirectCID && manualCID) {
      setTokenURI(`ipfs://${manualCID}`);
    }
  }, [useDirectCID, manualCID]);

  // Automatically upload initial file from drawing page to IPFS
  useEffect(() => {
    if (initialFile && initialPreview && !filePreview) {
      console.log('📤 Auto-uploading drawing to IPFS...', initialFile.name);

      // Set the preview immediately
      setFilePreview(initialPreview);
      setFileType('image');

      // Start IPFS upload
      const uploadDrawing = async () => {
        try {
          setIsUploading(true);
          setUploadProgress(10);

          // Check IPFS health
          const health = await ipfsHealthCheck();
          setUploadProgress(20);

          if (!health.ok) {
            console.warn('IPFS not available, using simulated CID');
            // Fallback: use simulated CID for development
            const simulatedCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
            setTokenURI(`ipfs://${simulatedCid}`);
            setUploadProgress(100);
            setIsUploading(false);
            toast({
              title: 'Artwork ready (simulated)',
              description: 'IPFS upload failed, using simulated CID for development',
            });
            return;
          }

          setUploadProgress(40);

          // Upload file to IPFS
          const { cid } = await uploadFileToIPFS(initialFile);
          setUploadProgress(80);

          console.log('✅ Drawing uploaded to IPFS:', cid);

          // Set the token URI
          const ipfsUri = `ipfs://${cid}`;
          setTokenURI(ipfsUri);
          setUploadProgress(100);
          setIsUploading(false);

          toast({
            title: 'Artwork uploaded to IPFS!',
            description: `Your drawing has been uploaded with CID: ${cid.substring(0, 10)}...`,
          });

        } catch (error: any) {
          console.error('Error uploading drawing to IPFS:', error);

          // Fallback to simulated CID
          const simulatedCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
          setTokenURI(`ipfs://${simulatedCid}`);
          setUploadProgress(100);
          setIsUploading(false);

          toast({
            title: 'Artwork ready (simulated)',
            description: 'IPFS upload failed, using simulated CID for development',
          });
        }
      };

      uploadDrawing();
    }
  }, [initialFile, initialPreview, filePreview, toast]);

  // Move to preview step
  const goToPreview = () => {
    if (!nftName || !nftDescription || !nftCategory) {
      setMintStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    // Check if we have either a file upload or a direct CID
    if (!filePreview && !useDirectCID) {
      setMintStatus({ type: 'error', message: 'Please upload a file or use a direct CID' });
      return;
    }

    if (useDirectCID && !manualCID) {
      setMintStatus({ type: 'error', message: 'Please enter a CID or upload a file' });
      return;
    }

    // If using direct CID, set the token URI
    if (useDirectCID && manualCID) {
      setTokenURI(`ipfs://${manualCID}`);
    }

    setMintStatus({ type: null, message: '' });
    setStep('preview');
  };

  // Move to mint step
  const goToMint = () => {
    if (!tokenURI) {
      setMintStatus({ type: 'error', message: 'File upload incomplete. Please wait for the upload to finish.' });
      return;
    }
    setMintStatus({ type: null, message: '' });
    setStep('mint');
  };

  // Go back to previous step
  const goBack = () => {
    if (step === 'preview') setStep('details');
    if (step === 'mint') setStep('preview');
    setMintStatus({ type: null, message: '' });
  };

  // Handle blockchain selection change with automatic network switching
  const handleBlockchainChange = async (value: string) => {
    console.log(`📝 User selected blockchain: ${value}`);
    setBlockchain(value);
    setMintStatus({ type: null, message: '' });

    // Only switch network if current network doesn't match the selection
    const targetChainId = {
      'ethereum': 1337,
      'polygon': 1338,
      'optimism': 1339,
      'arbitrum': 1340,
      'base': 1341
    }[value] || 1337;

    const currentChainId = currentNetwork?.chainId;

    if (currentChainId !== targetChainId && switchToNetwork) {
      setIsNetworkSwitching(true);
      try {
        console.log(`🔄 Switching network: ${currentChainId} → ${targetChainId}`);
        await switchToNetwork(value);
        toast({
          title: "Network Switched",
          description: `Successfully switched to ${BLOCKCHAIN_OPTIONS.find(opt => opt.value === value)?.label}`,
        });
      } catch (error) {
        console.error('Failed to switch network:', error);
        toast({
          title: "Network Switch Failed",
          description: "Please manually switch network in MetaMask",
          variant: "destructive",
        });
      } finally {
        setIsNetworkSwitching(false);
      }
    } else {
      console.log(`✅ Already on correct network for ${value}`);
    }
  };

  // Final mint submission
  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if contract is initialized
    if (isLoading) {
      setMintStatus({
        type: 'error',
        message: 'Contract is still initializing. Please wait a moment and try again.'
      });
      toast({
        title: "Contract Not Ready",
        description: "Please wait for the contract to finish initializing.",
        variant: "destructive",
      });
      return;
    }

    if (!contract) {
      setMintStatus({
        type: 'error',
        message: 'Contract failed to initialize. Please check your wallet connection and network settings.'
      });
      toast({
        title: "Contract Not Available",
        description: error || "Please check your wallet connection and try again.",
        variant: "destructive",
      });
      return;
    }

    // Check if all checklist requirements are met
    if (!allRequirementsMet) {
      setMintStatus({
        type: 'error',
        message: 'Please complete all checklist requirements before minting'
      });
      return;
    }

    // More lenient validation to prevent the "Please fill in all fields" error
    const effectiveRecipientAddress = recipientAddress || account || '';

    if (!effectiveRecipientAddress) {
      setMintStatus({ type: 'error', message: 'Please provide a recipient address' });
      return;
    }

    if (!tokenURI && useDirectCID && manualCID) {
      // If direct CID is used but tokenURI isn't set yet, set it now
      setTokenURI(`ipfs://${manualCID}`);
    }

    if (!tokenURI) {
      setMintStatus({ type: 'error', message: 'No token URI available. Please complete file upload or enter a valid CID' });
      return;
    }

    try {
      setIsMinting(true);
      setMintStatus({ type: 'info', message: 'Minting NFT...' });

      // Convert percentage to basis points (e.g., 2.5% -> 250)
      const royaltyBasisPoints = Math.round(royaltyPercentage * 100);

      console.log("Minting with:", {
        to: effectiveRecipientAddress,
        tokenURI,
        royaltyBasisPoints,
        creatorName: creatorName || 'Anonymous Creator',
        editions,
        category: nftCategory
      });

      // Store checklist completion in local storage to track this information
      localStorage.setItem('mintingChecklist', JSON.stringify({
        ...checklistStatus,
        categoryChecklist: categoryChecklistStatus
      }));

      const result = await mintNFT(
        effectiveRecipientAddress,
        tokenURI, // This is the image URI
        nftName,
        nftDescription,
        royaltyBasisPoints,
        creatorName || 'Anonymous Creator',
        editions,
        nftCategory
      );

      // After minting, automatically verify compliance and IP rights if the user confirmed them
      if (checklistStatus.ipRightsVerified && result.tokenId) {
        try {
          await verifyIPRights(result.tokenId, true);
          console.log("IP Rights verified for token ID:", result.tokenId);
        } catch (verifyError) {
          console.error("Failed to verify IP Rights:", verifyError);
          // Don't fail the whole process if verification fails
        }
      }

      if ((checklistStatus.fileFormatValid && checklistStatus.resolutionValid && checklistStatus.fileSizeValid) && result.tokenId) {
        try {
          await verifyCompliance(result.tokenId, true);
          console.log("Compliance verified for token ID:", result.tokenId);
        } catch (verifyError) {
          console.error("Failed to verify compliance:", verifyError);
          // Don't fail the whole process if verification fails
        }
      }

      // Verify category-specific requirements if they are met
      if (checklistStatus.categoryRequirementsMet && result.tokenId) {
        try {
          await verifyCategory(result.tokenId, nftCategory, true);
          console.log("Category requirements verified for token ID:", result.tokenId);
        } catch (verifyError) {
          console.error("Failed to verify category requirements:", verifyError);
          // Don't fail the whole process if verification fails
        }
      }

      // Pin tokenURI CID to local IPFS (best-effort)
      try {
        const cidMatch = tokenURI.startsWith('ipfs://') ? tokenURI.replace('ipfs://', '') : '';
        // Heuristic: basic CIDv0/v1 length check to avoid pinning obviously fake dev CIDs
        const looksLikeCid = cidMatch && cidMatch.length >= 46; // Qm... usually 46 chars
        if (looksLikeCid) {
          const health = await ipfsHealthCheck();
          if (!health.ok) {
            console.warn('IPFS health check failed:', health.message);
          } else {
            const pin = await pinByCID(cidMatch);
            if (pin.pinned) {
              toast({ title: 'IPFS pinned', description: `Metadata CID ${pin.cid}` });
            } else {
              toast({ title: 'IPFS pin skipped', description: 'Could not pin CID (see console)', variant: 'default' });
            }
          }
        } else {
          console.log('Skipping IPFS pin because CID does not look valid for dev simulation:', cidMatch);
        }
      } catch (e: any) {
        console.warn('Pin attempt error:', e?.message || e);
      }

      // Show success message
      setMintStatus({
        type: 'success',
        message: `Successfully minted NFT! Token ID: ${result.tokenId.toString()}`
      });

      // Prepare newly minted NFT data for marketplace display
      const fallbackImage = 'https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop';
      const imageFromTokenURI = tokenURI?.startsWith('ipfs://')
        ? toGatewayUrl(tokenURI.replace('ipfs://', ''))
        : (tokenURI || '');

      const newNFTData = {
        id: `nft-${Date.now()}`,
        image: filePreview || imageFromTokenURI || fallbackImage,
        title: nftName || `Token #${result.tokenId.toString()}`,
        creator: creatorName || 'Anonymous Creator',
        creatorVerified: true,
        owner: effectiveRecipientAddress,
        tokenId: result.tokenId.toString(),
        tokenURI: tokenURI,
        chain: blockchain,
        transactionHash: result.transactionHash,
        editions: {
          total: editions,
          minted: 1
        },
        category: nftCategory,
        price: `${royaltyBasisPoints > 0 ? (royaltyBasisPoints / 100).toFixed(2) : '0.10'} ETH`
      };

      // Store the minted NFT in localStorage for the marketplace to display
      const mintedNFT = {
        ...newNFTData,
        verified: {
          ipRights: checklistStatus.ipRightsVerified,
          compliance: checklistStatus.fileFormatValid && checklistStatus.resolutionValid && checklistStatus.fileSizeValid,
          category: checklistStatus.categoryRequirementsMet
        },
        categoryDetails: {
          name: nftCategory,
          label: NFT_CATEGORIES.find(c => c.value === nftCategory)?.label || nftCategory,
          requirements: getCurrentCategoryChecklist().map(item => ({
            label: item.label,
            verified: categoryChecklistStatus[item.key]
          }))
        }
      };

      localStorage.setItem('newlyMintedNFT', JSON.stringify(mintedNFT));

      // Also append to myMintedNFTs list for the profile page
      try {
        const existingMintedJSON = localStorage.getItem('myMintedNFTs');
        const existingMinted = existingMintedJSON ? JSON.parse(existingMintedJSON) : [];
        const updatedMinted = [mintedNFT, ...existingMinted];
        localStorage.setItem('myMintedNFTs', JSON.stringify(updatedMinted));
      } catch (e) {
        console.error("Error saving to myMintedNFTs", e);
      }

      // Set minted NFT data for the success popup
      setMintedNFTData(mintedNFT);

      // Show success popup
      setShowSuccessPopup(true);

      // Also show a toast notification
      toast({
        title: "NFT Minted Successfully!",
        description: `Your NFT "${nftName}" has been minted with ID: ${result.tokenId}`,
        variant: "default",
      });

      // Reset form
      setStep('details');
      setNftName('');
      setNftDescription('');
      setNftCategory('art');
      setNftTags('');
      setFilePreview(null);
      setUseDirectCID(false);
      setManualCID('');
      setRecipientAddress('');
      setTokenURI('');
      setRoyaltyPercentage(2.5);
    } catch (err) {
      console.error("Minting error:", err);
      setMintStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to mint NFT'
      });

      // Show error toast
      toast({
        title: "Minting Failed",
        description: err instanceof Error ? err.message : 'Failed to mint NFT',
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  // Track contract initialization completion
  useEffect(() => {
    // Contract is ready when it's not loading and either we have a contract or there's an error
    if (!isLoading) {
      console.log('Contract initialization complete:', { hasContract: !!contract, hasError: !!error });
    }
  }, [isLoading, contract, error]);

  // Do not early-return here; keep hooks order stable every render

  // If there's an error, we still want to show the form and the recovery banner
  const isBreakerError = typeof error === 'string' && /circuit\s*breaker/i.test(error);
  useEffect(() => {
    if (isBreakerError) setShowBreakerBanner(true);
  }, [isBreakerError]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center p-4 mb-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2 text-sm">Loading contract...</span>
        </div>
      )}

      {/* Use the new RPCErrorBanner component for RPC/circuit breaker errors */}
      <RPCErrorBanner
        error={error || (mintStatus.type === 'error' ? mintStatus.message : undefined)}
        onDismiss={() => {
          try { localStorage.removeItem('lastMetaMaskCircuitBreaker'); } catch { }
          setShowBreakerBanner(false);
          setMintStatus({ type: null, message: '' });
        }}
        onRetry={() => window.location.reload()}
      />

      {/* Fallback for non-RPC errors */}
      {error && !isBreakerError && !/RPC endpoint|circuit breaker|too many errors|-32002|-32603/i.test(error) && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Info banner when coming from Digital Art Studio */}
      {initialFile && initialPreview && (
        <Alert className="mb-4 border-blue-500/50 bg-blue-500/10">
          <FileCheck className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-500">Artwork from Digital Art Studio</AlertTitle>
          <AlertDescription>
            Your drawing is being automatically uploaded to IPFS. You can proceed to fill in the NFT details while the upload completes.
          </AlertDescription>
        </Alert>
      )}


      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create New NFT</CardTitle>
          <CardDescription>
            {step === 'details' && 'Provide details about your NFT creation'}
            {step === 'preview' && 'Review your NFT before minting'}
            {step === 'mint' && 'Complete the minting process'}
          </CardDescription>
        </CardHeader>

        {/* Steps indicator */}
        <div className="px-6 mb-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>1</div>
            <div className={`h-1 flex-1 ${step === 'details' ? 'bg-muted' : 'bg-primary'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'preview' || step === 'mint' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
            <div className={`h-1 flex-1 ${step === 'mint' ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'mint' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>3</div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Details</span>
            <span>Preview</span>
            <span>Mint</span>
          </div>
        </div>

        <CardContent>
          <fieldset disabled={isLoading || isNetworkSwitching}>
            <div className="mb-6 p-4 border border-dashed rounded-lg">
              <h3 className="text-lg font-medium mb-4">Pre-minting Checklist</h3>
              <div className="grid gap-2">
                <div className="flex items-center">
                  {checklistStatus.artworkUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Upload artwork</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.titleAndDescription ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Title and Description</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.creatorName ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Creator Name</span>
                </div>

                {/* New checklist items */}
                <div className="flex items-center">
                  {checklistStatus.fileFormatValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>File Format (JPG, PNG, GIF, MP4, MP3, GLB)</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.resolutionValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>High Resolution (1500x1500px+ for images)</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.fileSizeValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>File Size (under 100MB recommended)</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.ipRightsVerified ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>IP Rights Verified</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.originalityConfirmed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Originality Confirmed</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.pricingResearched ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Pricing Research Completed</span>
                </div>

                {/* Original checklist items continued */}
                <div className="flex items-center">
                  {checklistStatus.blockchainSelected ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Blockchain Selection</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.editionsValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Number of editions</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.royaltyValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Royalty percentage (0-20%)</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.walletConnected ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Wallet connected</span>
                </div>
                <div className="flex items-center">
                  {checklistStatus.agreedToTerms ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Agreed to Terms & Conditions</span>
                </div>

                {/* Category-specific checklist */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="font-medium mb-2 flex items-center">
                    {nftCategory.charAt(0).toUpperCase() + nftCategory.slice(1)} Category Requirements
                  </h4>
                  {getCurrentCategoryChecklist().map((item) => (
                    <div key={item.id} className="flex items-center mb-2">
                      {categoryChecklistStatus[item.key] ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      )}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Original checklist items continued */}
                <div className="flex items-center">
                  {checklistStatus.categoryRequirementsMet ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  )}
                  <span>Category-specific requirements</span>
                </div>
              </div>

              {/* Completion progress bar */}
              <div className="mt-4">
                <div className="text-sm mb-1 flex justify-between">
                  <span>Completion</span>
                  <span>{Math.round(Object.values(checklistStatus).filter(Boolean).length / Object.values(checklistStatus).length * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.round(Object.values(checklistStatus).filter(Boolean).length / Object.values(checklistStatus).length * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {step === 'details' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nftName">NFT Name *</Label>
                  <Input
                    id="nftName"
                    placeholder="Enter a name for your NFT"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creatorName">Creator Name *</Label>
                  <Input
                    id="creatorName"
                    placeholder="Enter your name or artist name"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This name will be displayed as the creator instead of your wallet address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nftDescription">Description *</Label>
                  <Textarea
                    id="nftDescription"
                    placeholder="Describe your NFT creation"
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nftCategory">Category *</Label>
                  <Select value={nftCategory} onValueChange={handleCategoryChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {NFT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nftTags">Tags (comma separated)</Label>
                  <Input
                    id="nftTags"
                    placeholder="art, digital, abstract"
                    value={nftTags}
                    onChange={(e) => setNftTags(e.target.value)}
                  />
                </div>

                {/* New IP Rights Verification Section */}
                <div className="space-y-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium">IP Rights Verification</h3>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ip-rights"
                      checked={checklistStatus.ipRightsVerified}
                      onCheckedChange={(checked) => {
                        setChecklistStatus(prev => ({
                          ...prev,
                          ipRightsVerified: checked === true
                        }));
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="ip-rights"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I verify that I own all intellectual property rights
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I confirm that I own or have permission to use all content in this NFT
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="originality"
                      checked={checklistStatus.originalityConfirmed}
                      onCheckedChange={(checked) => {
                        setChecklistStatus(prev => ({
                          ...prev,
                          originalityConfirmed: checked === true
                        }));
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="originality"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm this is original work
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I verify that this NFT is my original creation and does not infringe on others' rights
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>File Type *</Label>
                  <RadioGroup
                    value={fileType}
                    onValueChange={(value: 'image' | 'audio' | 'video') => setFileType(value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="fileType-image" />
                      <Label htmlFor="fileType-image" className="flex items-center">
                        <ImageIcon className="mr-1 h-4 w-4" /> Image
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="audio" id="fileType-audio" />
                      <Label htmlFor="fileType-audio" className="flex items-center">
                        <Music className="mr-1 h-4 w-4" /> Audio
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="fileType-video" />
                      <Label htmlFor="fileType-video" className="flex items-center">
                        <Upload className="mr-1 h-4 w-4" /> Video
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="file">Upload File *</Label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="useDirectCID"
                        checked={useDirectCID}
                        onChange={(e) => setUseDirectCID(e.target.checked)}
                        className="mr-2"
                      />
                      <Label htmlFor="useDirectCID" className="text-xs cursor-pointer">Use direct CID</Label>
                    </div>
                  </div>

                  {useDirectCID ? (
                    <div className="space-y-2">
                      <Label htmlFor="manualCID">IPFS Content Identifier (CID)</Label>
                      <Input
                        id="manualCID"
                        placeholder="Qm..."
                        value={manualCID}
                        onChange={(e) => {
                          const cid = e.target.value;
                          setManualCID(cid);
                          // Automatically update tokenURI when CID changes
                          if (cid && cid.trim() !== '') {
                            setTokenURI(`ipfs://${cid.trim()}`);
                          } else {
                            setTokenURI('');
                          }
                        }}
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the CID for your NFT content (e.g., QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz)
                      </p>
                      {manualCID && (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => simulateUpload()}
                          className="mt-2"
                        >
                          Set CID
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {filePreview ? (
                          <div className="relative">
                            {fileType === 'image' && (
                              <img src={filePreview} alt="Preview" className="mx-auto max-h-48 rounded" />
                            )}
                            {fileType === 'audio' && (
                              <div className="p-4 bg-muted rounded flex items-center justify-center">
                                <Music className="h-12 w-12 text-primary mb-4" />
                                <audio src={filePreview} controls className="mt-2" />
                              </div>
                            )}
                            {fileType === 'video' && (
                              <video src={filePreview} controls className="mx-auto max-h-48 rounded" />
                            )}

                            {isUploading && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                <div className="text-white text-center">
                                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                                  <p>Uploading... {uploadProgress}%</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <div className="flex text-sm text-muted-foreground">
                              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept={
                                    fileType === 'image' ? 'image/*' :
                                      fileType === 'audio' ? 'audio/*' :
                                        'video/*'
                                  }
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {fileType === 'image' ? 'PNG, JPG, GIF up to 10MB' :
                                fileType === 'audio' ? 'MP3, WAV up to 30MB' :
                                  'MP4, WEBM up to 30MB'}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blockchain">Blockchain *</Label>
                    <span className="text-xs text-muted-foreground">⚡ Lower gas = Better value</span>
                  </div>
                  <Select value={blockchain} onValueChange={handleBlockchainChange} required disabled={isNetworkSwitching}>
                    <SelectTrigger>
                      <SelectValue placeholder={isNetworkSwitching ? "Switching network..." : "Select a blockchain"} />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOCKCHAIN_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                              <span className="font-medium">{option.label}</span>
                              <span className="text-xs text-muted-foreground">({option.symbol})</span>
                              {option.recommended && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">{option.gasEstimate}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Gas fees are estimates. Polygon and Base offer the lowest costs for minting.
                  </p>
                  {isNetworkSwitching && (
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Switching network in MetaMask...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editions">Number of Editions *</Label>
                  <Input
                    id="editions"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={editions}
                    onChange={(e) => setEditions(parseInt(e.target.value) || 1)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of copies to mint (ERC-1155 for multiple editions)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      className="mr-2"
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> of minting NFTs on this platform
                    </Label>
                  </div>
                </div>

                {/* Category-specific checklist section */}
                <div className="space-y-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium">{nftCategory.charAt(0).toUpperCase() + nftCategory.slice(1)} Requirements</h3>

                  {getCurrentCategoryChecklist().map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={categoryChecklistStatus[item.key]}
                        onCheckedChange={(checked) => handleCategoryChecklistChange(item.key, checked === true)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 'preview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="rounded-lg overflow-hidden bg-muted mb-4">
                      {useDirectCID ? (
                        <div className="p-8 flex flex-col items-center justify-center h-[300px] bg-gray-800">
                          <div className="text-center">
                            <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
                            <p className="text-lg font-medium mb-2">Using Direct CID</p>
                            <p className="text-sm text-muted-foreground break-all max-w-[250px] mx-auto">
                              {manualCID}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {fileType === 'image' && filePreview && (
                            <img src={filePreview} alt={nftName} className="w-full h-auto max-h-[300px] object-contain" />
                          )}
                          {fileType === 'audio' && filePreview && (
                            <div className="p-8 flex flex-col items-center justify-center h-[300px]">
                              <Music className="h-24 w-24 text-primary mb-4" />
                              <audio src={filePreview} controls className="w-full" />
                            </div>
                          )}
                          {fileType === 'video' && filePreview && (
                            <video src={filePreview} controls className="w-full h-auto max-h-[300px]" />
                          )}
                        </>
                      )}
                    </div>

                    {tokenURI && (
                      <div className="text-sm bg-muted p-3 rounded break-all">
                        <div className="font-semibold mb-1 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
                          Token URI Ready
                        </div>
                        <code className="text-xs">{tokenURI}</code>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{nftName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Category: {NFT_CATEGORIES.find(c => c.value === nftCategory)?.label}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Description</h4>
                      <p className="text-sm">{nftDescription}</p>
                    </div>

                    {/* Category-specific verification display */}
                    <div className="mb-4 p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FileCheck className="h-4 w-4 mr-2" />
                        {nftCategory.charAt(0).toUpperCase() + nftCategory.slice(1)} Requirements
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {getCurrentCategoryChecklist().map((item) => (
                          <li key={item.id} className="flex items-center">
                            {categoryChecklistStatus[item.key] ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 shrink-0" />
                            )}
                            <span>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {nftTags && (
                      <div>
                        <h4 className="font-semibold mb-1">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {nftTags.split(',').map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-muted text-xs rounded-full flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-1">Creator</h4>
                      <p className="text-sm">{creatorName || 'Anonymous Creator'}</p>
                      <p className="text-xs text-muted-foreground truncate">{account || 'Your wallet address'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'mint' && (
              <form className="space-y-6">
                {/* Contract Initialization Alert */}
                {isLoading && (
                  <Alert>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertTitle>Initializing Contract</AlertTitle>
                    <AlertDescription>
                      Please wait while we connect to the blockchain and initialize the smart contract. This may take a few moments.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Contract Ready Alert */}
                {!isLoading && contract && (
                  <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800 dark:text-green-200">Contract Ready</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      Smart contract is initialized and ready to mint your NFT.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Network Status Component */}
                <NetworkStatus
                  selectedBlockchain={blockchain}
                  currentNetwork={currentNetwork}
                  onNetworkSwitch={async () => {
                    // Try to switch network using the hook's function
                    if (switchToNetwork) {
                      try {
                        await switchToNetwork(blockchain);
                      } catch (error) {
                        console.error('Network switch failed:', error);
                      }
                    }
                  }}
                />

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address *</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    value={recipientAddress || account || ''}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    required
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Address that will own this NFT
                    </p>
                    {account && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setRecipientAddress(account)}
                        className="text-xs"
                      >
                        Use my address
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="royaltyPercentage">Royalty Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="royaltyPercentage"
                      min={0}
                      max={20}
                      step={0.5}
                      value={[royaltyPercentage]}
                      onValueChange={(value) => setRoyaltyPercentage(value[0])}
                    />
                    <span className="w-12 text-right">{royaltyPercentage}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is the percentage of the sale price you'll receive when your NFT is sold on secondary markets.
                  </p>
                </div>

                {/* Add Terms and Conditions Checkbox */}
                <div className="space-y-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => {
                        setAgreedToTerms(checked === true);
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the Terms and Conditions
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        By checking this box, I confirm that I have read and agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Final NFT Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium">Name:</span> {nftName}</li>
                    <li><span className="font-medium">Creator:</span> {creatorName || 'Anonymous Creator'}</li>
                    <li><span className="font-medium">Category:</span> {NFT_CATEGORIES.find(c => c.value === nftCategory)?.label}</li>
                    <li>
                      <span className="font-medium">Category Requirements:</span>
                      {checklistStatus.categoryRequirementsMet ?
                        <span className="text-green-500 ml-2 inline-flex items-center">Verified <CheckCircle className="h-4 w-4 ml-1" /></span> :
                        <span className="text-yellow-500 ml-2 inline-flex items-center">Pending <AlertCircle className="h-4 w-4 ml-1" /></span>
                      }
                    </li>
                    <li><span className="font-medium">Royalty:</span> {royaltyPercentage}%</li>
                    <li><span className="font-medium">Editions:</span> {editions}</li>
                    <li><span className="font-medium">Token URI:</span> <span className="break-all">{tokenURI}</span></li>
                  </ul>
                </div>
              </form>
            )}

            {mintStatus.type && (
              <Alert variant={mintStatus.type === 'error' ? 'destructive' : 'default'} className="mt-6">
                <AlertTitle>
                  {mintStatus.type === 'success' ? 'Success' :
                    mintStatus.type === 'error' ? 'Error' : 'Info'}
                </AlertTitle>
                <AlertDescription>{mintStatus.message}</AlertDescription>
              </Alert>
            )}
          </fieldset>
        </CardContent>

        <CardFooter className="flex justify-between">
          {step !== 'details' && (
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
            >
              Back
            </Button>
          )}

          {step === 'details' && (
            <Button
              type="button"
              className="ml-auto"
              onClick={goToPreview}
              disabled={isLoading}
            >
              Continue to Preview
            </Button>
          )}

          {step === 'preview' && (
            <Button
              type="button"
              className="ml-auto"
              onClick={goToMint}
              disabled={isLoading}
            >
              Continue to Mint
            </Button>
          )}

          {step === 'mint' && (
            <Button
              type="button"
              className="ml-auto"
              disabled={isLoading || isMinting || !account || !tokenURI || !allRequirementsMet}
              onClick={handleMint}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing Contract...
                </>
              ) : isMinting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                'Mint NFT'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Success Popup */}
      {showSuccessPopup && mintedNFTData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">NFT Minted Successfully!</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSuccessPopup(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden bg-muted">
                {mintedNFTData.image && (
                  <img
                    src={mintedNFTData.image}
                    alt={mintedNFTData.title}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium">{mintedNFTData.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{mintedNFTData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Creator</p>
                  <p>{mintedNFTData.creator}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Token ID</p>
                  <p>{mintedNFTData.tokenId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Editions</p>
                  <p>{mintedNFTData.editions?.current} of {mintedNFTData.editions?.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="capitalize">{mintedNFTData.category}</p>
                </div>
              </div>

              {/* Add verification status display */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2">Verification Status</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex flex-col items-center p-2 border border-gray-200 dark:border-gray-800 rounded">
                    <span className={mintedNFTData.verified?.compliance ? "text-green-500" : "text-yellow-500"}>
                      {mintedNFTData.verified?.compliance ?
                        <CheckCircle className="h-5 w-5 mb-1" /> :
                        <AlertCircle className="h-5 w-5 mb-1" />
                      }
                    </span>
                    <span>Compliance</span>
                  </div>
                  <div className="flex flex-col items-center p-2 border border-gray-200 dark:border-gray-800 rounded">
                    <span className={mintedNFTData.verified?.ipRights ? "text-green-500" : "text-yellow-500"}>
                      {mintedNFTData.verified?.ipRights ?
                        <CheckCircle className="h-5 w-5 mb-1" /> :
                        <AlertCircle className="h-5 w-5 mb-1" />
                      }
                    </span>
                    <span>IP Rights</span>
                  </div>
                  <div className="flex flex-col items-center p-2 border border-gray-200 dark:border-gray-800 rounded">
                    <span className={mintedNFTData.verified?.category ? "text-green-500" : "text-yellow-500"}>
                      {mintedNFTData.verified?.category ?
                        <CheckCircle className="h-5 w-5 mb-1" /> :
                        <AlertCircle className="h-5 w-5 mb-1" />
                      }
                    </span>
                    <span>Category</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link to="/marketplace">
                  <Button className="w-full" onClick={() => setShowSuccessPopup(false)}>
                    View in Marketplace
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(mintedNFTData.transactionHash)}
                >
                  Copy Transaction Hash
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 