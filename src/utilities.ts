import {DocumentNode, useQuery} from "@apollo/client";
import {useEffect} from "react";

export function getImagePath(assetImagePath: string) {
  return `https://elasticbeanstalk-eu-central-1-306070261283.s3.eu-central-1.amazonaws.com/public/${assetImagePath}`;
}

const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
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

export interface TargettedResult<T> {
    data: T | undefined,
    loading: boolean,
    error?: string
}

export function useQueryWithCache<T>(query: DocumentNode): TargettedResult<T> {
    const queryResult = useQuery(query);
    const queryStripped = query.loc!.source.body.replace(/\s/g, "");
    const indexOfFirstCurlyBrace = queryStripped.indexOf("{");
    const indexOfSecondCurlyBrace = queryStripped.indexOf("{", indexOfFirstCurlyBrace + 1);
    const queryTarget = queryStripped.substring(indexOfFirstCurlyBrace + 1, indexOfSecondCurlyBrace);

    useEffect(() => {
        if(!queryResult.loading && !queryResult.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            queryResult.client.writeQuery({ query, data: queryResult.data});
        }
    }, [queryResult.data]);

    if (queryResult.loading) {
        return { loading: true, data: undefined};
    }
    if (queryResult.error) {
        return { loading: false, error: queryResult.error.message, data: undefined };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return { loading: false, data: queryResult.data[queryTarget] as T };
}