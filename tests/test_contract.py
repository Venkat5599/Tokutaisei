"""
Unit tests for ScholarshipSystem smart contract
Run with: pytest test_contract.py
"""
import pytest
from web3 import Web3
from eth_account import Account
import json

# Test configuration
RPC_URL = "http://127.0.0.1:8545"  # Local Ganache
INITIAL_BALANCE = Web3.to_wei(10, 'ether')

@pytest.fixture
def w3():
    """Web3 instance"""
    return Web3(Web3.HTTPProvider(RPC_URL))

@pytest.fixture
def accounts(w3):
    """Test accounts"""
    return {
        'admin': w3.eth.accounts[0],
        'student1': w3.eth.accounts[1],
        'student2': w3.eth.accounts[2]
    }

@pytest.fixture
def contract(w3, accounts):
    """Deploy contract for testing"""
    # Load compiled contract
    with open('../backend/contract_abi.json', 'r') as f:
        abi = json.load(f)
    
    # Deploy contract
    Contract = w3.eth.contract(abi=abi, bytecode='0x...')  # Add bytecode
    tx_hash = Contract.constructor().transact({'from': accounts['admin']})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    return w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

class TestScholarshipSystem:
    
    def test_deployment(self, contract, accounts):
        """Test contract deployment"""
        assert contract.functions.admin().call() == accounts['admin']
        assert contract.functions.applicationCounter().call() == 0
    
    def test_apply_for_scholarship(self, w3, contract, accounts):
        """Test scholarship application"""
        student = accounts['student1']
        
        tx_hash = contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student})
        
        w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Verify application
        app = contract.functions.getApplication(0).call()
        assert app[0] == student  # studentAddress
        assert app[1] == "John Doe"  # name
        assert app[6] == 0  # status (Pending)
    
    def test_duplicate_application_prevention(self, w3, contract, accounts):
        """Test that duplicate applications are prevented"""
        student = accounts['student1']
        
        # First application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student})
        
        # Second application should fail
        with pytest.raises(Exception):
            contract.functions.applyForScholarship(
                "John Doe",
                "john@example.com",
                25000,
                85,
                "QmTestHash",
                w3.to_wei(0.1, 'ether')
            ).transact({'from': student})
    
    def test_approve_scholarship(self, w3, contract, accounts):
        """Test scholarship approval"""
        student = accounts['student1']
        admin = accounts['admin']
        
        # Submit application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student})
        
        # Approve
        tx_hash = contract.functions.approveScholarship(0).transact({'from': admin})
        w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Verify status
        app = contract.functions.getApplication(0).call()
        assert app[6] == 1  # status (Approved)
    
    def test_reject_scholarship(self, w3, contract, accounts):
        """Test scholarship rejection"""
        student = accounts['student1']
        admin = accounts['admin']
        
        # Submit application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student})
        
        # Reject
        tx_hash = contract.functions.rejectScholarship(
            0,
            "Insufficient documentation"
        ).transact({'from': admin})
        w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Verify status
        app = contract.functions.getApplication(0).call()
        assert app[6] == 2  # status (Rejected)
        assert app[9] == "Insufficient documentation"  # rejectionReason
    
    def test_release_funds(self, w3, contract, accounts):
        """Test fund release"""
        student = accounts['student1']
        admin = accounts['admin']
        amount = w3.to_wei(0.1, 'ether')
        
        # Deposit funds to contract
        w3.eth.send_transaction({
            'from': admin,
            'to': contract.address,
            'value': w3.to_wei(1, 'ether')
        })
        
        # Submit and approve application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            amount
        ).transact({'from': student})
        
        contract.functions.approveScholarship(0).transact({'from': admin})
        
        # Get initial balance
        initial_balance = w3.eth.get_balance(student)
        
        # Release funds
        tx_hash = contract.functions.releaseFunds(0).transact({'from': admin})
        w3.eth.wait_for_transaction_receipt(tx_hash)
        
        # Verify balance increased
        final_balance = w3.eth.get_balance(student)
        assert final_balance > initial_balance
        
        # Verify status
        app = contract.functions.getApplication(0).call()
        assert app[6] == 3  # status (FundsReleased)
    
    def test_non_admin_cannot_approve(self, w3, contract, accounts):
        """Test that non-admin cannot approve"""
        student1 = accounts['student1']
        student2 = accounts['student2']
        
        # Submit application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student1})
        
        # Try to approve as non-admin
        with pytest.raises(Exception):
            contract.functions.approveScholarship(0).transact({'from': student2})
    
    def test_deposit_funds(self, w3, contract, accounts):
        """Test fund deposit"""
        admin = accounts['admin']
        amount = w3.to_wei(1, 'ether')
        
        initial_balance = contract.functions.getContractBalance().call()
        
        # Deposit
        tx_hash = contract.functions.depositFunds().transact({
            'from': admin,
            'value': amount
        })
        w3.eth.wait_for_transaction_receipt(tx_hash)
        
        final_balance = contract.functions.getContractBalance().call()
        assert final_balance == initial_balance + amount
    
    def test_get_student_applications(self, w3, contract, accounts):
        """Test retrieving student applications"""
        student = accounts['student1']
        
        # Submit application
        contract.functions.applyForScholarship(
            "John Doe",
            "john@example.com",
            25000,
            85,
            "QmTestHash",
            w3.to_wei(0.1, 'ether')
        ).transact({'from': student})
        
        # Get applications
        app_ids = contract.functions.getStudentApplications(student).call()
        assert len(app_ids) == 1
        assert app_ids[0] == 0
    
    def test_invalid_marks(self, w3, contract, accounts):
        """Test that marks > 100 are rejected"""
        student = accounts['student1']
        
        with pytest.raises(Exception):
            contract.functions.applyForScholarship(
       