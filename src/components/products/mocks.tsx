import {gql} from "@apollo/client";

export type Product = {
    id: number,
    title: string,
    imageUrl: string,
    description: string,
    types: Array<string>,
    volumes: Array<string>
};

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
