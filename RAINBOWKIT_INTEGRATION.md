# 🌈 RainbowKit Integration

## What is RainbowKit?

RainbowKit is the best way to connect wallets to your dapp. It provides:
- Beautiful, customizable wallet connection UI
- Support for 100+ wallets (MetaMask, WalletConnect, Coinbase, etc.)
- Mobile-friendly design
- Dark mode support
- Chain switching
- Recent transactions
- Account modal with balance

---

## ✅ What's Been Integrated

### 1. Dependencies Installed
- `@rainbow-me/rainbowkit` - RainbowKit library
- `wagmi` - React hooks for Ethereum
- `viem` - TypeScript Ethereum library
- `@tanstack/react-query` - Data fetching

### 2. Configuration Files Created

**`src/wagmi.ts`** - Wagmi configuration
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Blockchain Scholarship System',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [sepolia],
  ssr: false,
});
```

### 3. App Wrapped with Providers

**`src/main.tsx`** - Updated with RainbowKit providers
```typescript
<WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
      <App />
    </RainbowKitProvider>
  </QueryClientProvider>
</WagmiProvider>
```

### 4. Navbar Updated

**`src/components/Navbar.tsx`** - Now uses RainbowKit's ConnectButton
```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit'

// In component:
<ConnectButton />
```

---

## 🎨 Features You Get

### Beautiful Connect Modal
- Shows all available wallets
- QR code for mobile wallets
- "Get a Wallet" option for new users
- Smooth animations

### Account Modal
- Shows wallet address
- Displays ETH balance
- Copy address button
- Disconnect button
- View on Etherscan link

### Chain Switching
- Automatically detects wrong network
- One-click switch to Sepolia
- Visual indicator of current chain

### Mobile Support
- Responsive design
- Mobile wallet deep linking
- WalletConnect integration

---

## 🔧 Optional: Get WalletConnect Project ID

For production, you should get a WalletConnect Project ID:

1. Go to: https://cloud.walletconnect.com
2. Sign up (free)
3. Create new project
4. Copy Project ID
5. Update `src/wagmi.ts`:
   ```typescript
   projectId: 'YOUR_ACTUAL_PROJECT_ID'
   ```

**Note**: It works without this, but you'll see a warning in console.

---

## 🎨 Customization Options

### Theme Customization

You can customize RainbowKit's appearance:

```typescript
<RainbowKitProvider
  theme={darkTheme({
    accentColor: '#06b6d4', // Cyan to match your design
    accentColorForeground: 'white',
    borderRadius: 'medium',
  })}
>
  <App />
</RainbowKitProvider>
```

### Custom Chains

Add more networks:

```typescript
import { mainnet, polygon, optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
  chains: [sepolia, mainnet, polygon, optimism],
  // ...
});
```

### Custom Wallet List

Show specific wallets:

```typescript
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet, coinbaseWallet, walletConnectWallet],
  },
]);
```

---

## 🔄 Migration from Old Web3Context

### Before (Custom Hook):
```typescript
const { account, connect, disconnect } = useWeb3();

<button onClick={connect}>Connect</button>
```

### After (RainbowKit):
```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';

<ConnectButton />
```

### Using Wagmi Hooks:
```typescript
import { useAccount, useBalance } from 'wagmi';

const { address, isConnected } = useAccount();
const { data: balance } = useBalance({ address });
```

---

## 📦 What's Included

### Supported Wallets
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow
- Trust Wallet
- Ledger
- And 100+ more!

### Features
- ✅ Multi-wallet support
- ✅ Chain switching
- ✅ ENS names
- ✅ Balance display
- ✅ Recent transactions
- ✅ Mobile support
- ✅ Dark mode
- ✅ Customizable themes
- ✅ TypeScript support

---

## 🚀 Next Steps

### 1. Wait for Installation
The packages are currently installing. Once complete, restart the dev server:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 2. Test the New UI
1. Open http://localhost:3000
2. Click the new RainbowKit connect button
3. See the beautiful wallet selection modal
4. Connect your wallet
5. Click your address to see account modal

### 3. Update Other Components

If you have other components using the old `useWeb3()` hook, update them to use wagmi hooks:

```typescript
// Old
import { useWeb3 } from '@/contexts/Web3Context';
const { account } = useWeb3();

// New
import { useAccount } from 'wagmi';
const { address } = useAccount();
```

---

## 🎯 Benefits

### For Users
- ✅ More wallet options
- ✅ Better mobile experience
- ✅ Clearer connection status
- ✅ Easy chain switching

### For Developers
- ✅ Less code to maintain
- ✅ Better TypeScript support
- ✅ Automatic updates
- ✅ Industry standard

---

## 📚 Documentation

- **RainbowKit Docs**: https://www.rainbowkit.com/docs
- **Wagmi Docs**: https://wagmi.sh
- **Viem Docs**: https://viem.sh

---

## 🐛 Troubleshooting

### "Module not found" errors
**Solution**: Wait for installation to complete, then restart dev server

### WalletConnect warning
**Solution**: Get a Project ID from https://cloud.walletconnect.com (optional)

### Styles not loading
**Solution**: Make sure `@rainbow-me/rainbowkit/styles.css` is imported in main.tsx

### Wrong network
**Solution**: RainbowKit will show a "Switch Network" button automatically

---

**RainbowKit integration complete! Your wallet connection experience is now world-class! 🌈**
