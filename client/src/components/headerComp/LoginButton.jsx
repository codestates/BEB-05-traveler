import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import { theme } from '../../style/theme';
import { authToken } from '../../authToken';

function LoginButton({ setIsLoginVisible, btnVisible, setBtnVisible, userInfo, loading, cookieRemove }) {

  const showLoginModal = (e) => { 
    e.preventDefault();
    setIsLoginVisible(true);
  };


  useEffect(()=>{
    if (authToken.getToken() === ''){setBtnVisible(true);}
    else {setBtnVisible(false);}
  },[]);

  const clickHandler = (e) => {
    e.preventDefault();
    cookieRemove('rememberUser',{path:'/'});
    window.alert("로그아웃 되었습니다.")
    window.location.reload();
    authToken.setToken('');
    setBtnVisible(true);
  }

  return (
    <>
      {btnVisible ? (
        <Button
          shape="round"
          size="large"
          loading={loading}
          onClick={showLoginModal}
          style={{ color: `${theme.brown}`, fontWeight: 'bold' }}
        >
          Login
        </Button>
      ):
      (
        <Button
          shape="round"
          size="large"
          onClick={clickHandler}
        >Logout</Button>
      )}
    </>
  );
}

export default LoginButton;
