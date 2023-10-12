import React from 'react';
import {getImagePath} from "../../utilities";

export type AsideItem = {
  text: string;
  imageUrl: string;
  imageDescription: string;
};

export default function Aside({
  asideItems,
}: {
  asideItems: Array<AsideItem>;
}) {
  return (
    <aside>
      <h2>А що крім апітерапії?</h2>
      <hr />

      <p>Михайлівський апітерапевтичний оздоровчий комплекс пропонує також:</p>

      <ol>
        {asideItems.map((item, index) => {
          return <li key={index}>
              <article>
                <p>{item.text}</p>
                <img
                  src={getImagePath(item.imageUrl)}
                  alt={item.imageDescription}
                  style={{ maxWidth: '100%', display: 'block' }}
                />
              </article>
            </li>;
        })}
      </ol>
    </aside>
  );
}
