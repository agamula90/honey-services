import React from "react";
import {ArticleItem} from "./ArticlesAside";
import {formatDateAsLongString, getImagePath} from "../../utilities";

export default function Article({ article }: {article: ArticleItem}) {
    if (!article.image) {
        return <>
            <h1>
                {article.title}
            </h1>
            <div>{formatDateAsLongString(article.createdAt)}</div>
            {article.text}
        </>
    }

    return <>
        <h1>
            {article.title}
        </h1>
        <div>{formatDateAsLongString(article.createdAt)}</div>
        <img src={getImagePath(article.image)} alt="" />
        {article.text}
    </>
}