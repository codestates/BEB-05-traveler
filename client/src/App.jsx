import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import Router from './router/Router';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { theme } from './style/theme';
import { useCookies } from 'react-cookie';

const { Content } = Layout;

function App() {
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    nickname: '',
    address: '',
    token_amount: '',
    eth_amount: '',
    waiting_time: '',
    created_at: '',
  });
  const [token, setToken] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['rememberUser']);

  useEffect(() => {
<<<<<<< HEAD
    console.log(cookies);
    console.log(userInfo);
  }, [cookies, userInfo]);
=======
  }, [cookies, userInfo, token]);
>>>>>>> c9477c1c5ad9a489bfcd88aa897487c028c324a9

  return (
    <div className="App">
      <Layout
        className="layout"
        style={{
          height: '100%',
          background: `linear-gradient(${theme.beige}, ${theme.d_beige} )`,
          color: `${theme.beige}`,
          gap: `${theme.space_2}`,
        }}
      >
        <Header
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          token={token}
          setToken={setToken}
          setCookie={setCookie}
        />
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.space_9}`,
          }}
          className="site-layout-content"
        >
<<<<<<< HEAD
          <Router userInfo={userInfo} />
=======
          <Router token={token} userInfo={userInfo} />
>>>>>>> c9477c1c5ad9a489bfcd88aa897487c028c324a9
        </Content>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
