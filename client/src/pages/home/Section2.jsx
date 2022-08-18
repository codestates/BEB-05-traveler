import { Result, Row, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import React from 'react';
import collectionData from '../../asset/dummy/fakeposts';
import PostsList from './PostsList';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const { Title } = Typography;
function Section2() {
  return (
    <Row justify="center" align="middle" wrap={true}>
      <Title
        style={{
          marginBottom: `${theme.space_7}`,
          fontSize: `${theme.fs_14}`,
          fontWeight: `${theme.fw_700}`,
          color: `${theme.very_dark_blue_line}`,
        }}
      >
        ---- Recent Posts ----
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

export default Section2;
