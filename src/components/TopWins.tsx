import { RingProgress } from '@ant-design/plots';
import { Divider, Card, Row, Col, List } from 'antd';
import { playerNameToPlayerId, testovacka } from './../utils/utils';

import { Link } from 'react-router-dom';
import Ring from './Ring';
import { getTopWinsData } from './../utils/utils';
interface Props {
    data: any;
}

const TopWins: React.FC<Props> = ({ data }: Props) => {
    const wins = getTopWinsData(data);
    console.log(wins);
    return (
        <>
            <List
                size="small"
                bordered
                dataSource={wins.slice(0, 8)}
                renderItem={(item) => (
                    <List.Item>
                        <Link to={''}>
                            {item['soupeř jméno']} - {item['soupeř ELO']}
                        </Link>
                    </List.Item>
                )}
            />
        </>
    );
};

export default TopWins;
