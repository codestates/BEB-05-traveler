import { Result, Image, Row, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import NFTList from './NFTList';
import collectionData from '../../asset/dummy/fakeNFT';
import { theme } from '../../style/theme';
import axios from 'axios';
import { useState } from 'react';

const { Title } = Typography;

const item_list = (list) => {
  let array = [];

  for (let i = 0; i < list.length; i++) {
    let el = list[i];
    const enc = new TextDecoder('utf-8');
    let arr;
    if (el.image) {
      arr = new Uint8Array(el.image.data.data);
    }
    let obj = {
      idx: el.post_id,
      title: el.title,
      image: arr ? enc.decode(arr) : process.env.PUBLIC_URL + '/noImage.png',
      place_name: el.place_name,
      place_address: el.place_address,
      created_at: el.created_at,
      content: el.content,
    };
    array.push(obj);
  }
  return array;
};

function Section3() {
  const recentData = collectionData.filter((e) => e.content_id <= 4);

  const [nftList, setNftList] = useState([]);
  const getNFTs = async () => {
    axios.get('http://localhost:4000/').then((res) => {
      setNftList(res.data.data.postInfo);
    });
  };

  useEffect(() => {
    getNFTs();
  }, []);

  const data = item_list(nftList);

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
        <NFTList collectionData={data} />
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
