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
  * IPFS (nft.storage)<img width="391" alt="스크린샷 2022-08-29 오후 3 04 12" src="https://user-images.githubusercontent.com/104472372/187133470-92b309f5-a7e9-411f-9a6b-3748f45a0d76.png">

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
### [Front-end]
<img width="1144" alt="Flow chart" src="https://user-images.githubusercontent.com/104472372/187106157-00a12df4-30e1-43b5-8ecb-7c27bd4e9039.png">

### [Back-end]
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
### Main page
Recent posts and recent NFTs are posted on the main page, and you can navigate to the desired page by selecting the sidebar on the left side of the top header.  

<img width="391" alt="스크린샷 2022-08-29 오후 3 02 13" src="https://user-images.githubusercontent.com/104472372/187133229-0d4309e8-7de9-4a45-b0b0-e0314fa3abdb.png">

You can log in by clicking the login button on the top right.  
If you are not member of the community, you can sign up quickly by entering only the password, ID, and nickname.  

<img width="391" alt="스크린샷 2022-08-29 오후 3 04 12" src="https://user-images.githubusercontent.com/104472372/187133500-13e9b31f-95d3-4730-aa06-14b21c8c494c.png">

### Board page
You can see all posts on the board page. Click on the picture above to go to the post page. Click on a post to go to the post detail page.  

<img width="389" alt="스크린샷 2022-08-29 오후 3 20 09" src="https://user-images.githubusercontent.com/104472372/187135656-c025b37c-ed84-4e20-a341-c631196d33fd.png">

### Post detail page
You can see detailed information of the post on this page. If you are the author of the post, you will see edit and delete buttons at the bottom.  

<img width="392" alt="스크린샷 2022-08-29 오후 3 23 12" src="https://user-images.githubusercontent.com/104472372/187136102-78606b8e-9033-4f95-a638-27972011219f.png">

### Post writing page & edit page
Select a photo at the top, fill in the information according to the form, and click the Complete button at the bottom to post a new post and receive token rewards.

<img width="390" alt="스크린샷 2022-08-29 오후 3 32 47" src="https://user-images.githubusercontent.com/104472372/187137692-dbe3121c-b08d-44b0-a7b5-c042af89f8d1.png">

In the same way, you can change the photo and content on the edit page.  

<img width="390" alt="스크린샷 2022-08-29 오후 3 32 54" src="https://user-images.githubusercontent.com/104472372/187137894-c4b607c8-c17c-4fa5-84a7-2a42ad7f5ae0.png">

### Mypage
Only logged in members can access this page. On this page, you can check user information like id, nickname, wallet address and token balance and transfer token to other user. You can also see the posts you wrote and the NFTs you own.

<img width="390" alt="스크린샷 2022-08-29 오후 3 39 43" src="https://user-images.githubusercontent.com/104472372/187139296-dcc893ee-5d83-4138-b398-68f7a1ea26d4.png">

You can transfer your tokens or NFTs to other users by clicking the Send Tokens or Send NFT button. You can select ID, nickname and wallet address through the select bar and send it in any way you want.

<img width="394" alt="스크린샷 2022-08-29 오후 4 09 30" src="https://user-images.githubusercontent.com/104472372/187144021-918fd987-c518-4f5f-b9bf-d3416f4e02e8.png">

If you click the edit button of My post, you will be taken to the edit page. If you click the delete button, a confirmation window will pop up. If you press the OK button there, the post will be deleted and the token that was paid as a reward was returned.

<img width="391" alt="스크린샷 2022-08-29 오후 4 09 36" src="https://user-images.githubusercontent.com/104472372/187144088-64c7b8f0-598b-4a68-b493-7acfa67dfd86.png">

NFTs that are on sale in My NFT list can cancel their sales status by clicking the “Cancel Registration” button.  
For NFTs that are not on sale, click the "Register for Sale" button, enter the price you want to sell, and press the "Register" button to switch to Sale status.

<img width="770" alt="스크린샷 2022-08-29 오후 3 57 32" src="https://user-images.githubusercontent.com/104472372/187141743-af564507-7d7e-4aeb-830e-12cf1c3775ab.png">

### NFT create page
You can mint the NFT on the create page by selecting a photo and entering additional information such as name, description.

![create](https://user-images.githubusercontent.com/104472372/187134054-d5ca17bc-f33b-4ac4-8317-e0c1ec4bf46a.gif)

### NFT Marcket page
On the market page, you can see the NFTs currently on sale. Click on one NFT to go to the detail page.  

<img width="391" alt="스크린샷 2022-08-29 오후 3 52 21" src="https://user-images.githubusercontent.com/104472372/187140813-5432b9ec-4405-499f-9589-d3a0647e858e.png">

### NFT detail page
You can check information such as price on the NFT detail page, and purchase the NFT by clicking the buy button.

<img width="393" alt="스크린샷 2022-08-29 오후 4 00 21" src="https://user-images.githubusercontent.com/104472372/187142304-3698b952-a292-4583-b2c1-30542146b718.png">

# Authors
 Hayoung Oh (오하영, dalja6309@gmail.com, South Korea)  
 Eunjae Yoon (윤은재, yoonej111@gmail.com, South Korea)  
 Yoongeom Kim (김윤겸, kyum0401@gmail.com, South Korea)  
 Justin Inkyun Parker (박인균, sefthia@gmail.com, South Korea)

Contact us!
Enthusiastic and sincere novice developers are waiting for contact from blockchain companies.
