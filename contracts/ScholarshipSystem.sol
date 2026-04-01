// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ScholarshipSystem
 * @dev Transparent scholarship management with on-chain verification
 */
contract ScholarshipSystem {
    
    // Enums
    enum ApplicationStatus { Pending, Approved, Rejected, FundsReleased }
    
    // Structs
    struct Application {
        address studentAddress;
        string name;
        string email;
        uint256 familyIncome;
        uint256 marks;
        string ipfsDocumentHash;
        ApplicationStatus status;
        uint256 requestedAmount;
        uint256 timestamp;
        string rejectionReason;
    }
    
    // State variables
    address public admin;
    uint256 public applicationCounter;
    uint256 public totalFundsDistributed;
    
    mapping(uint256 => Application) public applications;
    mapping(address => uint256[]) public studentApplications;
    mapping(address => bool) public hasActiveApplication;
    
    // Events
    event ApplicationSubmitted(
        uint256 indexed applicationId,
        address indexed student,
        string name,
        uint256 requestedAmount,
        uint256 timestamp
    );
    
    event ApplicationReviewed(
        uint256 indexed applicationId,
        ApplicationStatus status,
        address indexed reviewer,
        uint256 timestamp
    );
    
    event FundsReleased(
        uint256 indexed applicationId,
        address indexed student,
        uint256 amount,
        uint256 timestamp
    );
    
    event FundsDeposited(
        address indexed depositor,
        uint256 amount,
        uint256 timestamp
    );
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier validApplication(uint256 _applicationId) {
        require(_applicationId < applicationCounter, "Invalid application ID");
        _;
    }
    
    modifier applicationInStatus(uint256 _applicationId, ApplicationStatus _status) {
        require(
            applications[_applicationId].status == _status,
            "Application not in required status"
        );
        _;
    }
    
    // Constructor
    constructor() {
        admin = msg.sender;
        applicationCounter = 0;
        totalFundsDistributed = 0;
    }
    
    /**
     * @dev Submit scholarship application
     */
    function applyForScholarship(
        string memory _name,
        string memory _email,
        uint256 _familyIncome,
        uint256 _marks,
        string memory _ipfsDocumentHash,
        uint256 _requestedAmount
    ) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(_marks <= 100, "Marks cannot exceed 100");
        require(_requestedAmount > 0, "Requested amount must be greater than 0");
        require(!hasActiveApplication[msg.sender], "Already have an active application");
        
        uint256 applicationId = applicationCounter;
        
        applications[applicationId] = Application({
            studentAddress: msg.sender,
            name: _name,
            email: _email,
            familyIncome: _familyIncome,
            marks: _marks,
            ipfsDocumentHash: _ipfsDocumentHash,
            status: ApplicationStatus.Pending,
            requestedAmount: _requestedAmount,
            timestamp: block.timestamp,
            rejectionReason: ""
        });
        
        studentApplications[msg.sender].push(applicationId);
        hasActiveApplication[msg.sender] = true;
        applicationCounter++;
        
        emit ApplicationSubmitted(
            applicationId,
            msg.sender,
            _name,
            _requestedAmount,
            block.timestamp
        );
    }
    
    /**
     * @dev Approve scholarship application
     */
    function approveScholarship(uint256 _applicationId)
        external
        onlyAdmin
        validApplication(_applicationId)
        applicationInStatus(_applicationId, ApplicationStatus.Pending)
    {
        applications[_applicationId].status = ApplicationStatus.Approved;
        
        emit ApplicationReviewed(
            _applicationId,
            ApplicationStatus.Approved,
            msg.sender,
            block.timestamp
        );
    }
    
    /**
     * @dev Reject scholarship application
     */
    function rejectScholarship(uint256 _applicationId, string memory _reason)
        external
        onlyAdmin
        validApplication(_applicationId)
        applicationInStatus(_applicationId, ApplicationStatus.Pending)
    {
        applications[_applicationId].status = ApplicationStatus.Rejected;
        applications[_applicationId].rejectionReason = _reason;
        hasActiveApplication[applications[_applicationId].studentAddress] = false;
        
        emit ApplicationReviewed(
            _applicationId,
            ApplicationStatus.Rejected,
            msg.sender,
            block.timestamp
        );
    }
    
    /**
     * @dev Release funds to approved student
     */
    function releaseFunds(uint256 _applicationId)
        external
        onlyAdmin
        validApplication(_applicationId)
        applicationInStatus(_applicationId, ApplicationStatus.Approved)
    {
        Application storage app = applications[_applicationId];
        require(address(this).balance >= app.requestedAmount, "Insufficient contract balance");
        
        app.status = ApplicationStatus.FundsReleased;
        hasActiveApplication[app.studentAddress] = false;
        totalFundsDistributed += app.requestedAmount;
        
        (bool success, ) = payable(app.studentAddress).call{value: app.requestedAmount}("");
        require(success, "Fund transfer failed");
        
        emit FundsReleased(
            _applicationId,
            app.studentAddress,
            app.requestedAmount,
            block.timestamp
        );
    }
    
    /**
     * @dev Deposit funds to contract
     */
    function depositFunds() external payable {
        require(msg.value > 0, "Must send ETH");
        emit FundsDeposited(msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Get application details
     */
    function getApplication(uint256 _applicationId)
        external
        view
        validApplication(_applicationId)
        returns (
            address studentAddress,
            string memory name,
            string memory email,
            uint256 familyIncome,
            uint256 marks,
            string memory ipfsDocumentHash,
            ApplicationStatus status,
            uint256 requestedAmount,
            uint256 timestamp,
            string memory rejectionReason
        )
    {
        Application memory app = applications[_applicationId];
        return (
            app.studentAddress,
            app.name,
            app.email,
            app.familyIncome,
            app.marks,
            app.ipfsDocumentHash,
            app.status,
            app.requestedAmount,
            app.timestamp,
            app.rejectionReason
        );
    }
    
    /**
     * @dev Get student's application IDs
     */
    function getStudentApplications(address _student)
        external
        view
        returns (uint256[] memory)
    {
        return studentApplications[_student];
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Get all pending applications (gas-intensive, use with caution)
     */
    function getPendingApplicationsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < applicationCounter; i++) {
            if (applications[i].status == ApplicationStatus.Pending) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * @dev Transfer admin rights
     */
    function transferAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        admin = _newAdmin;
    }
    
    // Fallback function to receive ETH
    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value, block.timestamp);
    }
}
