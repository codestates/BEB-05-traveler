import { Layout, Row, Col, Button, Drawer } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../style/theme";
import { MenuOutlined, MoreOutlined } from "@ant-design/icons";

const { Header: _Header } = Layout;
function HeaderComponent() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const showLogin = (e) => {
        alert("로그인 모달이 들어갈 예정!");
    };

    return (
        <Row justify="center" align="middle">
            <Col span={24}>
                <Header>
                    <Link to="/">
                        <LogoWrapper>
                            <>
                                <Drawer
                                    title="Traveler"
                                    closable={false}
                                    onClose={onClose}
                                    visible={visible}
                                    key="left"
                                >
                                    <p>Home</p>
                                    <p>게시글 페이지</p>
                                    <p>My Page</p>
                                    <p>게시글 작성</p>
                                    <p>Create Your NFT</p>
                                    <p>...</p>
                                    <p>...</p>
                                    <p>...</p>
                                </Drawer>
                            </>
                            <MenuOutlined
                                style={{ fontSize: "200%" }}
                                onClick={showDrawer}
                            ></MenuOutlined>
                            <MoreOutlined style={{ fontSize: "200%" }} />
                            <LogoTitle> Traveler</LogoTitle>
                            <Button shape="round" onClick={showLogin}>
                                Login
                            </Button>
                        </LogoWrapper>
                    </Link>
                </Header>
            </Col>
        </Row>
    );
}

const Header = styled(_Header)`
    background-color: ${theme.very_light_blue_main};
    color: ${theme.very_dark_blue_line};
    z-index: 1000;
    a:link,
    a:visited,
    a:active,
    a:hover {
        text-decoration: none;
        color: ${theme.very_dark_blue_line};
    }
    border-bottom: 1px solid;
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-family: "Aboreto", cursive;
    font-family: "Noto Sans KR", sans-serif;
`;

const LogoTitle = styled.span`
    font-size: ${theme.fs_11};
    font-weight: ${theme.fw_700};
    letter-spacing: -1px;
    white-space: nowrap;
    margin-left: auto;
    margin-right: auto;
    font-family: "Aboreto", cursive;
    font-family: "Noto Sans KR", sans-serif;
`;

export default HeaderComponent;
