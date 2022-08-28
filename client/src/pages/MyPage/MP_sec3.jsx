import { Input, Row, Col, Card, Image, Button, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as MyPage from '../../components/MyPage';

const { Title, Text } = Typography;

function MP_sec3({ state }) {
  const [collectionData1, setCollectionData1] = useState([]);
  const [collectionData2, setCollectionData2] = useState([]);

  const getNFTs = async () => {
    axios
      .get('http://localhost:4000/user/info', {
        headers: { authorization: state.token },
      })
      .then((res) => {
        console.log(res.data);
        setCollectionData1(res.data.user_nftInfo_sell);
        setCollectionData2(res.data.user_nftInfo_notsell);
      });
  };

  // const getNFTInfo = async (collectionData, func) => {
  //   console.log('NFT 정보 찾기');
  //   const infoList = [];
  //   for (let i = 0; i < collectionData.length; i++) {
  //     axios.get(collectionData[i].link).then((res) => {
  //       console.log(res.data);
  //       setNftInfo1({
  //         img: `https://ipfs.io/ipfs/${res.data.image.split('//')[1]}`,
  //         name: res.data.name,
  //         desc: res.data.description,
  //         price: collectionData[i].price,
  //         content_id: collectionData[i].token_id,
  //       });
  //       // infoList.push(info);
  //       // func(infoList);
  //     });
  //   }
  // };

  useEffect(() => {
    getNFTs();
  }, [state]);

  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <MyPage.MyNFTTitle />
      <MyPage.MyNFTsubtitle title={'NFT for sale'} />
      <MyPage.MyNFTList collectionData={collectionData1} sellBool={true} />
      <MyPage.MyNFTsubtitle title={'NFT not for sale'} />
      <MyPage.MyNFTList collectionData={collectionData2} sellBool={false} />
    </Row>
  );
}

export default MP_sec3;
