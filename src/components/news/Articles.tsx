import React from 'react';
import styles from "./news.module.css";

export type ArticleHref = {
    href: string;
    title: string
}

export default function Articles(
    {
        articles
    }: {
        articles: Array<ArticleHref>;
    }
) {
    return (
        <aside className={styles.aside}>
            <span>Що пишуть про нас</span>
            <ul className={styles.ul}>
                {articles.map((article, index) => {
                    return (
                        <li className={styles.li} key={article.href}>
                            <a href={article.href}>{article.title}</a>
                        </li>
                    );
                })}
            </ul>
            <span>Що пишуть про нас</span>
        </aside>
    );
}
