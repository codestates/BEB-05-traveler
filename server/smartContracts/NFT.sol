// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLootBox is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 mintingPrice;

    constructor() ERC721("Traveler", "TRA") {
        // 민팅 가격.
        mintingPrice = 100e18;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) > mintingPrice);

        token.transferFrom(recipient, msg.sender, mintingPrice);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // NFT 를 민팅할 때 지불할 ERC20 토큰의 주소를 등록
    function setToken (address _tokenAddress) public onlyOwner returns (bool) {
        require(_tokenAddress != address(0x0));
        token = IERC20(_tokenAddress);
        return true;
    }

    // NFT 구매 함수
    function buyNFT (address _sender, address _recipient, uint _tokenId, uint _price) public onlyOwner returns (bool) {
        require( token.balanceOf(_recipient) >= _price );
        safeTransferFrom(_sender, _recipient, _tokenId);
        token.transferFrom(_recipient, _sender, _price);
        return true;
    }

    // NFT minting price 변경 함수
    function setMintingPrice (uint _price) public onlyOwner returns (bool) {
        mintingPrice = _price;
        return true;
    }
}