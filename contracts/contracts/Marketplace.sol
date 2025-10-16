// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function getApproved(uint256 tokenId) external view returns (address);
}

interface IDecentraArtisanNFT is IERC721 {
    function getCreator(uint256 tokenId) external view returns (address);
    function getRoyalty(uint256 tokenId) external view returns (uint256); // returns basis points (e.g., 250 = 2.5%)
}

contract Marketplace {
    struct Listing {
        address nft;
        uint256 tokenId;
        address seller;
        uint256 price; // in wei
        address creator;
        uint96 royaltyBps; // basis points
        bool active;
    }

    // nft => tokenId => listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, uint256 price, address creator, uint96 royaltyBps);
    event Cancelled(address indexed nft, uint256 indexed tokenId, address indexed seller);
    event Bought(address indexed nft, uint256 indexed tokenId, address indexed buyer, uint256 price, uint256 royaltyPaid, uint256 sellerProceeds);

    function listItem(address nft, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be > 0");
        IERC721 erc721 = IERC721(nft);
        require(erc721.ownerOf(tokenId) == msg.sender, "Not token owner");

        // Check approval
        require(
            erc721.getApproved(tokenId) == address(this) || erc721.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );

        IDecentraArtisanNFT dna = IDecentraArtisanNFT(nft);
        address creator = address(0);
        uint256 royalty = 0;
        // Try/catch in case NFT doesn't implement methods exactly
        try dna.getCreator(tokenId) returns (address c) { creator = c; } catch {}
        try dna.getRoyalty(tokenId) returns (uint256 r) { royalty = r; } catch {}

        listings[nft][tokenId] = Listing({
            nft: nft,
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            creator: creator,
            royaltyBps: uint96(royalty),
            active: true
        });

        emit Listed(nft, tokenId, msg.sender, price, creator, uint96(royalty));
    }

    function cancelListing(address nft, uint256 tokenId) external {
        Listing storage l = listings[nft][tokenId];
        require(l.active, "Not listed");
        require(l.seller == msg.sender, "Not seller");
        l.active = false;
        emit Cancelled(nft, tokenId, msg.sender);
    }

    function buyItem(address nft, uint256 tokenId) external payable {
        Listing storage l = listings[nft][tokenId];
        require(l.active, "Not listed");
        require(msg.value == l.price, "Incorrect price");

        // compute royalty
        uint256 royaltyAmount = 0;
        if (l.creator != address(0) && l.royaltyBps > 0) {
            royaltyAmount = (msg.value * l.royaltyBps) / 10000;
        }
        uint256 sellerProceeds = msg.value - royaltyAmount;

        // effects
        l.active = false;

        // interactions
        if (royaltyAmount > 0) {
            (bool ok1, ) = payable(l.creator).call{value: royaltyAmount}("");
            require(ok1, "Royalty transfer failed");
        }
        (bool ok2, ) = payable(l.seller).call{value: sellerProceeds}("");
        require(ok2, "Seller transfer failed");

        IERC721(l.nft).safeTransferFrom(l.seller, msg.sender, l.tokenId);

        emit Bought(nft, tokenId, msg.sender, msg.value, royaltyAmount, sellerProceeds);
    }

    function getListing(address nft, uint256 tokenId) external view returns (Listing memory) {
        return listings[nft][tokenId];
    }
}
