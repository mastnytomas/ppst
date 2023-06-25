import Axios from 'Axios';
import React, { useEffect, useState } from 'react';

export const winRateOfSeason = (data: any, season?: string): double => {
    let wins: int = 0;
    let defeats: int = 0;
    if (data) {
        {
            Object.keys(data).map((k) => {
                if (season) {
                    if (data[k].ročník === season) {
                        wins += parseInt(data[k].výher);
                        defeats += parseInt(data[k].proher);
                    }
                } else {
                    wins += parseInt(data[k].výher);
                    defeats += parseInt(data[k].proher);
                }
            });
        }
    }
    return wins / (wins + defeats);
};

export const winRateComplete = (data: any): any => {
    const array = [];
    let wins: int = 0;
    let defeats: int = 0;
    if (data) {
        {
            Object.keys(data).map((k) => {
                wins = parseInt(data[k].výher);
                defeats = parseInt(data[k].proher);
                array.push({
                    season: data[k].ročník,
                    competition: data[k].soutěž,
                    percentage: wins / (wins + defeats)
                });
            });
        }
    }
    return array;
};

export const getTeam = (data: any): string => {
    if (data) {
        {
            Object.keys(data).map((k) => {
                if (season) {
                    if (data[k].ročník === season) {
                        wins += parseInt(data[k].výher);
                        defeats += parseInt(data[k].proher);
                    }
                } else {
                    wins += parseInt(data[k].výher);
                    defeats += parseInt(data[k].proher);
                }
            });
        }
    }
    return wins / (wins + defeats);
};

export const makeDuelData = (
    dataPlayer1: any,
    player2Name: string,
    setMatchesData
): any => {
    const internalData = [];
    {
        Object.keys(dataPlayer1).map((k) => {
            if (dataPlayer1[k]['soupeř id'] === player2Name) {
                internalData.push(dataPlayer1[k]);
            }
        });
    }
    return internalData;
};

export const setterPlayerName = (playerId: string, setPlayerName): void => {
    const url =
        'https://www.elost.cz/api_1_0/hrac_zaklad/' + playerId + '?json=yes';
    Axios.get(url).then((response) => {
        setPlayerName(response.data[0]['Hráč jméno']);
    });
};

export const setterDataFromUrl = (url: string, setData): void => {
    Axios.get(url).then((response) => {
        setData(response.data);
    });
};

export const setterPlayerInfo = (playerId: string, setPlayerInfo): void => {
    const url =
        'https://www.elost.cz/api_1_0/hrac_zaklad/' + playerId + '?json=yes';
    Axios.get(url).then((response) => {
        setPlayerInfo(response.data[0]);
    });
};

export const playerNameToPlayerId = (playerName: string): string => {
    // const url = 'https://www.elost.cz/api_1_0/zebricek/?json=yes';
    // const [data, setData] = useState();
    // setterDataFromUrl(url, setData);
    // console.log(data);
};

export const setterDataSearch = (url: string, setDataSearch): void => {
    Axios.get(url).then((response) => {
        setDataSearch(response.data.hraci);
    });
};

export const getAllPlayerTeams = (data): Array => {
    const teams = [];
    Object.keys(data).map((k) => {
        if (teams.indexOf(data[k]['oddíl']) === -1) {
            teams.push(data[k]['oddíl']);
        }
    });
    return teams;
};

export const playerWins = (data: any): any => {
    let wins: int = 0;
    if (data) {
        {
            Object.keys(data).map((k) => {
                if (
                    parseInt(data[k]['hráč sety']) >
                    parseInt(data[k]['soupeř sety'])
                ) {
                    ++wins;
                }
            });
        }
    }
    return wins;
};

export const playerSets = (data: any): any => {
    let setsW: int = 0;
    let setsL: int = 0;
    const sets = [];
    if (data) {
        {
            Object.keys(data).map((k) => {
                setsW += parseInt(data[k]['hráč sety']);
                setsL += parseInt(data[k]['soupeř sety']);
            });
        }
    }
    sets.push(setsW, setsL);
    return sets;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTopWinsData = (data): any => {
    const winMatches = [];
    Object.keys(data).map((k) => {
        if (data[k]['hráč sety'] === '3') {
            winMatches.push(data[k]);
        }
    });
    winMatches.sort((a, b) => b['soupeř ELO'] - a['soupeř ELO']);
    return winMatches;
};
