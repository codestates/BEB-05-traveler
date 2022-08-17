import { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import Router from "./router/Router";
import { Layout } from "antd";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { theme } from "./style/theme";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

function App() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setCollapsed(true);
    }, [location.pathname]);

    return (
        <div className="App">
            <Layout
                className="layout"
                style={{
                    height: "100%",
                    background: `linear-gradient(${theme.very_light_blue_main}, ${theme.white} )`,
                    color: `${theme.very_dark_blue_line}`,
                    gap: `${theme.space_2}`,
                }}
            >
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: `${theme.space_9}`,
                    }}
                    className="site-layout-content"
                >
                    <Router collapsed={collapsed} setCollapsed={setCollapsed} />
                </Content>
                <Footer />
            </Layout>
        </div>
    );
}

export default App;
