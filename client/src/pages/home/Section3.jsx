import { Result, Image, Row } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import PostsList from './PostsList';
import collectionData from '../../asset/dummy/fakeposts';

function Section3() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <Result icon={<WalletOutlined />} title="========== Recent NFTs ==========" />
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
