import Table from './Table';
import { useState } from 'react';

const Ranking = (): void => {
    const url = 'https://www.elost.cz/api_1_0/zebricek?json=yes';
    return <Table url={url} />;
};

export default Ranking;
