import { Table as TableAntd, Spin, Skeleton, Empty } from 'antd';
import Axios from 'Axios';
import React, { useEffect, useState } from 'react';

interface Props {
    data: any;
}

const TableData: React.FC<Props> = ({ data }: Props) => {
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
            <TableAntd columns={columns} dataSource={data} />
        </>
    );
};

export default TableData;
