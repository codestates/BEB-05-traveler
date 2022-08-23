import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Space } from 'antd';
import { EyeInvisibleOutlined, UserOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

function LoginModal({
  isLoginVisible,
  handleLoginCancel,
  showJoinModal,
  token,
  setToken,
  setIsLoginVisible,
}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLoginOk = () => {
    axios
      .post('http://localhost:4000/user/login', {
        user_id: id,
        password: pw,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data.accessToken, '저장전');
          setToken(res.data.data.accessToken);
          setIsLoginVisible(false);
        }
      })
      .then((res) => {
        axios
          .get('http://localhost:4000/user/info', {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data);
            this.setState({ ...res.data.data.userInfo });
          });
      });
  };
  return (
    <>
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
          <Input
            onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="아이디"
            type="text"
            prefix={<UserOutlined />}
          />
          <Input.Password
            onChange={(e) => {
              setPw(e.target.value);
            }}
            placeholder="비밀번호"
            type="password"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>
      </Modal>
    </>
  );
}

export default LoginModal;
