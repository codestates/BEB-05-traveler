import { Result, Image, Row, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import NFTList from './NFTList';
import collectionData from '../../asset/dummy/fakeNFT';
import { theme } from '../../style/theme';

const { Title } = Typography;

function Section3() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      {/* <Result icon={<WalletOutlined />} title="========== Recent NFTs ==========" /> */}
      <TitleFont>
        <Title
          style={{
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.very_dark_blue_line}`,
          }}
        >
          MY NFT List 🖍
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
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin
`;

export default Section3;
