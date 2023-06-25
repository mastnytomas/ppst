import { Card, Divider } from 'antd';
import React, { useEffect, useState } from 'react';

import { WinRate } from '../utils/utils';
//import Chart from './Chart';
import {
    delay,
    setterDataFromUrl,
    setterPlayerName,
    setterPlayerInfo
} from '../utils/utils';

import Ring from './Ring';
import Table from './Table';
import TableTeam from './TableTeam';
import Scraping from './../utils/scraping';
import Percentage from './Percentage';
import BasicInformations from './BasicInformations';
import ChatTest from './ChatTest';

interface Props {
    playerInfo: any;
    dataMatches: any;
    dataSeasons: any;
    url: string;
}

const Player: React.FC<Props> = ({
    playerInfo,
    dataMatches,
    dataSeasons,
    url
}: Props) => {
    return (
        <>
            <BasicInformations
                playerInfo={playerInfo}
                dataMatches={dataMatches}
                dataSeasons={dataSeasons}
            />
            {
                //<Chart data={[...dataMatches].reverse()} />}
            }
            <Percentage data={dataSeasons} />
            <Table url={url} />
        </>
    );
};

export default Player;
