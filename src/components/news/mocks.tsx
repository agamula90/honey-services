import {gql} from "@apollo/client";

export type ArticleHref = {
    href: string;
    title: string
}

export const articlesQuery = gql(`
    query getArticles {
        articles {
            title
            href
        }
    }`);