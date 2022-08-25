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
  }, [cookies, userInfo, token]);

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
          <Router token={token} userInfo={userInfo} />
        </Content>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
