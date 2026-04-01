"""
Input validation utilities for the scholarship application system
"""
import re
from typing import Dict, List, Any

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_ethereum_address(address: str) -> bool:
    """Validate Ethereum address format"""
    pattern = r'^0x[a-fA-F0-9]{40}$'
    return bool(re.match(pattern, address))

def validate_application_data(data: Dict[str, Any]) -> List[str]:
    """
    Validate scholarship application data
    Returns list of error messages (empty if valid)
    """
    errors = []
    
    # Validate student address
    if 'studentAddress' not in data:
        errors.append('Student address is required')
    elif not validate_ethereum_address(data['studentAddress']):
        errors.append('Invalid Ethereum address format')
    
    # Validate name
    if 'name' not in data:
        errors.append('Name is required')
    elif not data['name'] or len(data['name'].strip()) < 2:
        errors.append('Name must be at least 2 characters')
    elif len(data['name']) > 100:
        errors.append('Name must be less than 100 characters')
    
    # Validate email
    if 'email' not in data:
        errors.append('Email is required')
    elif not validate_email(data['email']):
        errors.append('Invalid email format')
    
    # Validate family income
    if 'familyIncome' not in data:
        errors.append('Family income is required')
    else:
        try:
            income = int(data['familyIncome'])
            if income < 0:
                errors.append('Family income cannot be negative')
            if income > 10000000:  # 10 million max
                errors.append('Family income value seems unrealistic')
        except (ValueError, TypeError):
            errors.append('Family income must be a valid number')
    
    # Validate marks
    if 'marks' not in data:
        errors.append('Marks are required')
    else:
        try:
            marks = int(data['marks'])
            if marks < 0 or marks > 100:
                errors.append('Marks must be between 0 and 100')
        except (ValueError, TypeError):
            errors.append('Marks must be a valid number')
    
    # Validate requested amount
    if 'requestedAmount' not in data:
        errors.append('Requested amount is required')
    else:
        try:
            amount = float(data['requestedAmount'])
            if amount <= 0:
                errors.append('Requested amount must be greater than 0')
            if amount > 100:  # 100 ETH max
                errors.append('Requested amount exceeds maximum (100 ETH)')
        except (ValueError, TypeError):
            errors.append('Requested amount must be a valid number')
    
    # Validate private key
    if 'privateKey' not in data:
        errors.append('Private key is required')
    elif not data['privateKey'].startswith('0x') or len(data['privateKey']) != 66:
        errors.append('Invalid private key format')
    
    return errors

def validate_application_id(application_id: Any) -> tuple[bool, str]:
    """
    Validate application ID
    Returns (is_valid, error_message)
    """
    try:
        app_id = int(application_id)
        if app_id < 0:
            return False, 'Application ID must be non-negative'
        return True, ''
    except (ValueError, TypeError):
        return False, 'Application ID must be a valid number'

def validate_rejection_reason(reason: str) -> tuple[bool, str]:
    """
    Validate rejection reason
    Returns (is_valid, error_message)
    """
    if not reason or len(reason.strip()) < 10:
        return False, 'Rejection reason must be at least 10 characters'
    if len(reason) > 500:
        return False, 'Rejection reason must be less than 500 characters'
    return True, ''

def validate_deposit_amount(amount: Any) -> tuple[bool, str]:
    """
    Validate deposit amount
    Returns (is_valid, error_message)
    """
    try:
        amt = float(amount)
        if amt <= 0:
            return False, 'Deposit amount must be greater than 0'
        if amt > 1000:  # 1000 ETH max per deposit
            return False, 'Deposit amount exceeds maximum (1000 ETH)'
        return True, ''
    except (ValueError, TypeError):
        return False, 'Deposit amount must be a valid number'

def sanitize_string(text: str, max_length: int = 500) -> str:
    """
    Sanitize string input by removing potentially harmful characters
    """
    if not text:
        return ''
    
    # Remove null bytes and control characters
    sanitized = ''.join(char for char in text if ord(char) >= 32 or char in '\n\r\t')
    
    # Trim to max length
    return sanitized[:max_length].strip()
