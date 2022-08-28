import { Result, Image, Row, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import NFTList from '../home/NFTList';
import collectionData from '../../asset/dummy/fakeNFT';
import { theme } from '../../style/theme';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { Title } = Typography;

function MP_sec3({ state }) {
  const location = useLocation();
  const user = location;
  const [collectionData1, setCollectionData1] = useState([]);
  const [collectionData2, setCollectionData2] = useState([]);

  const getNFTs = async () => {
    axios
      .get('http://localhost:4000/user/info', {
        headers: { authorization: user.state.token },
      })
      .then((res) => {
        setCollectionData1(res.data.user_nftInfo_sell);
        setCollectionData2(res.data.user_nftInfo_notsell);
      });
  };

  useEffect(() => {
    getNFTs();
  }, [state]);
  // console.log(collectionData1);

  return (
    <Row justify="center" align="middle" wrap={true}>
      <TitleFont>
        <Title
          style={{
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.brown}`,
          }}
        >
          My NFT for sale
        </Title>
      </TitleFont>

      <List>
        <NFTList collectionData={collectionData1} />
      </List>
      <TitleFont>
        <Title
          style={{
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.brown}`,
          }}
        >
          My NFT NOT for sale
        </Title>
      </TitleFont>
      <List>
        <NFTList collectionData={collectionData2} />
      </List>
    </Row>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  border-top: 0.1rem dotted black;
  padding-top: 40px;
  text-decoration: underline overline #decfac;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin
`;

export default MP_sec3;
