This is ReadME for Traveler project. you can find more detail info about the project our [Wiki page](https://github.com/codestates/BEB-05-traveler/wiki).

## Index
  - [Intro](#intro) 
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Token Economy Design](#token-economy-design)
  - [Files](#files)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authors](#authors)
  
## Intro
This project is to develop a community site equipped with a blockchain incentive-based nft trading system on web2. The *Traveler* community is for people who want to share their travel information. Users of this community are given a new wallet address upon signing up and are rewarded with ERC20 tokens every time they write a post. They can send it to other community users or use it to buy minted NFTs from our community.

## Tech Stack
### [Front-end]
  * React
  * React-Router-Dom
  * React-Hooks
  * Axios
  * modern css
### [Back-end]
  * Node.js(web3, express, mongoose, multer, jsonwebtoken, node-cron, bcrypt)
  * MongoDB
  * IPFS (nft.storage)
  * Solidity (ERC20/ERC721 standard)
### [Common]
  * MVC Architecture
  * RESTful API
  * HTTP connecting support
  * Dotenv
### [API & Library]
  * Infura Ropsten Network provider
  * NFT.Strorage IPFS File API
  * MONGO Compass
  * Openzeppelin contracts standard
  * Ant-Design Library

## Architecture
  * Using MVC architecture & RESTful API

### [client]
<img width="1144" alt="Flow chart" src="https://user-images.githubusercontent.com/104472372/187106157-00a12df4-30e1-43b5-8ecb-7c27bd4e9039.png">

### [server]
![traveler_server_flowchart](https://user-images.githubusercontent.com/104472372/187106263-776f61a9-7ced-4ec4-8fd8-86a6ae422073.png)

# Token Economy Design
## Rule
- All rules within the community (token rewards, consumption, etc.) are not controlled by the community operator, but only by the code.

## Token Reward
- Creation of community-related content such as posts  
- Users vote to determine if the content of the post is community-related content (*not implemented*)  
- Selling NFTs minted by the user in the community to other user  

## Token consumption
- Transfer tokens, NFTs to other users
- Buying NFTs issued by other users
- Swap with another ERC 20 token or Ether (*not implemented*)
- Linked to purchase community-related real assets like reservation of hotel, flight ticket and restaurant voucher  (*not implemented*)

## Community extension (*not implemented*)
- Gain loyalty by adding stronger content production and voting rights based on the contribution of users who participated in building the blockchain ecosystem, such as creating posts, publishing NFTs, and supplying real assets
- Implement Ether Swap to enhance exchangeability with real currency.
- Design to allow the total amount of circulation of token to change fluidly in proportion to the overall community activity by certain rules.

# Files
```bash
├── README.md
├── client
│   ... 
│   ├── package.json
│   ├── public
│   └── src├── ├── App.jsx
│              ├── asset # includes dummy data used for fron development
│              ├── authToken.jsx
│              ├── components # components for mypage, minting, header and footer
│              ├── index.css
│              ├── index.jsx
│              ├── pages
│              │   ├── Create # build mint page
│              │   ├── Market # build NFT marcket page
│              │   ├── MyPage # build my page
│              │   ├── NotAuthorized.jsx
│              │   ├── Posts  # build board page
│              │   └── home  # build main page
│              ├──router
│              └──style
└── server
    ├── App.js
    ├── abi20.js
    ├── abi721.js
    ├── address20.js
    ├── address721.js
    ├── controllers # Each controller accesses the DB according to the client request,
    │   │           # Run daemon to periodically access blockchain networks to read the latest information and update DB
    │   ├── board.controller.js # Process requests for post
    │   ├── contract.controller.js # Access the blockchain and update the information on the new NFT to the DB
    │   ├── main.controller.js # Process requests for main page
    │   ├── token.controller.js # Process requests for NFT and ERC20 tokens
    │   └── user.controller.js # Process requests for user info
    ├── models # includes methods for reading and update DB
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── routes # Leverage the RESTful API to properly branch client requests across endpoints.
    ├── smartContracts # Customize ERC20, ERC721 token standards to allow server accounts to control user accounts
    └── uploads
```
# Installation

To run the program, use the npm install command to automatically install the packages required for the operation. Information about packages can be found in package.json file. 

Write access keys for server deployment along the *.env.example* file and save it as *.env*

```bash
cd server
npm install  # install packages for server
vi .env      # follow the form of .env.example
npm run start   # start server operation
```
If the server is operating normally, you can see  the message that the server are connected to MongoDB in the terminal window.
```bash
cd client  
npm install    # install packages for client
npm run start  # start client operation
```
If the community side is operating normally, you can see the main page of Traveler on the browser [http://localhost:3000](http://localhost:3000)

# Usage

# Authors
  * Hayoung Oh (오하영, dalja6309@gmail.com, South Korea)
  *  Eunjae Yoon (윤은재, yoonej111@gmail.com, South Korea)
  * Yoongeom Kim (김윤겸, kyum0401@gmail.com, South Korea)
  * Justin Inkyun Parker (박인균, sefthia@gmail.com, South Korea)

Contact us!
Enthusiastic and sincere novice developers are waiting for contact from blockchain companies.
