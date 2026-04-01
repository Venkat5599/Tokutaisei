"""
Smart Contract Deployment Script for Sepolia Testnet
"""
import json
import sys
from web3 import Web3
from web3.middleware import geth_poa_middleware
from solcx import compile_standard, install_solc
from eth_account import Account
import os
from dotenv import load_dotenv

load_dotenv()

def compile_contract():
    """Compile Solidity contract"""
    print("Installing Solidity compiler...")
    install_solc('0.8.20')
    
    print("Reading contract source...")
    with open('../contracts/ScholarshipSystem.sol', 'r') as file:
        contract_source = file.read()
    
    print("Compiling contract...")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"ScholarshipSystem.sol": {"content": contract_source}},
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                    }
                }
            },
        },
        solc_version="0.8.20",
    )
    
    return compiled_sol

def deploy_contract():
    """Deploy contract to Sepolia testnet"""
    
    # Get configuration
    rpc_url = os.getenv('SEPOLIA_RPC_URL')
    private_key = os.getenv('ADMIN_PRIVATE_KEY')
    
    if not rpc_url or not private_key:
        print("Error: Missing SEPOLIA_RPC_URL or ADMIN_PRIVATE_KEY in .env file")
        sys.exit(1)
    
    # Connect to Sepolia
    print(f"Connecting to Sepolia...")
    w3 = Web3(Web3.HTTPProvider(rpc_url))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    
    if not w3.is_connected():
        print("Error: Failed to connect to Ethereum network")
        sys.exit(1)
    
    print(f"Connected! Chain ID: {w3.eth.chain_id}")
    
    # Get deployer account
    account = Account.from_key(private_key)
    deployer_address = account.address
    
    print(f"Deployer address: {deployer_address}")
    
    # Check balance
    balance = w3.eth.get_balance(deployer_address)
    balance_eth = w3.from_wei(balance, 'ether')
    print(f"Deployer balance: {balance_eth} ETH")
    
    if balance_eth < 0.01:
        print("Warning: Low balance. Get Sepolia ETH from faucet:")
        print("https://sepoliafaucet.com/")
        print("https://www.infura.io/faucet/sepolia")
    
    # Compile contract
    compiled_sol = compile_contract()
    
    # Get bytecode and ABI
    contract_interface = compiled_sol['contracts']['ScholarshipSystem.sol']['ScholarshipSystem']
    bytecode = contract_interface['evm']['bytecode']['object']
    abi = contract_interface['abi']
    
    # Save ABI
    print("Saving ABI...")
    with open('../backend/contract_abi.json', 'w') as f:
        json.dump(abi, f, indent=2)
    
    # Create contract instance
    Contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    
    # Get nonce
    nonce = w3.eth.get_transaction_count(deployer_address)
    
    print("Building deployment transaction...")
    transaction = Contract.constructor().build_transaction({
        'from': deployer_address,
        'nonce': nonce,
        'gas': 3000000,
        'maxFeePerGas': w3.to_wei(50, 'gwei'),
        'maxPriorityFeePerGas': w3.to_wei(2, 'gwei'),
        'chainId': 11155111
    })
    
    print("Signing transaction...")
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
    
    print("Sending transaction...")
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    print(f"Transaction hash: {tx_hash.hex()}")
    
    print("Waiting for confirmation...")
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    contract_address = tx_receipt.contractAddress
    print(f"\n{'='*60}")
    print(f"Contract deployed successfully!")
    print(f"Contract address: {contract_address}")
    print(f"Block number: {tx_receipt.blockNumber}")
    print(f"Gas used: {tx_receipt.gasUsed}")
    print(f"{'='*60}\n")
    
    # Update .env file
    print("Updating .env file...")
    env_path = '../backend/.env'
    
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            env_content = f.read()
        
        if 'CONTRACT_ADDRESS=' in env_content:
            lines = env_content.split('\n')
            for i, line in enumerate(lines):
                if line.startswith('CONTRACT_ADDRESS='):
                    lines[i] = f'CONTRACT_ADDRESS={contract_address}'
            env_content = '\n'.join(lines)
        else:
            env_content += f'\nCONTRACT_ADDRESS={contract_address}\n'
        
        with open(env_path, 'w') as f:
            f.write(env_content)
    
    print("\nDeployment complete!")
    print(f"View on Etherscan: https://sepolia.etherscan.io/address/{contract_address}")
    
    return contract_address

if __name__ == "__main__":
    try:
        deploy_contract()
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
