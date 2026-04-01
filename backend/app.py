from flask import Flask, request, jsonify
from flask_cors import CORS
from blockchain import BlockchainService
from ipfs_service import IPFSService
from config import Config
import logging

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize services
blockchain = BlockchainService()
ipfs = IPFSService()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'blockchain_connected': blockchain.w3.is_connected()
    })

@app.route('/api/apply', methods=['POST'])
def apply_scholarship():
    """Submit scholarship application"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['studentAddress', 'name', 'email', 'familyIncome', 
                          'marks', 'requestedAmount', 'privateKey']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        # Handle document upload if provided
        ipfs_hash = data.get('ipfsDocumentHash', '')
        if 'document' in request.files:
            file = request.files['document']
            upload_result = ipfs.upload_file(file.read(), file.filename)
            if upload_result['success']:
                ipfs_hash = upload_result['ipfs_hash']
            else:
                return jsonify({'error': 'Document upload failed'}), 500
        
        # Submit application to blockchain
        result = blockchain.apply_for_scholarship(
            student_address=data['studentAddress'],
            name=data['name'],
            email=data['email'],
            family_income=int(data['familyIncome']),
            marks=int(data['marks']),
            ipfs_hash=ipfs_hash,
            requested_amount=float(data['requestedAmount']),
            private_key=data['privateKey']
        )
        
        if result['success']:
            return jsonify({
                'message': 'Application submitted successfully',
                'tx_hash': result['tx_hash'],
                'block_number': result['block_number']
            }), 201
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in apply_scholarship: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/applications', methods=['GET'])
def get_applications():
    """Get all applications"""
    try:
        result = blockchain.get_all_applications()
        
        if result['success']:
            return jsonify({
                'applications': result['applications'],
                'count': len(result['applications'])
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in get_applications: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/application/<int:application_id>', methods=['GET'])
def get_single_application(application_id):
    """Get specific application by ID"""
    try:
        result = blockchain.get_application(application_id)
        
        if result['success']:
            return jsonify(result['application']), 200
        else:
            return jsonify({'error': result['error']}), 404
            
    except Exception as e:
        logger.error(f"Error in get_single_application: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/applications/<int:application_id>', methods=['GET'])
def get_application(application_id):
    """Get specific application"""
    try:
        result = blockchain.get_application(application_id)
        
        if result['success']:
            return jsonify(result['application']), 200
        else:
            return jsonify({'error': result['error']}), 404
            
    except Exception as e:
        logger.error(f"Error in get_application: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/student/<address>/applications', methods=['GET'])
def get_student_applications(address):
    """Get applications by student address"""
    try:
        result = blockchain.get_student_applications(address)
        
        if result['success']:
            return jsonify({
                'applications': result['applications'],
                'count': len(result['applications'])
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in get_student_applications: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/approve', methods=['POST'])
def approve_application():
    """Approve scholarship application (admin only)"""
    try:
        data = request.json
        
        if 'applicationId' not in data:
            return jsonify({'error': 'Missing applicationId'}), 400
        
        result = blockchain.approve_scholarship(int(data['applicationId']))
        
        if result['success']:
            return jsonify({
                'message': 'Application approved successfully',
                'tx_hash': result['tx_hash'],
                'block_number': result['block_number']
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in approve_application: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/reject', methods=['POST'])
def reject_application():
    """Reject scholarship application (admin only)"""
    try:
        data = request.json
        
        if 'applicationId' not in data or 'reason' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = blockchain.reject_scholarship(
            int(data['applicationId']),
            data['reason']
        )
        
        if result['success']:
            return jsonify({
                'message': 'Application rejected successfully',
                'tx_hash': result['tx_hash'],
                'block_number': result['block_number']
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in reject_application: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/release-funds', methods=['POST'])
def release_funds():
    """Release funds to approved student (admin only)"""
    try:
        data = request.json
        
        if 'applicationId' not in data:
            return jsonify({'error': 'Missing applicationId'}), 400
        
        result = blockchain.release_funds(int(data['applicationId']))
        
        if result['success']:
            return jsonify({
                'message': 'Funds released successfully',
                'tx_hash': result['tx_hash'],
                'block_number': result['block_number']
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in release_funds: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/contract/balance', methods=['GET'])
def get_contract_balance():
    """Get contract balance"""
    try:
        result = blockchain.get_contract_balance()
        
        if result['success']:
            return jsonify({'balance': str(result['balance'])}), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in get_contract_balance: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/deposit', methods=['POST'])
def deposit_funds():
    """Deposit funds to contract (admin only)"""
    try:
        data = request.json
        
        if 'amount' not in data:
            return jsonify({'error': 'Missing amount'}), 400
        
        result = blockchain.deposit_funds(float(data['amount']))
        
        if result['success']:
            return jsonify({
                'message': 'Funds deposited successfully',
                'tx_hash': result['tx_hash'],
                'block_number': result['block_number']
            }), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in deposit_funds: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-document', methods=['POST'])
def upload_document():
    """Upload document to IPFS"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        result = ipfs.upload_file(file.read(), file.filename)
        
        if result['success']:
            response = {
                'ipfs_hash': result['ipfs_hash'],
                'url': result['url']
            }
            if 'note' in result:
                response['note'] = result['note']
            return jsonify(response), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in upload_document: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-metadata', methods=['POST'])
def upload_metadata():
    """Upload application metadata JSON to IPFS"""
    try:
        data = request.json
        
        if 'metadata' not in data:
            return jsonify({'error': 'No metadata provided'}), 400
        
        name = data.get('name', 'application-metadata')
        result = ipfs.upload_json(data['metadata'], name)
        
        if result['success']:
            response = {
                'ipfs_hash': result['ipfs_hash'],
                'url': result['url']
            }
            if 'note' in result:
                response['note'] = result['note']
            return jsonify(response), 200
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        logger.error(f"Error in upload_metadata: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=Config.DEBUG)
