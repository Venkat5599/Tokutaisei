from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account
import json
from config import Config

class BlockchainService:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(Config.SEPOLIA_RPC_URL))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        
        if not self.w3.is_connected():
            raise Exception("Failed to connect to Ethereum network")
        
        self.contract_address = Config.CONTRACT_ADDRESS
        self.admin_private_key = Config.ADMIN_PRIVATE_KEY
        self.admin_address = Config.ADMIN_ADDRESS
        
        # Load contract ABI
        with open('contract_abi.json', 'r') as f:
            self.contract_abi = json.load(f)
        
        if self.contract_address:
            self.contract = self.w3.eth.contract(
                address=Web3.to_checksum_address(self.contract_address),
                abi=self.contract_abi
            )
    
    def get_account_balance(self, address):
        """Get ETH balance of an address"""
        balance_wei = self.w3.eth.get_balance(Web3.to_checksum_address(address))
        return self.w3.from_wei(balance_wei, 'ether')
    
    def apply_for_scholarship(self, student_address, name, email, family_income, 
                             marks, ipfs_hash, requested_amount, private_key):
        """Submit scholarship application"""
        try:
            student_address = Web3.to_checksum_address(student_address)
            nonce = self.w3.eth.get_transaction_count(student_address)
            
            # Build transaction
            transaction = self.contract.functions.applyForScholarship(
                name,
                email,
                family_income,
                marks,
                ipfs_hash,
                self.w3.to_wei(requested_amount, 'ether')
            ).build_transaction({
                'from': student_address,
                'nonce': nonce,
                'gas': Config.GAS_LIMIT,
                'maxFeePerGas': Config.MAX_FEE,
                'maxPriorityFeePerGas': Config.MAX_PRIORITY_FEE,
                'chainId': Config.CHAIN_ID
            })
            
            # Sign transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key)
            
            # Send transaction
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            # Wait for receipt
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': True,
                'tx_hash': tx_hash.hex(),
                'block_number': tx_receipt['blockNumber']
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def approve_scholarship(self, application_id):
        """Approve scholarship application (admin only)"""
        try:
            admin_address = Web3.to_checksum_address(self.admin_address)
            nonce = self.w3.eth.get_transaction_count(admin_address)
            
            transaction = self.contract.functions.approveScholarship(
                application_id
            ).build_transaction({
                'from': admin_address,
                'nonce': nonce,
                'gas': Config.GAS_LIMIT,
                'maxFeePerGas': Config.MAX_FEE,
                'maxPriorityFeePerGas': Config.MAX_PRIORITY_FEE,
                'chainId': Config.CHAIN_ID
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(
                transaction, 
                self.admin_private_key
            )
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': True,
                'tx_hash': tx_hash.hex(),
                'block_number': tx_receipt['blockNumber']
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def reject_scholarship(self, application_id, reason):
        """Reject scholarship application (admin only)"""
        try:
            admin_address = Web3.to_checksum_address(self.admin_address)
            nonce = self.w3.eth.get_transaction_count(admin_address)
            
            transaction = self.contract.functions.rejectScholarship(
                application_id,
                reason
            ).build_transaction({
                'from': admin_address,
                'nonce': nonce,
                'gas': Config.GAS_LIMIT,
                'maxFeePerGas': Config.MAX_FEE,
                'maxPriorityFeePerGas': Config.MAX_PRIORITY_FEE,
                'chainId': Config.CHAIN_ID
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(
                transaction,
                self.admin_private_key
            )
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': True,
                'tx_hash': tx_hash.hex(),
                'block_number': tx_receipt['blockNumber']
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def release_funds(self, application_id):
        """Release funds to approved student (admin only)"""
        try:
            admin_address = Web3.to_checksum_address(self.admin_address)
            nonce = self.w3.eth.get_transaction_count(admin_address)
            
            transaction = self.contract.functions.releaseFunds(
                application_id
            ).build_transaction({
                'from': admin_address,
                'nonce': nonce,
                'gas': Config.GAS_LIMIT,
                'maxFeePerGas': Config.MAX_FEE,
                'maxPriorityFeePerGas': Config.MAX_PRIORITY_FEE,
                'chainId': Config.CHAIN_ID
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(
                transaction,
                self.admin_private_key
            )
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': True,
                'tx_hash': tx_hash.hex(),
                'block_number': tx_receipt['blockNumber']
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_application(self, application_id):
        """Get application details"""
        try:
            app = self.contract.functions.getApplication(application_id).call()
            
            return {
                'success': True,
                'application': {
                    'id': application_id,
                    'studentAddress': app[0],
                    'name': app[1],
                    'email': app[2],
                    'familyIncome': app[3],
                    'marks': app[4],
                    'ipfsDocumentHash': app[5],
                    'status': app[6],  # Return as integer
                    'requestedAmount': str(app[7]),  # Return Wei as string
                    'timestamp': app[8],
                    'rejectionReason': app[9]
                }
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_all_applications(self):
        """Get all applications"""
        try:
            counter = self.contract.functions.applicationCounter().call()
            applications = []
            
            for i in range(counter):
                result = self.get_application(i)
                if result['success']:
                    applications.append(result['application'])
            
            return {'success': True, 'applications': applications}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_student_applications(self, student_address):
        """Get applications by student"""
        try:
            student_address = Web3.to_checksum_address(student_address)
            app_ids = self.contract.functions.getStudentApplications(student_address).call()
            applications = []
            
            for app_id in app_ids:
                result = self.get_application(app_id)
                if result['success']:
                    applications.append(result['application'])
            
            return {'success': True, 'applications': applications}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_contract_balance(self):
        """Get contract balance"""
        try:
            balance_wei = self.contract.functions.getContractBalance().call()
            return {
                'success': True,
                'balance': self.w3.from_wei(balance_wei, 'ether')
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def deposit_funds(self, amount_eth):
        """Deposit funds to contract"""
        try:
            admin_address = Web3.to_checksum_address(self.admin_address)
            nonce = self.w3.eth.get_transaction_count(admin_address)
            
            transaction = self.contract.functions.depositFunds().build_transaction({
                'from': admin_address,
                'value': self.w3.to_wei(amount_eth, 'ether'),
                'nonce': nonce,
                'gas': Config.GAS_LIMIT,
                'maxFeePerGas': Config.MAX_FEE,
                'maxPriorityFeePerGas': Config.MAX_PRIORITY_FEE,
                'chainId': Config.CHAIN_ID
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(
                transaction,
                self.admin_private_key
            )
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            return {
                'success': True,
                'tx_hash': tx_hash.hex(),
                'block_number': tx_receipt['blockNumber']
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
