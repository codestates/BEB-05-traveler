const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

// models 작업과 app.js 충돌이 예상되어
// npm 모듈 설치 없이 코드만 우선 작성함.
// node-cron / web3 / 

const cron = require("node-cron");
const model = require("../models");
const Web3 = require("web3");

// env 환경변수에 RPCURL 설정해야함
const web3 = new Web3(env.process.RPCURL);
// 스마트컨트랙트 객체 생성. ERC20 / ERC721.
const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

// 수도코드
// 전체 nft 긁어오기 : 모델에서 nft.id 기준으로 블록체인의 nft 정보를 가져온다
// nft id의 마지막 번호 (0번 인덱스) 를 확인한다. 이것을 i라고 한다.
// totalSupply() 함수는 최신 nft의 마지막 id
// for문을 i+1 부터 totalSupply() 까지 돌리면 최근 업데이트된 nft 정보만 가져오는 것이다
// // contract.methods.tokenURI(i).call() 을 통해 각각의 tokenURI와 소유자 주소 가져옴
// // 몽고DB에 token의 소유자주소와 일치하는 user를 찾아 nft 정보에 스키마형식에 맞춰서 적재