import {gql} from "@apollo/client";

export interface ContentItem {
    text: string;
    imageUrl: string;
    imageDescription: string;
}

export interface AsideItem {
    text: string;
    imageUrl: string;
    imageDescription: string;
}

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