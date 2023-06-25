import { Divider, List } from 'antd';
import { getAllPlayerTeams } from './../utils/utils';
interface Props {
    data: any;
}

const Ring: React.FC<Props> = ({ data }: Props) => {
    const teams = getAllPlayerTeams(data);
    return (
        <>
            <List
                size="small"
                bordered
                dataSource={teams}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
};

export default Ring;
