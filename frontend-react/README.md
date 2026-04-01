# Blockchain Scholarship System - React Frontend

Modern, production-ready React frontend with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 18** - Latest React with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible components
- 🔐 **Web3 Integration** - MetaMask wallet connection
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **TypeScript** - Type-safe development
- 🎯 **React Router** - Client-side routing

## 📦 Installation

```bash
cd frontend-react
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend-react/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer component
│   │   └── MobileNav.tsx   # Mobile navigation
│   ├── contexts/           # React contexts
│   │   └── Web3Context.tsx # Web3 provider
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── DashboardPage.tsx # Student dashboard
│   │   ├── TransparencyPage.tsx # Public ledger
│   │   └── AdminPage.tsx   # Admin panel
│   ├── lib/                # Utilities
│   │   ├── web3.ts         # Web3 utilities
│   │   └── api.ts          # API client
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Design System

Based on the "Ethereal Ledger" design with:
- **Primary Color**: Cyan (#47d6ff)
- **Secondary Color**: Purple (#edb1ff)
- **Background**: Dark (#0e131e)
- **Font**: Space Grotesk (headings), Inter (body)

## 🔌 API Integration

The frontend connects to the Flask backend at `http://localhost:5000/api`

Configure in `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

## 🔐 Web3 Integration

### MetaMask Connection
```typescript
import { useWeb3 } from '@/contexts/Web3Context'

const { account, connect, disconnect } = useWeb3()
```

### Contract Interaction
```typescript
import { getContract } from '@/lib/web3'

const contract = getContract()
await contract.methods.applyForScholarship(...).send({ from: account })
```

## 📱 Pages

### 1. Home Page (`/`)
- Hero section with CTA
- Statistics cards
- Feature showcase
- Call-to-action section

### 2. Dashboard (`/dashboard`)
- Student application form
- Application status
- Document upload
- Transaction history

### 3. Transparency (`/transparency`)
- Public ledger view
- All applications list
- Real-time transactions
- Filter and search

### 4. Admin Panel (`/admin`)
- Pending applications
- Approve/reject interface
- Fund management
- Statistics dashboard

## 🧩 Components

### shadcn/ui Components Used
- Button
- Card
- Dialog
- Dropdown Menu
- Input
- Label
- Select
- Tabs
- Toast

### Custom Components
- Navbar - Top navigation with wallet connection
- Footer - Site footer with links
- MobileNav - Bottom navigation for mobile
- StatCard - Statistics display card
- ApplicationCard - Application display card

## 🎯 Key Features Implementation

### Wallet Connection
```typescript
// In Navbar component
<Button onClick={connect}>
  {account ? `${account.slice(0,6)}...${account.slice(-4)}` : 'Connect Wallet'}
</Button>
```

### Application Submission
```typescript
const handleSubmit = async (data) => {
  const tx = await contract.methods.applyForScholarship(
    data.name,
    data.email,
    data.income,
    data.marks,
    data.ipfsHash,
    web3.utils.toWei(data.amount, 'ether')
  ).send({ from: account })
  
  toast({ title: 'Success', description: `TX: ${tx.transactionHash}` })
}
```

### Real-time Updates
```typescript
useEffect(() => {
  const subscription = contract.events.ApplicationSubmitted()
    .on('data', (event) => {
      // Update UI
    })
  
  return () => subscription.unsubscribe()
}, [])
```

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=0x...
VITE_CHAIN_ID=11155111
```

### Contract ABI
Place contract ABI in `src/lib/contract-abi.json`

## 🎨 Styling

### Tailwind Classes
```tsx
<div className="glass-card p-8 rounded-xl border border-white/5">
  <h3 className="text-3xl font-headline font-bold">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Custom Styles
```css
.glass-card {
  background: rgba(27, 31, 43, 0.6);
  backdrop-filter: blur(20px);
}
```

## 📊 State Management

Using React Context for global state:
- Web3Context - Wallet and contract state
- ApplicationContext - Application data
- ToastContext - Notifications

## 🧪 Testing

```bash
npm run test
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🔒 Security

- Never expose private keys
- Validate all user inputs
- Sanitize data before display
- Use HTTPS in production
- Implement rate limiting

## 🐛 Troubleshooting

### MetaMask Not Detected
- Install MetaMask extension
- Refresh the page
- Check browser compatibility

### Transaction Fails
- Check gas settings
- Verify contract address
- Ensure sufficient balance

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Web3.js](https://web3js.readthedocs.io/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - See LICENSE file

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
