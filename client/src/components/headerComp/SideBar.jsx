import React from 'react';
import styled from 'styled-components';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';

function SideBarComp({ setVisible, visible }) {
  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <SideBar>
        <MenuOutlined style={{ fontSize: '120%' }} onClick={showDrawer}></MenuOutlined>
      </SideBar>
      <MoreOutlined style={{ fontSize: '200%' }} />
    </>
  );
}

const SideBar = styled.span`
  margin-right: 15px;
`;

export default SideBarComp;
