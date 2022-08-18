import { Layout, Row, Col, Button, Drawer, Modal, Input, Space} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { MenuOutlined, MoreOutlined, EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined} from '@ant-design/icons';
import Register from '../../pages/home/Register';

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
          <Link to="/">
            <LogoWrapper>
              <>
                <Drawer
                  title="Traveler"
                  placement="left"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                  key={placement}
                >
                  <p>Home</p>
                  <p>게시글 페이지</p>
                  <p>My Page</p>
                  <p>게시글 작성</p>
                  <p>Create Your NFT</p>
                  <p>...</p>
                  <p>...</p>
                  <p>...</p>
                </Drawer>
              </>
              <SideBar>
                <MenuOutlined style={{ fontSize: '120%' }} onClick={showDrawer}></MenuOutlined>
              </SideBar>
              <MoreOutlined style={{ fontSize: '200%' }} />
              <LogoTitle> T r a v e l e r</LogoTitle>
              <Button shape="round" onClick={showLoginModal}>
                Login
              </Button>
              <Modal
                visible={isLoginVisible}
                title="ID 로그인"
                onOk={handleLoginOk}
                onCancel={handleLoginCancel}
                width={300}
                footer={[
                  <Button key="submit" shape="round" onClick={showJoinModal}>회원가입</Button>,
                  <Button key="submit" shape="round" onClick={handleLoginOk}>로그인</Button>
                ]}>
                <Space direction="vertical">
                  <Input 
                    placeholder="아이디" 
                    type="text"
                    prefix={<UserOutlined />}/>
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
          </Link>
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

const LogoTitle = styled.span`
  font-size: ${theme.fs_11};
  font-weight: ${theme.fw_700};
  letter-spacing: -1px;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

const SideBar = styled.span`
  margin-right: 15px;
`;

export default HeaderComponent;
