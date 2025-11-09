# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8f761187-c0fe-4438-b7e4-afd8766fe14d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8f761187-c0fe-4438-b7e4-afd8766fe14d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8f761187-c0fe-4438-b7e4-afd8766fe14d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🔧 Troubleshooting

### RPC Endpoint / Circuit Breaker Error

If you see errors like:
- **"RPC endpoint returned too many errors, retrying in 23.14 minutes"**
- **"could not coalesce error (error={ "code": -32002"**
- **"circuit breaker" errors**
- **"Contract is still initializing"**

**🚀 ONE COMMAND FIX:**
```bash
npm run fix-rpc
```

**📋 Manual Fix (4 steps):**

1. **Check nodes**: `npm run check-nodes`
2. **Reset MetaMask**: Settings → Advanced → Reset account
3. **Delete networks**: Settings → Networks → Delete all local networks
4. **Re-add networks**: `npm run reset-metamask` (copy & run the script)

**📚 Documentation:**
- 📄 [QUICK_FIX.md](./QUICK_FIX.md) - Fast solution (2 minutes)
- 📄 [RPC_ERROR_FIX_GUIDE.md](./RPC_ERROR_FIX_GUIDE.md) - Complete troubleshooting
- 📄 [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) - Technical details

**🛠️ Helpful Commands:**
```bash
# Check if nodes are running
npm run check-nodes

# Get MetaMask reset instructions
npm run reset-metamask

# Full fix (check nodes + reset instructions)
npm run fix-rpc

# Reset and restart all blockchain nodes
./scripts/reset-nodes.sh
```

### Contract Initialization Issues

See [CONTRACT_INITIALIZATION_FIX.md](./CONTRACT_INITIALIZATION_FIX.md) for details on how contract initialization is handled.
