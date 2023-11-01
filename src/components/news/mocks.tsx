export type ArticleHref = {
    href: string;
    title: string
}

export type ArticleItem = {
    createdAt: Date;
    text: string;
    title: string;
    id: number;
    image: string;
};

export function getArticleHrefs(): Array<ArticleHref> {
    return [
        {
            title: "Стаття на ВОЛИНЬ НОВИНИ",
            href: "https://www.volynnews.com/news/all/son-na-vulyku-naykrashchyy-pasichnyk-na-seli-klyche-na-bdzholynu-terapiiu/"
        },
        {
            title: "ACC Media Agency",
            href: "https://acc.cv.ua/news/chernivtsi/son-na-bdzholinih-vulikah-na-bukovini-rozvivayut-noviy-vid-turizmu-35308"
        },
        {
            title: "Музей бджільництва",
            href: "https://see-life.biz/article/vidkryly-muzei-bdzhilnytstva/ "
        }
    ];
}