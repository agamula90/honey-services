import { useEffect } from 'react';
import { baseUrl } from './store';

export function getImagePath(assetImagePath: string) {
    return `https://elasticbeanstalk-eu-central-1-306070261283.s3.eu-central-1.amazonaws.com/public/${assetImagePath}`;
}

const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
];

export function formatDateAsShortString(date: Date) {
    const month = months[date.getUTCMonth()].substring(0, 3);
    return `${date.getDate()} ${month}. ${date.getFullYear()}`;
}

export function formatDateAsLongString(date: Date) {
    const month = months[date.getUTCMonth()];
    let hours = date.getHours().toString();
    if (Number(hours) < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes().toString();
    if (Number(minutes) < 10) {
        minutes = `0${minutes}`;
    }
    return `${date.getDate()} ${month} ${date.getFullYear()} в ${hours}:${minutes}`;
}

export interface GraphQLResult<T> {
    data: T[];
    loading: boolean;
    error?: string;
}

export function setGraphQLResultFromRemote<T>(
    setGraphQLResult: (newGraphQLResult: GraphQLResult<T>) => void,
    query: string,
    isFetchingAllowed: boolean
) {
    const queryStripped = query.replace(/\s/g, '');
    const indexOfFirstCurlyBrace = queryStripped.indexOf('{');
    const indexOfSecondCurlyBrace = queryStripped.indexOf(
        '{',
        indexOfFirstCurlyBrace + 1
    );
    const queryTarget = queryStripped.substring(
        indexOfFirstCurlyBrace + 1,
        indexOfSecondCurlyBrace
    );

    useEffect(() => {
        const fetchQuery = async () => {
            return await fetch(`${baseUrl}/graphql`, {
                method: 'POST',
                body: JSON.stringify({ query: query }),
                headers: { 'Content-Type': 'application/json' },
            });
        };

        if (isFetchingAllowed) {
            fetchQuery()
                .then((response) => response.json())
                .then((response) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    const result = response.data[queryTarget] as T[];
                    setGraphQLResult({
                        data: result,
                        loading: false,
                    });
                })
                .catch((e) => {
                    setGraphQLResult({
                        data: [],
                        loading: false,
                        error: '' + e,
                    });
                });
        }
    }, [query, isFetchingAllowed]);
}
