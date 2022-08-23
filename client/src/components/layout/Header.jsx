import { Layout, Row, Col, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import Register from '../../pages/home/Register';
import axios from 'axios';
import * as HeaderComp from '../headerComp';

const { Header: _Header } = Layout;
function HeaderComponent({ userInfo, setUserInfo, token, setToken }) {
  const [visible, setVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isJoinVisible, setIsJoinVisible] = useState(false);
  const [joinID, setJoinID] = useState('');
  const [joinName, setJoinName] = useState('');
  const [joinPW, setJoinPW] = useState('');

  useEffect(() => {
    console.log(token, '저장후');
  }, [token]);

  const showLoginModal = () => {
    setIsLoginVisible(true);
  };

  const handleLoginCancel = () => {
    setIsLoginVisible(false);
  };

  const showJoinModal = () => {
    setIsJoinVisible(true);
  };

  const handleJoinOk = () => {
    axios
      .post('http://localhost:4000/user/join', {
        user_id: joinID,
        nickname: joinName,
        password: joinPW,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          // setIsLogin(true);
          setIsJoinVisible(false);
        }
      });
  };

  const handleJoinCancel = () => {
    setIsJoinVisible(false);
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: 20, marginBottom: 2 }}>
      <Col span={24}>
        <Header>
          <LogoWrapper>
            <HeaderComp.SideBarComp visible={visible} setVisible={setVisible} />
            <HeaderComp.DrawerComp serVisible={setVisible} visible={visible} />
            <HeaderComp.LogoTitle />
            <HeaderComp.LoginButton showLoginModal={showLoginModal} token={token} />
            <HeaderComp.LoginModal
              isLoginVisible={isLoginVisible}
              handleLoginCancel={handleLoginCancel}
              showJoinModal={showJoinModal}
              token={token}
              setToken={setToken}
              setIsLoginVisible={setIsLoginVisible}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />

            <Modal
              visible={isJoinVisible}
              onOk={handleJoinOk}
              onCancel={handleJoinCancel}
              footer={[]}
            >
              <Register
                handleJoinOk={handleJoinOk}
                setJoinID={setJoinID}
                setJoinName={setJoinName}
                setJoinPW={setJoinPW}
              />
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

const SideBar = styled.span`
  margin-right: 15px;
`;

export default HeaderComponent;
