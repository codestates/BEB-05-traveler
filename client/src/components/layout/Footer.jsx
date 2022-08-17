import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const { Footer: _Footer } = Layout;

function FooterComponent() {
  return <Footer>Footer - Created by Lucky 7</Footer>;
}

const Footer = styled(_Footer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${theme.fs_12};

  background-color: ${theme.very_dark_blue_main} !important;
  color: ${theme.white} !important;
`;

export default FooterComponent;
