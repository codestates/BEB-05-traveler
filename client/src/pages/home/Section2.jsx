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
            color: `${theme.brown}`,
          }}
        >
          Recent Posts
        </Title>
      </TitleFont>
      <List>
        <PostsList collectionData={collectionData.slice(0,4)} />
      </List>
    </Row>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Do+Hyeon&family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Do Hyeon', sans-serif;
  font-family: 'Nanum Pen Script', cursive;
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
`;

export default Section2;
