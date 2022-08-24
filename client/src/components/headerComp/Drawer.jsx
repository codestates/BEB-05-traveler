import { Drawer, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function DrawerComp({ visible, setVisible, token, userInfo }) {
  const { Title } = Typography;

  const placement = 'left';

  const onClose = () => {
    setVisible(false);
  };

  return (
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
          <Link to="/mypage" state={{ token: token, userInfo: userInfo }}>
            <Title style={{ fontSize: 30 }}>My Page</Title>
          </Link>
          <Link to="/create" state={{ token: token, userInfo: userInfo }}>
            <Title style={{ fontSize: 30 }}>Create your NFT</Title>
          </Link>
          <Link to="/market">
            <Title style={{ fontSize: 30 }}>NFT Market</Title>
          </Link>
        </Drawer>
      </>
    </Side>
  );
}

export default DrawerComp;

const Side = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');

  font-family: 'Aboreto', cursive;
`;
