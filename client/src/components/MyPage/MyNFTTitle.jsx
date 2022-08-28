import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { Typography } from 'antd';

const { Title } = Typography;

function MyPageTitle() {
  return (
    <TitleFont>
      <Title
        style={{
          marginBottom: `${theme.space_2}`,
          fontSize: `${theme.fs_14}`,
          fontWeight: `${theme.fw_700}`,
          color: `${theme.very_dark_blue_line}`,
        }}
      >
        {'My NFT 🌄'}
      </Title>
    </TitleFont>
  );
}

export default MyPageTitle;

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
  marginBottom: ${theme.space_7}
  fontSize:${theme.fs_14}
  fontWeight: ${theme.fw_700}
  color: ${theme.brown}
`;
