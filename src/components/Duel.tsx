import { Row, Col, Input, Button, Divider, Card, Statistic, Spin } from 'antd';
import Axios from 'Axios';
import {
    setterDataSearch,
    setterPlayerName,
    makeDuelData,
    playerWins,
    playerSets,
    setterPlayerInfo
} from './../utils/utils';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchTableDuel from './SearchTableDuel';
import TableData from './TableData';
const { Search } = Input;
const Duel = (): void => {
    const [params] = useSearchParams();
    const player1Id = params.get('p1');
    const player2Id = params.get('p2');
    const [dataSearchPlayer1, setDataSearchPlayer1] = useState<Array<any>>([]);
    const [dataSearchPlayer2, setDataSearchPlayer2] = useState<Array<any>>([]);
    const [dataPlayer1, setDataPlayer1] = useState<Array<any>>([]);
    const [matchesData, setMatchesData] = useState<Array<any>>([]);
    const [player1Name, setPlayer1Name] = useState();
    const [player2Name, setPlayer2Name] = useState();
    const player1Wins = playerWins(matchesData);
    const player1Loses = matchesData.length - player1Wins;
    const bilanceMatches = '' + player1Wins + ' : ' + player1Loses;
    const moreWins = () => {
        if (player1Wins > matchesData.length / 2) {
            return player1Name;
        } else if (player1Wins === matchesData.length / 2) {
            return 'Shodná bilance';
        } else return player2Name;
    };
    const player1Sets = playerSets(matchesData);
    const player1SetsWins = player1Sets[0];
    const player1SetsLoses = player1Sets[1];
    const bilanceSets = '' + player1Sets[0] + ' : ' + player1Sets[1];
    const [player1InfoData, setPlayer1InfoData] = useState<Array<any>>([]);
    const [player2InfoData, setPlayer2InfoData] = useState<Array<any>>([]);
    const onSearchPlayer1 = async (e) => {
        const url = 'https://www.elost.cz/api_1_0/hledat_hrace?q=' + e;
        setterDataSearch(url, setDataSearchPlayer1);
    };
    const onSearchPlayer2 = async (e) => {
        const url = 'https://www.elost.cz/api_1_0/hledat_hrace?q=' + e;
        setterDataSearch(url, setDataSearchPlayer2);
    };

    const matchReady = () => {
        if (player1Id && player2Id) {
            fetchPlayer1Data();
        }
    };

    useEffect(() => {
        setDataSearchPlayer1({});
        setterPlayerName(player1Id, setPlayer1Name);
        matchReady();
    }, [player1Id]);

    useEffect(() => {
        setDataSearchPlayer2({});
        setterPlayerName(player2Id, setPlayer2Name);
        matchReady();
    }, [player2Id]);

    const fetchPlayer1Data = async () => {
        await Axios.get(
            'https://www.elost.cz/api_1_0/hrac/' +
                player1Id +
                '?filtr_od_sezony=2011&json=yes'
        ).then((response) => {
            setDataPlayer1(response.data);
        });
    };

    useEffect(() => {
        if (dataPlayer1) {
            setMatchesData(makeDuelData(dataPlayer1, player2Name));
            setterPlayerInfo(player2Id, setPlayer2InfoData);
            setterPlayerInfo(player1Id, setPlayer1InfoData);
        }
    }, [dataPlayer1]);

    return (
        <>
            <Row>
                <Col span={12}>
                    První hráč{player1Id}
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={(e) => onSearchPlayer1(e)}
                    />
                    <SearchTableDuel
                        data={dataSearchPlayer1}
                        originalParams={params}
                        playerSet={1}
                    />
                </Col>
                <Col span={12}>
                    Druhý hráč{player2Id}
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={(e) => onSearchPlayer2(e)}
                    />
                    <SearchTableDuel
                        data={dataSearchPlayer2}
                        originalParams={params}
                        playerSet={2}
                    />
                </Col>
            </Row>
            <Divider orientation="">Zvolení hráči</Divider>
            <Row>
                <Col span={11} style={{ textAlign: 'right' }}>
                    <Statistic
                        title="Hráč 1"
                        value={player1Name ? player1Name : 'Hráč 1 není zvolen'}
                    />
                    {player1Name && (
                        <Button onClick={() => setPlayer1Name('')}>
                            Resetovat hráče 1
                        </Button>
                    )}
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    {' '}
                    <Button
                        disabled={!player1Name || !player2Name}
                        type="primary"
                        onClick={() => fetchPlayer1Data()}
                    >
                        Spustit duel
                    </Button>
                </Col>
                <Col span={11} style={{ textAlign: 'left' }}>
                    <Statistic
                        title="Hráč 2"
                        value={player2Name ? player2Name : 'Hráč 2 není zvolen'}
                    />
                    {player2Name && (
                        <Button onClick={() => setPlayer2Name('')}>
                            Resetovat hráče 2
                        </Button>
                    )}
                </Col>
            </Row>
            <Divider orientation="">Přehled duelu</Divider>
            {matchesData.length > 0 ? (
                <>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Přehled" bordered={false}>
                                <Statistic
                                    title="Celkový počet duelů"
                                    value={matchesData.length}
                                />
                                <Statistic
                                    title="Vícekrát zvítězil"
                                    value={moreWins()}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Bilance" bordered={false}>
                                <Statistic
                                    title="Bilance zápasů"
                                    value={bilanceMatches}
                                />
                                <Statistic
                                    title="Bilance setů"
                                    value={bilanceSets}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Aktuální Elo" bordered={false}>
                                <Statistic
                                    title={'ELO ' + player1Name}
                                    value={player1InfoData['ELO']}
                                />
                                <Statistic
                                    title={'ELO ' + player2Name}
                                    value={player2InfoData['ELO']}
                                />
                                <Statistic
                                    title={'Rozdíl ELO'}
                                    value={
                                        player1InfoData['ELO'] -
                                        player2InfoData['ELO']
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>
                    <TableData data={matchesData} />
                </>
            ) : (
                <>
                    <p>Probíhá načítání</p>
                    <Spin />
                </>
            )}
        </>
    );
};

export default Duel;
