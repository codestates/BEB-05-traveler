// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TravelNFT is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 token;
    uint256 mintingPrice;

    constructor() ERC721("Traveler", "TRA") {
        // 민팅 가격.
        mintingPrice = 100e18;
    }

    function mintNFT(address _recipient, string memory _tokenURI) public onlyOwner returns (uint256) {
        require(token.balanceOf(_recipient) > mintingPrice);

        token.transferFrom(_recipient, msg.sender, mintingPrice);
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    // NFT 를 민팅할 때 지불할 ERC20 토큰의 주소를 등록
    function setToken (address _tokenAddress) public onlyOwner returns (bool) {
        require(_tokenAddress != address(0x0));
        token = IERC20(_tokenAddress);
        return true;
    }

    // 현재 민팅 가격 조회
    function getMintingPrice () public view returns (uint) {
        return mintingPrice;
    }

    // NFT 구매 함수
    function buyNFT (address _sender, address _recipient, uint _tokenId, uint _price) public onlyOwner returns (bool) {
        require( token.balanceOf(_recipient) >= _price );
        require( ownerOf(_tokenId) == _sender );
        token.transferFrom(_recipient, _sender, _price);
        safeTransferFrom(_sender, _recipient, _tokenId);
        return true;
    }

    // NFT minting price 변경 함수
    function setMintingPrice (uint _price) public onlyOwner returns (bool) {
        mintingPrice = _price;
        return true;
    }

    /* 다중상속 받는 함수들 재정의
     *
    */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override onlyOwner {
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyOwner {
        safeTransferFrom(from, to, tokenId, "");
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}