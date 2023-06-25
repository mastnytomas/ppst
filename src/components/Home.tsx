import { Col, Row } from 'antd';
import { Typography } from 'antd';

const Home = (): void => {
    const { Title } = Typography;
    return (
        <>
            <Row
                style={{
                    paddingTop: '15%'
                }}
            >
                <Col span={12} style={{ textAlign: 'right' }}>
                    <img
                        src="src/img/logo.png"
                        alt="Italian Trulli"
                        width="100"
                        height="100"
                        textAlign="right"
                    />
                </Col>
                <Col span={12}>
                    <Title>PPST</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Title level={2}>Ping-Pong Statistika</Title>
                    <Title level={4}>
                        Přehledné statistiky hráčů stolního tenisu působících v
                        českých soutěžích
                    </Title>
                </Col>
            </Row>
        </>
    );
};

export default Home;
