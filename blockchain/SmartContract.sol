// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BankAuditLedger
 * @dev A privacy-preserving immutable log for banking document intelligence.
 * Stores cryptographic proofs of access without revealing raw PII.
 */
contract BankAuditLedger is AccessControl, ReentrancyGuard {
    
    // ==========================================
    // ROLES
    // ==========================================
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant AI_NODE_ROLE = keccak256("AI_NODE_ROLE");
    bytes32 public constant COMPLIANCE_ADMIN = keccak256("COMPLIANCE_ADMIN");

    // ==========================================
    // DATA STRUCTURES
    // ==========================================
    
    enum ActionType {
        UPLOAD,         // 0: Document Ingestion
        PII_MASKING,    // 1: AI Redaction Process
        DATA_EXTRACTION,// 2: JSON Extraction
        ADMIN_VIEW_RAW, // 3: "Break Glass" (High Alert)
        DELETE          // 4: Data Purge
    }

    struct LogEntry {
        uint256 id;
        bytes32 documentHash;   // SHA-256 Hash of the original file (Proof of Existence)
        bytes32 actionHash;     // Hash of the specific action details
        ActionType actionType;
        address actor;          // Wallet address of the node/user
        uint256 timestamp;      // Block timestamp
        string metadata;        // Encrypted metadata reference (IPFS CID or Internal ID)
    }

    // Storage: Mapping from Document Hash -> Array of Log Entries (History)
    mapping(bytes32 => LogEntry[]) private _documentHistory;
    
    // Storage: Total global log count
    uint256 private _totalLogs;

    // ==========================================
    // EVENTS (For Frontend Real-time Updates)
    // ==========================================
    event LogCreated(
        uint256 indexed logId,
        bytes32 indexed documentHash,
        address indexed actor,
        ActionType actionType,
        uint256 timestamp
    );

    event HighSeverityAlert(
        bytes32 indexed documentHash,
        address indexed actor,
        string reason
    );

    // ==========================================
    // CONSTRUCTOR
    // ==========================================
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COMPLIANCE_ADMIN, msg.sender);
    }

    // ==========================================
    // CORE FUNCTIONS
    // ==========================================

    /**
     * @notice Records an action on the immutable ledger.
     * @dev Only authorized AI Nodes or Admins can call this.
     * @param _docHash The SHA-256 hash of the document content.
     * @param _actionType The type of operation performed.
     * @param _metadata Encrypted string (e.g., "AES-256:QmXyZ...") or Reference ID.
     */
    function recordAction(
        bytes32 _docHash,
        ActionType _actionType,
        string calldata _metadata
    ) external nonReentrant onlyRole(AI_NODE_ROLE) {
        
        _totalLogs++;
        
        // Construct the log entry
        LogEntry memory newEntry = LogEntry({
            id: _totalLogs,
            documentHash: _docHash,
            actionHash: keccak256(abi.encodePacked(_docHash, _actionType, block.timestamp, msg.sender)),
            actionType: _actionType,
            actor: msg.sender,
            timestamp: block.timestamp,
            metadata: _metadata
        });

        // Push to storage
        _documentHistory[_docHash].push(newEntry);

        // Emit standard log event
        emit LogCreated(_totalLogs, _docHash, msg.sender, _actionType, block.timestamp);

        // TRIGGER: If this is a "Break Glass" event (Viewing Raw Data), emit a high severity alert
        if (_actionType == ActionType.ADMIN_VIEW_RAW) {
            emit HighSeverityAlert(_docHash, msg.sender, "WARNING: RAW PII UNMASKED BY ADMIN");
        }
    }

    /**
     * @notice Verifies if a document exists and returns its full audit trail.
     * @param _docHash The hash of the document to lookup.
     * @return LogEntry[] The complete history of the document.
     */
    function getDocumentAuditTrail(bytes32 _docHash) external view returns (LogEntry[] memory) {
        return _documentHistory[_docHash];
    }

    /**
     * @notice Validates a specific log entry against its parameters (Zero-Knowledge style verification).
     */
    function verifyLogIntegrity(
        bytes32 _docHash,
        uint256 _logIndex,
        ActionType _claimedAction,
        uint256 _claimedTime
    ) external view returns (bool) {
        if (_logIndex >= _documentHistory[_docHash].length) return false;
        
        LogEntry memory entry = _documentHistory[_docHash][_logIndex];
        
        return (
            entry.actionType == _claimedAction &&
            entry.timestamp == _claimedTime
        );
    }

    // ==========================================
    // ADMIN FUNCTIONS
    // ==========================================
    
    function addAuthorizedNode(address _node) external onlyRole(COMPLIANCE_ADMIN) {
        grantRole(AI_NODE_ROLE, _node);
    }

    function revokeNode(address _node) external onlyRole(COMPLIANCE_ADMIN) {
        revokeRole(AI_NODE_ROLE, _node);
    }
}