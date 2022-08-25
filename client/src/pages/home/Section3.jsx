import { Result, Image, Row, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import NFTList from './NFTList';
import collectionData from '../../asset/dummy/fakeNFT';
import { theme } from '../../style/theme';
import axios from 'axios';
import { useEffect } from 'react';

const { Title } = Typography;

function Section3({ state }) {
  const [collectionData, setCollectionData] = useState([]);
  const getNFTs = async () => {
    axios.get('http://localhost:4000/').then((res) => {
      console.log(res.data.data.nftInfo);
      setCollectionData(res.data.data.nftInfo);
    });
  };

  useEffect(() => {
    getNFTs();
    console.log(collectionData);
  }, [state]);

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
          Recent NFT
        </Title>
      </TitleFont>

      <List>
        <NFTList collectionData={collectionData} />
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

export default Section3;
