import {gql} from "@apollo/client";

export type ContentItem = {
    text: string;
    imageUrl: string;
    imageDescription: string;
};

export type AsideItem = {
    text: string;
    imageUrl: string;
    imageDescription: string;
};


export const contentItemsQuery = gql(`
    query getContentItems {
        contentItems {
            text
            imageUrl
            imageDescription
        }
    }
`);

export const supplementaryContentItemsQuery = gql(`
    query getSupplementaryContentItems {
        supplementaryContentItems {
            text
            imageUrl
            imageDescription
        }
    }
`);