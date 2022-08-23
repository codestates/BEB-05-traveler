import React from 'react';
import { Button } from 'antd';
import { theme } from '../../style/theme';
import { Link } from 'react-router-dom';

function LoginButton({ showLoginModal, token }) {
  return (
    <>
      {token ? (
        <Link to="/mypage">
          <Button>My page</Button>
        </Link>
      ) : (
        <Button
          shape="round"
          size="large"
          onClick={showLoginModal}
          style={{ color: `${theme.brown}`, fontWeight: 'bold' }}
        >
          Login
        </Button>
      )}
    </>
  );
}

export default LoginButton;
