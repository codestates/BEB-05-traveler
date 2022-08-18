import { Layout, Row, Col, Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';

const { Header: _Header } = Layout;
function HeaderComponent() {
  const [visible, setVisible] = useState(false);
  const placement = 'left';

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showLogin = (e) => {
    alert('로그인 모달이 들어갈 예정!');
  };

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Header>
          <LogoWrapper>
            <>
              <Drawer
                title="Traveler"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
                key={placement}
                style={{ fontSize: '150%' }}
              >
                <Link to="/">
                  <p>Home</p>
                </Link>
                <Link to="/posts">
                  <p>Posts</p>
                </Link>
                <Link to="/mypage">
                  <p>My Page</p>
                </Link>
                <Link to="/create">
                  <p>Create your NFT</p>
                </Link>
                <Link to="/market">
                  <p>NFT Market</p>
                </Link>
              </Drawer>
            </>
            <SideBar>
              <MenuOutlined style={{ fontSize: '120%' }} onClick={showDrawer}></MenuOutlined>
            </SideBar>
            <MoreOutlined style={{ fontSize: '200%' }} />
            <Link to="/">
              <LogoTitle> T r a v e l e r</LogoTitle>
            </Link>

            <Button shape="round" onClick={showLogin}>
              Login
            </Button>
          </LogoWrapper>
        </Header>
      </Col>
    </Row>
  );
}

const Header = styled(_Header)`
  background-color: ${theme.very_light_blue_main};
  color: ${theme.very_dark_blue_line};
  z-index: 1000;
  a:link,
  a:visited,
  a:active,
  a:hover {
    text-decoration: none;
    color: ${theme.very_dark_blue_line};
  }
  border-bottom: 1px solid;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

const LogoTitle = styled.div`
  font-size: ${theme.fs_11};
  font-weight: ${theme.fw_700};
  letter-spacing: -1px;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 1000px;
  margin-right: 1000px;
`;

const SideBar = styled.span`
  margin-right: 15px;
`;

export default HeaderComponent;
