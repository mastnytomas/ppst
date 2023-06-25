import { Table as TableAntd, Button } from 'antd';
import Axios from 'Axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateParams } from './../utils/utils';
interface Props {
    data: any;
}

const SearchTableDuel: React.FC<Props> = ({ data }: Props) => {
    if (Object.keys(data).length !== 0) {
        const columns = [
            { title: 'ID', dataIndex: 'id_stis_hrac', key: 'id_stis_hrac' },
            { title: 'Jméno', dataIndex: 'jmeno', key: 'jmeno' },
            {
                title: 'Rok narození',
                dataIndex: 'rok_narozeni',
                key: 'rok_narozeni'
            },
            { title: 'Oddíl', dataIndex: 'oddil_nazev', key: 'oddil_nazev' },
            { title: 'ELO', dataIndex: 'elo', key: 'elo' },
            {
                title: 'Zvolit',
                dataIndex: '',
                key: 'id_stis_hrac',
                render: (record) => (
                    <a href={'/player/' + record.index_name}>
                        <Button>Zvolit hráče</Button>
                    </a>
                )
            }
        ];

        return <TableAntd dataSource={data} columns={columns} />;
    }
};

export default SearchTableDuel;
