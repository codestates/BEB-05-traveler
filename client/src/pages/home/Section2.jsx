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
      <TitleFont>
        <Title
          style={{
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.very_dark_blue_line}`,
          }}
        >
          Recent Posts 🗂
        </Title>
      </TitleFont>
      <List>
        <PostsList collectionData={collectionData} />
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
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin
`;

export default Section2;
