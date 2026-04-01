# Vercel Deployment Guide

## Overview
This guide will help you deploy your Blockchain Scholarship System to Vercel.

## Architecture
- **Frontend (React)**: Deploy to Vercel
- **Backend (Python Flask)**: Deploy to Render, Railway, or Vercel Serverless
- **Smart Contract**: Already deployed on Sepolia

## Option 1: Deploy Frontend Only to Vercel (Recommended)

### Prerequisites
1. GitHub account with your repository
2. Vercel account (free tier works)
3. Backend deployed elsewhere (Render, Railway, or local)

### Steps

#### 1. Prepare Frontend for Deployment

Update `frontend-react/.env` with production values:
```env
VITE_ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_CONTRACT_ADDRESS=0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6
VITE_BACKEND_URL=https://your-backend-url.com
```

#### 2. Deploy to Vercel

**Method A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `Venkat5599/Tokutaisei`
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend-react`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_ALCHEMY_RPC_URL`: Your Alchemy URL
   - `VITE_CONTRACT_ADDRESS`: `0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6`
   - `VITE_BACKEND_URL`: Your backend URL

6. Click "Deploy"

**Method B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend-react directory
cd frontend-react
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: tokutaisei
# - Directory: ./
# - Override settings? Yes
# - Build Command: npm run build
# - Output Directory: dist
# - Development Command: npm run dev

# Deploy to production
vercel --prod
```

#### 3. Configure Environment Variables in Vercel

After deployment, go to:
1. Project Settings → Environment Variables
2. Add:
   - `VITE_ALCHEMY_RPC_URL`
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_BACKEND_URL`
3. Redeploy

## Option 2: Deploy Backend to Vercel Serverless

Vercel supports Python serverless functions, but Flask needs adaptation.

### Create Serverless API

1. Create `api` folder in root:
```bash
mkdir api
```

2. Create `api/index.py`:
```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"})

# Add other routes...

# Vercel serverless handler
def handler(request):
    return app(request.environ, lambda *args: None)
```

3. Create `api/requirements.txt`:
```
flask==3.0.0
flask-cors==4.0.0
web3==6.11.3
python-dotenv==1.0.0
requests==2.31.0
```

4. Update `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend-react/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend-react/dist/$1"
    }
  ]
}
```

## Option 3: Deploy Backend to Render (Recommended for Backend)

### Why Render for Backend?
- Better support for Flask
- Free tier available
- Easy Python deployment
- Persistent storage

### Steps

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: tokutaisei-backend
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

5. Add Environment Variables:
   - `ALCHEMY_RPC_URL`
   - `ADMIN_PRIVATE_KEY`
   - `CONTRACT_ADDRESS`
   - `PINATA_JWT` (optional)

6. Deploy

7. Copy the backend URL (e.g., `https://tokutaisei-backend.onrender.com`)

8. Update frontend environment variable:
   - `VITE_BACKEND_URL=https://tokutaisei-backend.onrender.com`

9. Redeploy frontend on Vercel

## Option 4: Deploy Backend to Railway

### Steps

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Select `backend` folder
4. Add environment variables
5. Deploy
6. Get public URL
7. Update frontend `VITE_BACKEND_URL`

## Post-Deployment Checklist

### Frontend
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic)
- [ ] Build successful
- [ ] Site accessible

### Backend
- [ ] Deployed to Render/Railway/Vercel
- [ ] Environment variables set
- [ ] Health endpoint working
- [ ] CORS configured for frontend domain
- [ ] Database/IPFS connected

### Integration
- [ ] Frontend can connect to backend
- [ ] Wallet connection works
- [ ] Smart contract interaction works
- [ ] IPFS uploads work
- [ ] Transactions successful

## Environment Variables Reference

### Frontend (.env)
```env
VITE_ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_CONTRACT_ADDRESS=0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### Backend (.env)
```env
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ADMIN_PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6
PINATA_API_KEY=your_pinata_key (optional)
PINATA_SECRET_KEY=your_pinata_secret (optional)
PINATA_JWT=your_pinata_jwt (optional)
DEBUG=False
```

## Troubleshooting

### Build Fails on Vercel
- Check Node version (should be 18+)
- Verify all dependencies in package.json
- Check build logs for errors
- Ensure `dist` folder is created

### Frontend Can't Connect to Backend
- Verify CORS is enabled on backend
- Check backend URL is correct
- Ensure backend is running
- Check browser console for errors

### Wallet Connection Issues
- Ensure MetaMask is installed
- Check network is Sepolia
- Verify contract address is correct
- Check RPC URL is valid

### Transaction Failures
- Ensure sufficient gas in wallet
- Check contract is deployed
- Verify admin address
- Check backend logs

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com
4. Wait for DNS propagation

### SSL Certificate
- Automatic with Vercel
- Free Let's Encrypt certificate
- Auto-renewal

## Performance Optimization

### Frontend
- Enable Vercel Analytics
- Use Vercel Edge Network (automatic)
- Enable compression (automatic)
- Optimize images

### Backend
- Use caching for blockchain data
- Implement rate limiting
- Use connection pooling
- Monitor response times

## Monitoring

### Vercel
- Built-in analytics
- Real-time logs
- Performance metrics
- Error tracking

### Backend (Render)
- Application logs
- Metrics dashboard
- Health checks
- Alerts

## Cost Estimate

### Free Tier
- **Vercel**: Free (100GB bandwidth, unlimited projects)
- **Render**: Free (750 hours/month, sleeps after inactivity)
- **Railway**: $5 credit/month free

### Paid Tier (if needed)
- **Vercel Pro**: $20/month (more bandwidth, analytics)
- **Render Starter**: $7/month (always on, more resources)
- **Railway**: Pay as you go ($0.000463/GB-hour)

## Deployment Commands

### Deploy Frontend
```bash
cd frontend-react
vercel --prod
```

### Update Environment Variables
```bash
vercel env add VITE_BACKEND_URL production
```

### View Logs
```bash
vercel logs
```

### Rollback Deployment
```bash
vercel rollback
```

## CI/CD Setup

### Automatic Deployments
Vercel automatically deploys on:
- Push to main branch → Production
- Push to other branches → Preview
- Pull requests → Preview

### Disable Auto-Deploy
1. Project Settings → Git
2. Uncheck "Production Branch"
3. Deploy manually with `vercel --prod`

## Security Considerations

### Environment Variables
- Never commit `.env` files
- Use Vercel's environment variables
- Rotate keys regularly
- Use different keys for production

### CORS
- Restrict to your domain only
- Don't use `*` in production
- Update backend CORS settings

### Rate Limiting
- Implement on backend
- Use Vercel's DDoS protection
- Monitor for abuse

## Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://vercel-status.com

### Render Support
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

## Next Steps

1. Deploy frontend to Vercel
2. Deploy backend to Render
3. Configure environment variables
4. Test all functionality
5. Set up custom domain (optional)
6. Enable monitoring
7. Share your live app!

## Live URLs

After deployment, you'll have:
- **Frontend**: https://tokutaisei.vercel.app
- **Backend**: https://tokutaisei-backend.onrender.com
- **Custom Domain**: https://your-domain.com (optional)

## Quick Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash

echo "Deploying to Vercel..."

# Deploy frontend
cd frontend-react
vercel --prod

echo "Deployment complete!"
echo "Check your Vercel dashboard for the live URL"
```

Run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

**Ready to deploy?** Follow Option 1 for the easiest deployment! 🚀
