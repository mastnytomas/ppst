import { Table as TableAntd, Spin, Skeleton, Empty } from 'antd';
import Axios from 'Axios';
import React, { useEffect, useState } from 'react';

interface Props {
    url: any;
    type?: string;
}

const Table: React.FC<Props> = ({ url, type }: Props) => {
    const [link, setLink] = useState(url);
    const [data, setData] = useState<Array<any>>([]);
    const fetchData = async () => {
        Axios.get(link).then((response) => {
            if (type) {
                setData(response.data[type]);
            } else {
                setData(response.data);
            }
        });
    };
    useEffect(() => {
        setLink(url);
        fetchData();
    }, []);

    if (!(data.length > 0))
        return (
            <>
                <p>Probíhá načítání tabulky</p>
                <Spin />
            </>
        );

    const columns = Object.keys(data[0]).map((key) => {
        return {
            title: key,
            dataIndex: key,
            key: key
        };
    });
    return (
        <>
            <TableAntd rowKey={url} columns={columns} dataSource={data} />
        </>
    );
};

export default Table;
