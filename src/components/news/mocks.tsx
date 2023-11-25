import {gql} from "@apollo/client";

export interface ArticleHref {
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