// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DecentraArtisanNFT
 * @dev ERC721 token for Decentra Artisan Market with metadata storage
 */
contract DecentraArtisanNFT is ERC721URIStorage, Ownable {
    // Token ID counter
    uint256 private _nextTokenId;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _creators;
    
    // Mapping from token ID to creator name
    mapping(uint256 => string) private _creatorNames;
    
    // Mapping from token ID to royalty percentage (in basis points, e.g., 250 = 2.5%)
    mapping(uint256 => uint256) private _royalties;
    
    // Mapping from token ID to total editions
    mapping(uint256 => uint256) private _totalEditions;
    
    // Mapping from token ID to minted editions
    mapping(uint256 => uint256) private _mintedEditions;
    
    // Base URI for token metadata
    string private _baseTokenURI;
    
    // New: Mapping for token compliance verification
    mapping(uint256 => bool) private _complianceVerified;
    
    // New: Mapping for token IP rights verification
    mapping(uint256 => bool) private _ipRightsVerified;
    
    // New: Mapping from token ID to category
    mapping(uint256 => string) private _categories;
    
    // New: Mapping for token category verification
    mapping(uint256 => bool) private _categoryVerified;
    
    // Events
    event NFTMinted(address indexed creator, uint256 indexed tokenId, string tokenURI, string creatorName, string category);
    event EditionMinted(uint256 indexed tokenId, uint256 editionNumber, uint256 totalEditions);
    event RoyaltySet(uint256 indexed tokenId, uint256 royaltyPercentage);
    event ComplianceVerified(uint256 indexed tokenId, bool status);
    event IPRightsVerified(uint256 indexed tokenId, bool status);
    event CategorySet(uint256 indexed tokenId, string category);
    event CategoryVerified(uint256 indexed tokenId, string category, bool status);
    
    /**
     * @dev Constructor sets the name and symbol for the token
     */
    constructor() ERC721("Decentra Artisan NFT", "DART") Ownable(msg.sender) {
        _baseTokenURI = "";
        _nextTokenId = 1; // Start token IDs from 1
    }
    
    /**
     * @dev Sets the base URI for all token IDs
     * @param baseURI The base URI to set
     */
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Returns the base URI set via {setBaseURI}
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Mints a new NFT
     * @param to The address that will own the minted NFT
     * @param tokenURI The token URI of the minted NFT
     * @param royaltyPercentage The royalty percentage in basis points (e.g., 250 = 2.5%)
     * @param creatorName The name of the creator
     * @param editions The number of editions to mint
     * @param category The category of the NFT (art, music, photography, etc.)
     * @return tokenId The ID of the newly minted NFT
     */
    function mintNFT(
        address to, 
        string memory tokenURI, 
        uint256 royaltyPercentage, 
        string memory creatorName,
        uint256 editions,
        string memory category
    ) 
        public 
        returns (uint256) 
    {
        require(royaltyPercentage <= 2000, "Royalty percentage cannot exceed 20%");
        require(editions > 0, "Number of editions must be greater than 0");
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        // Set creator and royalty information
        _creators[tokenId] = msg.sender;
        _creatorNames[tokenId] = creatorName;
        _royalties[tokenId] = royaltyPercentage;
        _totalEditions[tokenId] = editions;
        _mintedEditions[tokenId] = 1; // First edition is minted now
        
        // Set category
        _categories[tokenId] = category;
        
        // Default verification statuses to false, requires verification
        _complianceVerified[tokenId] = false;
        _ipRightsVerified[tokenId] = false;
        _categoryVerified[tokenId] = false;
        
        emit NFTMinted(msg.sender, tokenId, tokenURI, creatorName, category);
        emit EditionMinted(tokenId, 1, editions);
        emit RoyaltySet(tokenId, royaltyPercentage);
        emit CategorySet(tokenId, category);
        
        return tokenId;
    }
    
    /**
     * @dev Verify compliance for an NFT (can only be called by creator or owner)
     * @param tokenId The token ID to verify
     * @param status The compliance status
     */
    function verifyCompliance(uint256 tokenId, bool status) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            _creators[tokenId] == msg.sender || owner() == msg.sender,
            "Only creator or contract owner can verify compliance"
        );
        
        _complianceVerified[tokenId] = status;
        emit ComplianceVerified(tokenId, status);
    }
    
    /**
     * @dev Verify IP rights for an NFT (can only be called by creator or owner)
     * @param tokenId The token ID to verify
     * @param status The IP rights verification status
     */
    function verifyIPRights(uint256 tokenId, bool status) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            _creators[tokenId] == msg.sender || owner() == msg.sender,
            "Only creator or contract owner can verify IP rights"
        );
        
        _ipRightsVerified[tokenId] = status;
        emit IPRightsVerified(tokenId, status);
    }
    
    /**
     * @dev Verify category-specific requirements for an NFT
     * @param tokenId The token ID to verify
     * @param category The category to verify (should match the token's category)
     * @param status The verification status
     */
    function verifyCategory(uint256 tokenId, string memory category, bool status) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            _creators[tokenId] == msg.sender || owner() == msg.sender,
            "Only creator or contract owner can verify category"
        );
        
        string memory tokenCategory = _categories[tokenId];
        require(
            keccak256(abi.encodePacked(tokenCategory)) == keccak256(abi.encodePacked(category)),
            "Category mismatch"
        );
        
        _categoryVerified[tokenId] = status;
        emit CategoryVerified(tokenId, category, status);
    }
    
    /**
     * @dev Update the category of an NFT (can only be called by creator or owner)
     * @param tokenId The token ID to update
     * @param newCategory The new category
     */
    function updateCategory(uint256 tokenId, string memory newCategory) public {
        require(_exists(tokenId), "Token does not exist");
        require(
            _creators[tokenId] == msg.sender || owner() == msg.sender,
            "Only creator or contract owner can update category"
        );
        
        _categories[tokenId] = newCategory;
        // Reset category verification
        _categoryVerified[tokenId] = false;
        
        emit CategorySet(tokenId, newCategory);
    }
    
    /**
     * @dev Check if an NFT is fully verified (compliance, IP rights, and category)
     * @param tokenId The token ID to check
     * @return isVerified Whether the NFT is fully verified
     */
    function isFullyVerified(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return _complianceVerified[tokenId] && _ipRightsVerified[tokenId] && _categoryVerified[tokenId];
    }
    
    /**
     * @dev Get compliance verification status
     * @param tokenId The token ID to check
     * @return status The compliance verification status
     */
    function getComplianceStatus(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return _complianceVerified[tokenId];
    }
    
    /**
     * @dev Get IP rights verification status
     * @param tokenId The token ID to check
     * @return status The IP rights verification status
     */
    function getIPRightsStatus(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return _ipRightsVerified[tokenId];
    }
    
    /**
     * @dev Get category verification status
     * @param tokenId The token ID to check
     * @return status The category verification status
     */
    function getCategoryStatus(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return _categoryVerified[tokenId];
    }
    
    /**
     * @dev Get the category of an NFT
     * @param tokenId The token ID to check
     * @return category The category of the NFT
     */
    function getCategory(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _categories[tokenId];
    }
    
    /**
     * @dev Mints an additional edition of an existing NFT
     * @param to The address that will own the minted edition
     * @param tokenId The token ID of the original NFT
     * @return editionNumber The edition number of the newly minted token
     */
    function mintEdition(address to, uint256 tokenId) 
        public 
        returns (uint256) 
    {
        require(_exists(tokenId), "Token does not exist");
        require(_creators[tokenId] == msg.sender, "Only creator can mint additional editions");
        require(_mintedEditions[tokenId] < _totalEditions[tokenId], "All editions have been minted");
        
        // Increment minted editions
        _mintedEditions[tokenId]++;
        uint256 editionNumber = _mintedEditions[tokenId];
        
        // Mint a new token with the same URI
        uint256 newTokenId = _nextTokenId++;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI(tokenId));
        
        // Set creator and royalty information
        _creators[newTokenId] = msg.sender;
        _creatorNames[newTokenId] = _creatorNames[tokenId];
        _royalties[newTokenId] = _royalties[tokenId];
        _totalEditions[newTokenId] = _totalEditions[tokenId];
        _mintedEditions[newTokenId] = editionNumber;
        
        // Copy category information
        _categories[newTokenId] = _categories[tokenId];
        
        // Copy verification statuses
        _complianceVerified[newTokenId] = _complianceVerified[tokenId];
        _ipRightsVerified[newTokenId] = _ipRightsVerified[tokenId];
        _categoryVerified[newTokenId] = _categoryVerified[tokenId];
        
        emit EditionMinted(tokenId, editionNumber, _totalEditions[tokenId]);
        emit CategorySet(newTokenId, _categories[newTokenId]);
        
        return editionNumber;
    }
    
    /**
     * @dev Returns the creator of a specific token
     * @param tokenId The ID of the token
     * @return The address of the creator
     */
    function getCreator(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return _creators[tokenId];
    }
    
    /**
     * @dev Returns the creator name of a specific token
     * @param tokenId The ID of the token
     * @return The name of the creator
     */
    function getCreatorName(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _creatorNames[tokenId];
    }
    
    /**
     * @dev Returns the royalty percentage for a specific token
     * @param tokenId The ID of the token
     * @return The royalty percentage in basis points
     */
    function getRoyalty(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _royalties[tokenId];
    }
    
    /**
     * @dev Returns the edition information for a specific token
     * @param tokenId The ID of the token
     * @return editionNumber The edition number of the token
     * @return totalEditions The total number of editions
     */
    function getEditionInfo(uint256 tokenId) public view returns (uint256 editionNumber, uint256 totalEditions) {
        require(_exists(tokenId), "Token does not exist");
        return (_mintedEditions[tokenId], _totalEditions[tokenId]);
    }
    
    /**
     * @dev Checks if a token exists
     * @param tokenId The ID of the token
     * @return Whether the token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
} 