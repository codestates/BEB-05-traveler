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
import axios from 'axios';

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
    // setIsLoginVisible(false);
    // axios.post('http://localhost:4000/user/login').then((res) => {
    //   // console.log(res.data.message);
    //   console.log(res.data);
    // });
    axios
      .post('http://localhost:4000/user/login', {
        user_id: 'test',
        password: 'test1234',
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleLoginCancel = () => {
    setIsLoginVisible(false);
  };

  const showJoinModal = () => {
    setIsJoinVisible(true);
  };

  const handleJoinOk = () => {
    // setIsJoinVisible(false);
    // axios.get('http://localhost:4000/token/findallnft').then((res) => {
    //   // console.log(res.data.message);
    //   console.log(res.data);
    // });
  };

  const handleJoinCancel = () => {
    setIsJoinVisible(false);
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: 20, marginBottom: 2 }}>
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
                    <Title style={{ fontSize: 30 }}>Home</Title>
                  </Link>
                  <Link to="/posts">
                    <Title style={{ fontSize: 30 }}>Posts</Title>
                  </Link>
                  <Link to="/mypage">
                    <Title style={{ fontSize: 30 }}>My Page</Title>
                  </Link>
                  <Link to="/create">
                    <Title style={{ fontSize: 30 }}>Create your NFT</Title>
                  </Link>
                  <Link to="/market">
                    <Title style={{ fontSize: 30 }}>NFT Market</Title>
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
              size="large"
              onClick={showLoginModal}
              style={{ color: `${theme.brown}`, fontWeight: 'bold' }}
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
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&display=swap');
  font-family: 'Aboreto', cursive;
  background-color: ${theme.beige};
  color: ${theme.black};
  z-index: 1000;
  a:link,
  a:visited,
  a:active,
  a:hover {
    text-decoration: #decfac wavy underline;
    color: ${theme.brown};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  border: 5px solid transparent;
`;

const LogoTitle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${theme.fs_15};
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
