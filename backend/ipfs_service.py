import requests
import json
import hashlib
import time
from config import Config

class IPFSService:
    """Service for uploading documents to IPFS via Pinata"""
    
    def __init__(self):
        self.api_key = Config.PINATA_API_KEY
        self.secret_key = Config.PINATA_SECRET_KEY
        self.jwt = Config.PINATA_JWT
        self.base_url = "https://api.pinata.cloud"
        # Check if Pinata is configured
        self.use_pinata = bool(self.jwt and self.jwt.strip())
    
    def upload_file(self, file_data, filename):
        """Upload file to IPFS"""
        # If Pinata is not configured, use mock mode
        if not self.use_pinata:
            return self._mock_upload(file_data, filename)
        
        try:
            url = f"{self.base_url}/pinning/pinFileToIPFS"
            
            headers = {
                'Authorization': f'Bearer {self.jwt}'
            }
            
            files = {
                'file': (filename, file_data)
            }
            
            response = requests.post(url, files=files, headers=headers)
            
            if response.status_code == 200:
                result = response.json()
                return {
                    'success': True,
                    'ipfs_hash': result['IpfsHash'],
                    'url': f"https://gateway.pinata.cloud/ipfs/{result['IpfsHash']}"
                }
            else:
                return {
                    'success': False,
                    'error': f"Upload failed: {response.text}"
                }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def _mock_upload(self, file_data, filename):
        """Mock IPFS upload for testing when Pinata is not configured"""
        try:
            # Generate a deterministic hash based on file content and timestamp
            content_hash = hashlib.sha256(file_data).hexdigest()
            timestamp = str(int(time.time()))
            mock_hash = f"Qm{content_hash[:44]}"  # IPFS hashes start with Qm
            
            return {
                'success': True,
                'ipfs_hash': mock_hash,
                'url': f"https://ipfs.io/ipfs/{mock_hash}",
                'note': 'Mock IPFS hash - Configure Pinata for real uploads'
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def upload_json(self, json_data, name):
        """Upload JSON metadata to IPFS"""
        # If Pinata is not configured, use mock mode
        if not self.use_pinata:
            json_str = json.dumps(json_data).encode('utf-8')
            return self._mock_upload(json_str, name)
        
        try:
            url = f"{self.base_url}/pinning/pinJSONToIPFS"
            
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.jwt}'
            }
            
            payload = {
                'pinataContent': json_data,
                'pinataMetadata': {
                    'name': name
                }
            }
            
            response = requests.post(url, json=payload, headers=headers)
            
            if response.status_code == 200:
                result = response.json()
                return {
                    'success': True,
                    'ipfs_hash': result['IpfsHash'],
                    'url': f"https://gateway.pinata.cloud/ipfs/{result['IpfsHash']}"
                }
            else:
                return {
                    'success': False,
                    'error': f"Upload failed: {response.text}"
                }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_file(self, ipfs_hash):
        """Retrieve file from IPFS"""
        try:
            url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
            response = requests.get(url)
            
            if response.status_code == 200:
                return {
                    'success': True,
                    'data': response.content
                }
            else:
                return {
                    'success': False,
                    'error': f"Retrieval failed: {response.text}"
                }
        except Exception as e:
            return {'success': False, 'error': str(e)}
