import { Table as TableAntd, Button } from 'antd';
import Axios from 'Axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateParams } from './../utils/utils';
interface Props {
    data: any;
    originalParams: any;
    playerSet: number;
}

const SearchTableDuel: React.FC<Props> = ({
    data,
    originalParams,
    playerSet
}: Props) => {
    const [param, setParams] = useSearchParams();
    const originalPlayer1 = originalParams.get('p1');
    const originalPlayer2 = originalParams.get('p2');

    const updateParams = (index_name) => {
        if (playerSet === 1) {
            setParams({
                p1: index_name,
                p2: originalPlayer2
            });
        } else if (playerSet === 2) {
            setParams({
                p1: originalPlayer1,
                p2: index_name
            });
        } else console.log('Error playerSet ');
    };

    if (Object.keys(data).length !== 0) {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id_stis_hrac',
                key: 'id_stis_hrac'
            },
            { title: 'Jméno', dataIndex: 'jmeno', key: 'jmeno' },
            {
                title: 'Rok narození',
                dataIndex: 'rok_narozeni',
                key: 'rok_narozeni'
            },
            {
                title: 'Oddíl',
                dataIndex: 'oddil_nazev',
                key: 'oddil_nazev'
            },
            { title: 'ELO', dataIndex: 'elo', key: 'elo' },
            {
                title: 'Zvolit',
                dataIndex: '',
                key: 'id_stis_hrac',
                render: (record) => (
                    <Button onClick={() => updateParams(record.index_name)}>
                        Zvolit hráče
                    </Button>
                )
            }
        ];
        return <TableAntd dataSource={data} columns={columns} />;
    }
};

export default SearchTableDuel;
