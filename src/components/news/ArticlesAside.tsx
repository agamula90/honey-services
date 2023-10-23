import React from 'react';
import { formatDateAsShortString } from '../../utilities';
import * as styles from "./news.module.css"

export type ArticleItem = {
  createdAt: Date;
  text: string;
  title: string;
  id: number;
  image: string;
};

export default function ArticlesAside({
  articles,
  onOpenArticle,
}: {
  articles: Array<ArticleItem>;
  onOpenArticle: Function;
}) {
  return (
    <aside className={styles.aside}>
        <span>Свіжі статті</span>
      <ul className={styles.ul}>
        {articles.map((article, index) => {
          return (
            <li className={styles.li} key={article.id}>
              <a onClick={() => onOpenArticle(index)} href="">{article.title}</a>
              <span>{formatDateAsShortString(article.createdAt)}</span>
            </li>
          );
        })}
      </ul>
      <span>Інформація</span>
    </aside>
  );
}
