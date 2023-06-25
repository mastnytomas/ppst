import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

import Player from './Player';
import {
    delay,
    setterDataFromUrl,
    setterPlayerName,
    setterPlayerInfo,
    setterDataSearch
} from '../utils/utils';
const { Search } = Input;

import { getDataFromUrl } from '../utils/utils';
import Table from './Table';
import SearchTable from './SearchTable';
import { Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import About from './About';

const LayoutContent = () => {
    const params = useParams();
    const paramsId = params.id;
    const [playerId, setPlayerId] = useState(
        paramsId ? paramsId : 'mastny_tomas_ml_2000'
    );
    const urlSeasons =
        'https://www.elost.cz/api_1_0/hrac_bilance/' + playerId + '?json=yes';
    const [urlSearch, setUrlSearch] = useState();
    const urlMatches =
        'https://www.elost.cz/api_1_0/hrac/' +
        playerId +
        '?filtr_od_sezony=2011&json=yes';
    const [dataSeasons, setDataSeasons] = useState<Array<any>>([]);
    const [dataMatches, setDataMatches] = useState<Array<any>>([]);
    const [dataSearch, setDataSearch] = useState<Array<any>>([]);
    const [playerName, setPlayerName] = useState('Player Name');
    const [playerInfo, setPlayerInfo] = useState<Array<any>>([]);
    const [count, setCount] = useState(0);

    const dataUpdate = async () => {
        setterDataFromUrl(urlSeasons, setDataSeasons);
        setterDataFromUrl(urlMatches, setDataMatches);
        setterPlayerName(playerId, setPlayerName);
        setterPlayerInfo(playerId, setPlayerInfo);
    };
    useEffect(() => {
        dataUpdate();
    }, []);

    const onSearch = async (e) => {
        setUrlSearch('https://www.elost.cz/api_1_0/hledat_hrace?q=' + e);
    };

    useEffect(() => {
        setterDataSearch(urlSearch, setDataSearch);
    }, [urlSearch]);

    return (
        <>
            <p>Content</p>
            <h2>Hráčské statistiky</h2>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(e) => onSearch(e)}
            />
            <SearchTable data={dataSearch} />
            <Player
                playerInfo={playerInfo}
                dataSeasons={dataSeasons}
                dataMatches={dataMatches}
                url={urlSeasons}
            />
            ´
        </>
    );
};

export default LayoutContent;
