import React from 'react';
import { ContentItem } from './contentItems';

export default function ContentItemsComponent({
    contentItems,
}: {
    contentItems: ContentItem[];
}) {
    const contenItemsRenderable = contentItems.map((item, index) => {
        return (
            <article key={index}>
                <p>{item.text}</p>
                <img
                    src={item.imageUrl}
                    alt={item.imageDescription}
                    style={{ maxWidth: '100%', display: 'block' }}
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
