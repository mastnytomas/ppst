import React, { useState } from 'react';
import {
    AppstoreOutlined,
    MailOutlined,
    HomeOutlined,
    UserOutlined,
    TrophyOutlined,
    OneToOneOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';

const items: MenuProps['items'] = [
    {
        label: <a href="/">Home</a>,
        icon: <HomeOutlined />
    },
    {
        label: <a href="/player">Hráčské statistiky</a>,
        icon: <UserOutlined />
    },
    {
        label: <a href="/ranking">Žebříček</a>,
        icon: <TrophyOutlined />
    },
    {
        label: <a href="/duel">Duel</a>,
        icon: <OneToOneOutlined />
    },
    {
        label: <a href="/about">O aplikaci</a>,
        icon: <InfoCircleOutlined />
    }
];

const Menu: React.FC = () => {
    return <MenuAntd mode="horizontal" items={items} />;
};

export default Menu;
