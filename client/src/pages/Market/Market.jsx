import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

function Market() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <Title>NFT Market Page</Title>
    </Row>
  );
}

const Title = styled.span`
  font-size: ${theme.fs_11};
  font-weight: ${theme.fw_700};
  color: ${theme.very_dark_blue_line};
`;

export default Market;