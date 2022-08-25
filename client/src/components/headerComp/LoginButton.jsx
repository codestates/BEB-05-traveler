import React from 'react';
import { Button } from 'antd';
import { theme } from '../../style/theme';
import { Link } from 'react-router-dom';

function LoginButton({ token, setIsLoginVisible, userInfo, loading }) {
  const showLoginModal = () => {
    setIsLoginVisible(true);
  };

  return (
    <>
      {token ? (
        <Link to="/mypage" state={{ token: token, userInfo: userInfo }}>
          <Button>My page</Button>
        </Link>
      ) : (
        <Button
          shape="round"
          size="large"
          loading={loading}
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
