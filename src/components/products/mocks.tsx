import {gql} from "@apollo/client";

export interface Product {
    id: number,
    title: string,
    imageUrl: string,
    description: string,
    types: string[],
    volumes: string[]
}

export const productsQuery = gql(`
    query getProducts {
        products {
            id
            title
            imageUrl
            description
            types
            volumes
        }
    }`);
