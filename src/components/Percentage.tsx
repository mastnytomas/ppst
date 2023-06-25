import { RingProgress } from '@ant-design/plots';
import { Divider, Card, Row, Col } from 'antd';
import Ring from './Ring';
import { winRateComplete } from './../utils/utils';
interface Props {
    data: any;
}

const Percentage: React.FC<Props> = ({ data }: Props) => {
    const winRateData = winRateComplete(data);

    return (
        <>
            <Divider orientation="">Úspěšnost</Divider>
            <Row gutter={32}>
                {Object.keys(winRateData).map((k) => {
                    return (
                        <Col className="gutter-row" span={4}>
                            <h3>
                                {winRateData[k].season +
                                    ' ' +
                                    winRateData[k].competition}
                            </h3>
                            <Ring
                                height={100}
                                width={100}
                                autoFit={false}
                                percent={winRateData[k].percentage}
                                color={'red'}
                            />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default Percentage;
