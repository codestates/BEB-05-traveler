import { Layout, Row, Col, Button, Drawer, Modal, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {
  MenuOutlined,
  MoreOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import Register from '../../pages/home/Register';

const { Title } = Typography;
const { Header: _Header } = Layout;
function HeaderComponent() {
  const [visible, setVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isJoinVisible, setIsJoinVisible] = useState(false);

  const placement = 'left';

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showLoginModal = () => {
    setIsLoginVisible(true);
  };

  const handleLoginOk = () => {
    setIsLoginVisible(false);
  };

  const handleLoginCancel = () => {
    setIsLoginVisible(false);
  };

  const showJoinModal = () => {
    setIsJoinVisible(true);
  };

  const handleJoinOk = () => {
    setIsJoinVisible(false);
  };

  const handleJoinCancel = () => {
    setIsJoinVisible(false);
  };

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Header>
          <LogoWrapper>
            <Side>
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
                    <Title>Home</Title>
                  </Link>
                  <Link to="/posts">
                    <Title>Posts</Title>
                  </Link>
                  <Link to="/mypage">
                    <Title>My Page</Title>
                  </Link>
                  <Link to="/create">
                    <Title>Create your NFT</Title>
                  </Link>
                  <Link to="/market">
                    <Title>NFT Market</Title>
                  </Link>
                </Drawer>
              </>
            </Side>
            <SideBar>
              <MenuOutlined style={{ fontSize: '120%' }} onClick={showDrawer}></MenuOutlined>
            </SideBar>
            <MoreOutlined style={{ fontSize: '200%' }} />

            <LogoTitle>
              <a href="http://localhost:3000/">T r a v e l e r</a>
            </LogoTitle>

            <Button
              shape="round"
              onClick={showLoginModal}
              style={{ color: `${theme.very_dark_blue_line}`, fontWeight: 'bold' }}
            >
              Login
            </Button>
            <Modal
              visible={isLoginVisible}
              title="ID 로그인"
              onOk={handleLoginOk}
              onCancel={handleLoginCancel}
              width={300}
              footer={[
                <Button key="submit" shape="round" onClick={showJoinModal}>
                  회원가입
                </Button>,
                <Button key="submit" shape="round" onClick={handleLoginOk}>
                  로그인
                </Button>,
              ]}
            >
              <Space direction="vertical">
                <Input placeholder="아이디" type="text" prefix={<UserOutlined />} />
                <Input.Password
                  placeholder="비밀번호"
                  type="password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Space>
            </Modal>
            <Modal
              visible={isJoinVisible}
              onOk={handleJoinOk}
              onCancel={handleJoinCancel}
              footer={[]}
            >
              <Register handleJoinOk={handleJoinOk} />
            </Modal>
          </LogoWrapper>
        </Header>
      </Col>
    </Row>
  );
}

const Header = styled(_Header)`
  background-color: ${theme.beige};
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
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${theme.fs_11};
  font-weight: ${theme.fw_700};
  color: ${theme.black};
  letter-spacing: -1px;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
`;

const Side = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');

  font-family: 'Aboreto', cursive;
`;

const SideBar = styled.span`
  margin-right: 15px;
`;

export default HeaderComponent;
