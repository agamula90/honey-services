import React from 'react';
import {getImagePath} from "../../utilities";
import {ContentItem} from "./mocks";

export default function ContentItems({
  contentItems,
}: {
  contentItems: Array<ContentItem>;
}) {
  const contenItemsRenderable = contentItems.map((item, index) => {
    return (
      <article key={index}>
        <p>{item.text}</p>
        <img
          src={getImagePath(item.imageUrl)}
          alt={item.imageDescription}
          style={{maxWidth: "100%", display: "block"}}
        />
      </article>
    );
  });

  return (
    <section>
      <h2>Апітерапія - нове слово в сфері оздоровлення</h2>
      <hr />
      {contenItemsRenderable}

      <p>Запрошуємо відчути на собі цілющу дію бджолиних сімей!</p>
    </section>
  );
}
