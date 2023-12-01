import React from 'react';
import styles from './news.module.css';
import { Article } from './articles';

export default function ArticlesComponent({
    articles,
    forCuriousClick,
}: {
    articles: Article[];
    forCuriousClick: () => void;
}) {
    return (
        <aside className={styles.aside}>
            <a
                href=""
                onClick={(e) => {
                    e.preventDefault();
                    forCuriousClick();
                }}
                className={styles.forCuriousLink}
                style={{ display: 'block' }}
            >
                Для допитливих
            </a>

            <span>Що пишуть про нас</span>
            <ul className={styles.ul}>
                {articles.map((article) => {
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
