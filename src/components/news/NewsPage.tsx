import React, { useState } from 'react';
import { set as setArticles, articlesQuery } from './articlesSlice';
import { Article } from './articles';
import styles from './news.module.css';
import '../layout.css';
import { getImagePath, setGraphQLResultFromRemote } from '../../utilities';
import ForCurious from './ForCurious';
import DefaultProgressBar from '../DefaultProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { cacheTimeoutMillis, RootState } from '../../store';
import ArticlesComponent from './ArticlesComponent';
import { setLoaded } from '../navigationSlice';

export default function NewsPage() {
    const articles = useSelector((state: RootState) => state.articles.data);
    const areArticlesLoading = useSelector(
        (state: RootState) => state.articles.loading
    );
    const navItem = useSelector((state: RootState) =>
        state.navigation.items.find((item) => item.type === 'news')
    )!;
    const dispatch = useDispatch();
    const isFetchingAllowed =
        navItem.selectedAt - navItem.updatedAt > cacheTimeoutMillis;

    setGraphQLResultFromRemote<Article>(
        (result) => {
            dispatch(setArticles(result.data));
            dispatch(setLoaded('news'));
        },
        articlesQuery,
        isFetchingAllowed
    );

    const [forCuriousSectionShown, setForCuriousSectionShown] = useState(false);

    if (areArticlesLoading) {
        return <DefaultProgressBar />;
    }

    const mainContent = (
        <>
            <section>
                <h1 className={styles.h1}>
                    За відновленням здоров’я – до бджілок у Глибоцьку ОТГ!
                </h1>
                <p>
                    Свій варіант «молочних рік – кисільних берегів», які
                    пам’ятаємо з дитячих казок, втілюють на Глибоччині.
                    Тільки-от ріки тут – медові, а береги – сирні. Їх продукують
                    креативні підприємці в Глибоцькій ОТГ.
                </p>
                <p>
                    Про успішну кооперативну сироварню в с. Михайлівка, яке
                    разом з іншими 5-ма селами входить до ОТГ з понад
                    13,5-тисячним населенням, «Версії» вже писали неодноразово.
                    А в тій же Михайлівці від весни 2018-го працює центр
                    апітерапії!
                </p>

                <img
                    src={getImagePath('news1.jpg')}
                    alt=""
                    className={styles.centeredImage}
                />
                <blockquote cite="https://lviv.kozyavkin.com/ukr/apitherapy">
                    Апітерапія – дослівно: лікування продуктами бджільництва.
                    (лікування прополісом, пергою, маточним молочком, бджолиним
                    підмором тощо, а також сон на вуликах)
                </blockquote>
                <p>
                    Михайлівський апітерапевтичний оздоровчий комплекс МИВІРА
                    відкрився 6 травня 2018 року в рамках програми сталого
                    розвитку Чернівецької області за підтримки Австрійської
                    Агенції Розвитку, програми розвитку ООН в Україні та
                    фізичної-особи підприємця Михайла Баловсяка.
                </p>
                <img
                    src={getImagePath('news2.jpg')}
                    alt=""
                    className={styles.centeredImage}
                />
                <p>
                    Пан Михайло разом з дружиною Вірою займалися бджільництвом
                    раніше. Але одна справа – просто розводити бджіл і продавати
                    мед, а зовсім інша – надавати послугу. Тож пані Віра з
                    усмішкою розповідає, як вони, пишучи бізнес-план для
                    грантодавця, і самі розширили свої знання з бджільництва:
                </p>
                <img
                    src={getImagePath('news3.jpg')}
                    alt=""
                    className={styles.centeredImage}
                />
                <blockquote>
                    Консультувалися у лікарів, які надали експертні пояснення
                    щодо ефективності методу апітерапії. Наприклад, процедура
                    «сон на вулику» стає результативною щонайменше через 5-7
                    щоденних 3-годинних повторень. Це не пігулка, яка подіє
                    миттєво, це реабілітація – в тому числі, від стресу. Тож
                    тепер сюди приїздять цілими родинами, часом – на тиждень.
                    Бувають екскурсії, школярів привозять подивитися на бджілок
                    і на музей.
                </blockquote>
                <p>
                    Так-так, у Баловсяків у їхньому центрі апітерапії є і
                    кімната-музей, у якій зберігаються і старовинні, і сучасні
                    експонати-інструменти догляду за бджілками.
                </p>
                <img
                    src={getImagePath('news4.jpg')}
                    alt=""
                    className={styles.centeredImage}
                />
                <p>
                    А власне для лікування використовуються один п’ятимісний,
                    два одномісні будиночки та три піраміди із 10-ма лежанками,
                    куди люди зможуть прийти, полежати кілька годин, або
                    переночувати. Під лежаками живуть 40 сімей бджіл, які і є
                    цілителями.
                </p>
                <img
                    src={getImagePath('news5.jpg')}
                    alt=""
                    className={styles.centeredImage}
                />
                <p>
                    Господарі апі-центру з посиланням на медиків стверджують, що
                    бджолині вібрації позитивно впливають на всі процеси в
                    організмі: на дихальну, нервову системи, опорно-руховий
                    апарат,. Апітерапія корисна діабетикам та не має
                    протипоказань. Навіть алергіки можуть скористатись послугою
                    сну на вулику, оскільки жодного прямого контакту ні з медом,
                    ні з бджолами, ні з продуктами їх життєдіяльності немає.
                </p>

                <img
                    src={getImagePath('news6.jpg')}
                    alt=""
                    className={styles.float}
                    style={{ maxWidth: 183, maxHeight: 201 }}
                />
                <p>
                    Будиночки, каже пан Михайло, збудовані з натуральних
                    матеріалів, пофарбовані фарбами на водяній основі. Жодної
                    хімії!
                </p>
                <p>
                    У центрі п’ятимісного будиночку – великий круглий стіл, який
                    увінчує самовар, і для гостей трав’яний чай з медом особливо
                    смакує з гарних глиняних чашок. Ну і не лише чаєм тут
                    пригощають – продукти бджільництва надають особливого
                    присмаку і міцнішим напоям. Вартість години «сну на бджолах»
                    – 40 грн, ніч коштує 250 грн.
                </p>
                <p className={styles.clearFloat}>
                    Господарі центру випробували дію оригінальної терапії на
                    собі, та й онуки їхні, які приїздять до бабусі з дідусем на
                    вихідні, також люблять поспати під бджолиний гул – для них є
                    спеціальне маленьке ліжечко, в якому дитина може спати хоч
                    цілу ніч.
                </p>
                <img
                    src={getImagePath('news7.jpg')}
                    alt=""
                    className={`${styles.centeredImage}`}
                />
                <div className={styles.lastParagraph}>
                    Голова Глибоцької об’єднаної тергромади Григорій Ванзуряк
                    замахнувся на більше в розвитку громади, яку очолює: планує
                    на території громади повноцінний агротуристичний кластер. І
                    власний успіх не відділяє від успіху своєї ОТГ:
                    <blockquote>
                        <p>
                            – Якщо в кожному дворі житиме підприємець, котрий
                            зароблятиме собі і організує роботу найманим
                            працівникам, тоді я можу вважати себе найуспішнішим
                            головою в Україні. А поки що Баловсяки у Михайлівці
                            уже ефективно втілюють його і свою мрію!
                        </p>
                        <cite>Маріанна АНТОНЮК, «Версії»</cite>
                    </blockquote>
                </div>
            </section>
            <ArticlesComponent
                articles={articles}
                forCuriousClick={() => {
                    setForCuriousSectionShown(true);
                }}
            />
        </>
    );

    return (
        <main className={styles.main}>
            {mainContent}
            <ForCurious
                isVisible={forCuriousSectionShown}
                onCloseClick={() => {
                    setForCuriousSectionShown(false);
                }}
            />
        </main>
    );
}
