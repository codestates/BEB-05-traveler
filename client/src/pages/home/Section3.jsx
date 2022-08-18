import { Result, Image, Row, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import PostsList from './PostsList';
import collectionData from '../../asset/dummy/fakeposts';
import { theme } from '../../style/theme';

const { Title } = Typography;

function Section3() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      {/* <Result icon={<WalletOutlined />} title="========== Recent NFTs ==========" /> */}
      <Title
        style={{
          marginBottom: `${theme.space_7}`,
          fontSize: `${theme.fs_14}`,
          fontWeight: `${theme.fw_700}`,
          color: `${theme.very_dark_blue_line}`,
        }}
      >
        ---- MY NFT List ----
      </Title>
      <List>
        <PostsList collectionData={collectionData} />
      </List>
    </Row>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin
`;

export default Section3;
