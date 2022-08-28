import { Row, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as MyPage from '../../components/MyPage';

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

  useEffect(() => {
    getNFTs();
  }, [state]);

  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <MyPage.MyNFTTitle />
      <MyPage.MyNFTsubtitle title={'NFT for sale'} />
      <MyPage.MyNFTList collectionData={collectionData1} sellBool={true} token={state.token} />
      <MyPage.MyNFTsubtitle title={'NFT not for sale'} />
      <MyPage.MyNFTList collectionData={collectionData2} sellBool={false} token={state.token} />
    </Row>
  );
}

export default MP_sec3;
