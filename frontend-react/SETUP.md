# React Frontend Setup Guide

Complete guide to set up and run the React frontend for the Blockchain Scholarship System.

## Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:5000`
- MetaMask browser extension
- Contract deployed on Sepolia testnet

## Quick Start (5 minutes)

```bash
# 1. Navigate to frontend directory
cd frontend-react

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Update .env with your values
nano .env

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Detailed Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.6
- shadcn/ui components
- Web3.js 4.3.0
- React Router 6.20.0

### Step 2: Configure Environment

Create `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Blockchain Configuration
VITE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia

# IPFS Configuration (optional)
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

### Step 3: Add Contract ABI

Copy the contract ABI from backend:

```bash
cp ../backend/contract_abi.json src/lib/contract-abi.json
```

Or manually create `src/lib/contract-abi.json` with your contract ABI.

### Step 4: Install shadcn/ui Components

The project uses shadcn/ui components. They're already configured, but if you need to add more:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### Step 5: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure Explained

```
frontend-react/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── toast.tsx
│   │   ├── Navbar.tsx             # Top navigation
│   │   ├── Footer.tsx             # Site footer
│   │   ├── MobileNav.tsx          # Mobile bottom nav
│   │   ├── StatCard.tsx           # Statistics card
│   │   └── ApplicationCard.tsx    # Application display
│   ├── contexts/
│   │   └── Web3Context.tsx        # Web3 provider
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── DashboardPage.tsx      # Student dashboard
│   │   ├── TransparencyPage.tsx   # Public ledger
│   │   └── AdminPage.tsx          # Admin panel
│   ├── lib/
│   │   ├── web3.ts                # Web3 utilities
│   │   ├── api.ts                 # API client
│   │   ├── utils.ts               # Helper functions
│   │   └── contract-abi.json      # Contract ABI
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── App.tsx                    # Main app
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
├── tailwind.config.js             # Tailwind config
└── postcss.config.js              # PostCSS config
```

## Development Workflow

### 1. Create New Component

```bash
# Create component file
touch src/components/MyComponent.tsx
```

```typescript
// src/components/MyComponent.tsx
import { FC } from 'react'

interface MyComponentProps {
  title: string
}

export const MyComponent: FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-headline">{title}</h2>
    </div>
  )
}
```

### 2. Add New Page

```bash
# Create page file
touch src/pages/NewPage.tsx
```

```typescript
// src/pages/NewPage.tsx
import { FC } from 'react'

const NewPage: FC = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-headline">New Page</h1>
    </div>
  )
}

export default NewPage
```

Add route in `App.tsx`:
```typescript
<Route path="/new" element={<NewPage />} />
```

### 3. Use Web3 Context

```typescript
import { useWeb3 } from '@/contexts/Web3Context'

const MyComponent = () => {
  const { account, connect, contract } = useWeb3()
  
  const handleAction = async () => {
    if (!account) {
      await connect()
      return
    }
    
    const tx = await contract.methods.someFunction().send({ from: account })
    console.log('Transaction:', tx.transactionHash)
  }
  
  return <button onClick={handleAction}>Action</button>
}
```

### 4. Make API Calls

```typescript
import { api } from '@/lib/api'

const fetchApplications = async () => {
  const response = await api.get('/applications')
  return response.data
}

const submitApplication = async (data) => {
  const response = await api.post('/apply', data)
  return response.data
}
```

## Building for Production

### 1. Build

```bash
npm run build
```

Output in `dist/` directory.

### 2. Preview Build

```bash
npm run preview
```

### 3. Deploy

#### Vercel
```bash
npm install -g vercel
vercel deploy
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Static Hosting
Upload `dist/` folder to any static hosting service.

## Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: "hsl(189 100% 82%)",  // Cyan
    foreground: "hsl(189 100% 15%)",
  },
  // Add more colors
}
```

### Add Custom Fonts

1. Add font link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

2. Update `tailwind.config.js`:
```javascript
fontFamily: {
  custom: ['YourFont', 'sans-serif'],
}
```

### Modify Layout

Edit `src/App.tsx` for global layout changes.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### MetaMask Connection Issues

1. Check MetaMask is installed
2. Verify network is Sepolia
3. Clear browser cache
4. Reload page

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Fix auto-fixable issues
npm run lint -- --fix
```

## Performance Optimization

### 1. Code Splitting

```typescript
// Lazy load pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

<Suspense fallback={<Loading />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Suspense>
```

### 2. Image Optimization

```typescript
// Use WebP format
<img src="/image.webp" alt="Description" loading="lazy" />
```

### 3. Bundle Analysis

```bash
npm run build -- --analyze
```

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

## Environment-Specific Builds

### Development
```bash
npm run dev
```

### Staging
```bash
npm run build:staging
```

### Production
```bash
npm run build
```

## Useful Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Format code
npm run format
```

## Next Steps

1. ✅ Complete setup
2. ✅ Connect MetaMask
3. ✅ Test application submission
4. ✅ Verify admin functions
5. ✅ Deploy to production

## Support

- Check [README.md](README.md) for features
- Review [Component Documentation](docs/COMPONENTS.md)
- See [API Integration Guide](docs/API.md)

---

**Happy coding! 🚀**
