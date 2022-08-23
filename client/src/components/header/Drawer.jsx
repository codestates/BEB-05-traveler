import { Drawer } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Drawer({ onClose, visible, placement }) {
  const { Title } = Typography;
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
  );
}

export default Drawer;
