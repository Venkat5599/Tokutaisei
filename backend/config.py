import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    
    # Blockchain
    SEPOLIA_RPC_URL = os.getenv('SEPOLIA_RPC_URL', 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY')
    CHAIN_ID = 11155111  # Sepolia testnet
    
    # Contract
    CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS', '')
    ADMIN_PRIVATE_KEY = os.getenv('ADMIN_PRIVATE_KEY', '')
    ADMIN_ADDRESS = os.getenv('ADMIN_ADDRESS', '')
    
    # IPFS (Pinata)
    PINATA_API_KEY = os.getenv('PINATA_API_KEY', '')
    PINATA_SECRET_KEY = os.getenv('PINATA_SECRET_KEY', '')
    PINATA_JWT = os.getenv('PINATA_JWT', '')
    
    # Database
    DATABASE_PATH = os.getenv('DATABASE_PATH', 'scholarship.db')
    
    # Gas settings
    GAS_LIMIT = 3000000
    MAX_PRIORITY_FEE = 2000000000  # 2 Gwei
    MAX_FEE = 50000000000  # 50 Gwei
