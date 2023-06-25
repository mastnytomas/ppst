import { RingProgress } from '@ant-design/plots';
import PlayerTeams from './PlayerTeams';
import { Divider, Card, Row, Col, Image, Statistic } from 'antd';
import Ring from './Ring';
import { getPlayerActualTeam, playerWins, playerSets } from './../utils/utils';
import TopWins from './TopWins';
import Papa from 'papaparse';
interface Props {
    playerInfo: string;
    dataSeasons;
    dataMatches;
}
const BasicInformations: React.FC<Props> = ({
    playerInfo,
    dataSeasons,
    dataMatches
}: Props) => {
    const idTeam = playerInfo['Id oddílu'];
    const teamMatches =
        'https://stis.ping-pong.cz/los-vse/svaz-420111/rocnik-2022/oddil-' +
        idTeam +
        '.cldr?subject=Utk%C3%A1n%C3%AD%20%25soutez%20%25domaci%20%25hoste%20%25mojedruzstvo%20%25souper&odehrane=1';
    const teamLogo = 'https://stis.ping-pong.cz/img/klub/' + idTeam;
    const wins = playerWins(dataMatches);
    const sets = playerSets(dataMatches);
    var commonConfig = { delimiter: ',' };
    const json = Papa.parse(teamMatches, {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
            setCSVData(result.data);
        }
    });
    console.log(json);
    return (
        <>
            <Divider orientation="">Základní informace</Divider>
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Základní informace" bordered={false}>
                        <Statistic
                            title="Jméno"
                            value={playerInfo['Hráč jméno']}
                        />
                        <Statistic
                            title="Rok narození"
                            value={playerInfo['Rok narození'] + ' '}
                            precision={0}
                        />
                        <Statistic
                            title="Pohlaví"
                            value={playerInfo['Pohlaví']}
                        />
                        <Statistic
                            title="Aktuální ELO"
                            value={playerInfo['ELO']}
                        />
                        <Statistic
                            title="Pořadí v žebříčku"
                            value={playerInfo['Pořadí']}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Působil v oddílech" bordered={false}>
                        <PlayerTeams data={dataSeasons} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Zápasové statistiky" bordered={false}>
                        <Statistic
                            title="Celkový počet zápasů"
                            value={dataMatches.length}
                        />
                        <Statistic title="Vyhraných zápasů" value={wins} />
                        <Statistic
                            title="Prohraných zápasů"
                            value={dataMatches.length - wins}
                        />
                        <Statistic title="Vyhraných setů" value={sets[0]} />
                        <Statistic title="Prohraných setů" value={sets[1]} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Skalpy" bordered={false}>
                        <TopWins data={dataMatches} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default BasicInformations;
