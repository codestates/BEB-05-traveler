import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { GithubOutlined } from '@ant-design/icons';

const { Footer: _Footer } = Layout;

function FooterComponent() {
  return (
    <Footer>
      <div>
        <p>
          Ⓒ 2022 Team{' '}
          <a href="https://github.com/orgs/codestates/teams/lucky7">
            <span style={{ fontWeight: 'bold', color: '#1E3269' }}>Lucky 7</span>
          </a>
          <br></br>
          Visit our&nbsp;
          <a href="https://github.com/codestates/BEB-05-traveler">
            <span style={{ fontWeight: 'bold', color: '#1E3269' }}>
              GitHub <GithubOutlined />
            </span>
          </a>
        </p>
      </div>
    </Footer>
  );
}

const Footer = styled(_Footer)`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Alumni+Sans+Pinstripe&family=Open+Sans:ital,wght@1,300&display=swap');
  text-align: center;
  & p {
    font-family: 'Alumni Sans Pinstripe', sans-serif;
  }
  font-size: ${theme.fs_6};

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 100px;

  border-top: 1px solid;
  border-bottom: 1px solid;
  background-color: ${theme.beige};
  color: ${theme.very_dark_blue_line};
`;

export default FooterComponent;
