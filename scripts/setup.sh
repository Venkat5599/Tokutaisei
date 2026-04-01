#!/bin/bash

# Blockchain Scholarship System - Setup Script
# This script automates the initial setup process

echo "=========================================="
echo "Blockchain Scholarship System Setup"
echo "=========================================="
echo ""

# Check Python installation
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.9 or higher"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo "Python version: $PYTHON_VERSION"
echo ""

# Create virtual environment
echo "Creating Python virtual environment..."
cd backend
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "Installing Solidity compiler..."
python3 -c "from solcx import install_solc; install_solc('0.8.20')"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ""
    echo "=========================================="
    echo "IMPORTANT: Configure your .env file"
    echo "=========================================="
    echo ""
    echo "Please edit backend/.env and add:"
    echo "1. SEPOLIA_RPC_URL (from Infura)"
    echo "2. ADMIN_PRIVATE_KEY (your wallet private key)"
    echo "3. ADMIN_ADDRESS (your wallet address)"
    echo "4. PINATA credentials (API key, secret, JWT)"
    echo ""
    echo "Get Sepolia ETH from faucets:"
    echo "- https://sepoliafaucet.com/"
    echo "- https://www.infura.io/faucet/sepolia"
    echo ""
fi

cd ..

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure backend/.env file"
echo "2. Get Sepolia testnet ETH"
echo "3. Run: cd scripts && python deploy.py"
echo "4. Run: cd backend && python app.py"
echo "5. Open frontend/index.html in browser"
echo ""
echo "For detailed instructions, see docs/DEPLOYMENT.md"
echo ""
