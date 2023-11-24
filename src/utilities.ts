import {DocumentNode, QueryResult, useQuery} from "@apollo/client";
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
  let month = months[date.getUTCMonth()].substring(0, 3);
  return `${date.getDate()} ${month}. ${date.getFullYear()}`;
}

export function formatDateAsLongString(date: Date) {
  let month = months[date.getUTCMonth()];
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

export function useQueryWithCache(query: DocumentNode): QueryResult {
    const queryResult = useQuery(query);
    const queryStripped = query.loc!.source.body.replace(/\s/g, "");
    const indexOfFirstCurlyBrace = queryStripped.indexOf("{");
    const indexOfSecondCurlyBrace = queryStripped.indexOf("{", indexOfFirstCurlyBrace + 1);
    const queryTarget = queryStripped.substring(indexOfFirstCurlyBrace + 1, indexOfSecondCurlyBrace);

    useEffect(() => {
        if(!queryResult.loading && !queryResult.error) {
            queryResult.client.writeQuery({ query, data: queryResult.data});
        }
    }, [queryResult.data]);

    if (queryResult.loading) {
        return queryResult;
    }
    if (queryResult.error) {
        return queryResult;
    }
    return {...queryResult, data: queryResult.data[queryTarget] };
}