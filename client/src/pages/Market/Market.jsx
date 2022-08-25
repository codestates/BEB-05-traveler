import { Row, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import collectionData from '../../asset/dummy/fakeNFT';
import MarketNFTList from './MarketNFTList';

const { Title } = Typography;

function Market() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <TitleFont>
        <Title
          style={{
            marginTop: `${theme.space_7}`,
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.black}`,
          }}
        >
          NFT Market
        </Title>
      </TitleFont>
      <List>
        <MarketNFTList collectionData={collectionData} />
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
export default Market;
