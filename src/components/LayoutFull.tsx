import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';

import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Ranking from './Ranking';
import Duel from './Duel';

const { Header, Content, Footer, Sider } = Layout;

const LayoutFull: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {
                <>
                    <Layout className="site-layout">
                        <Header
                            style={{ padding: 0, background: colorBgContainer }}
                        >
                            <LayoutHeader />
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Routes>
                                <Route path="/" element={<Home />}></Route>
                                <Route
                                    path="/ranking"
                                    element={<Ranking />}
                                ></Route>
                                <Route path="/duel" element={<Duel />}></Route>
                                <Route
                                    path="player"
                                    element={<LayoutContent />}
                                >
                                    <Route
                                        path=":id"
                                        element={<LayoutContent />}
                                    ></Route>
                                </Route>
                                <Route path="about" element={<About />}></Route>
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            <LayoutFooter />
                        </Footer>
                    </Layout>
                </>
            }
        </Layout>
    );
};

export default LayoutFull;
