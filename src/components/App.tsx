import Navigation from "./Navigation";
import Banner, {BannerItem} from "./Banner";
import ContactUs from "./ContactUs";
import React, {useEffect, useState} from "react";
import {useAsync} from "react-async-hook";

const getBannerItems = function getBannerItems(): Array<BannerItem> {
    return [
        {
            imageUrl: "img/banner1.jpg",
            imageWidth: 923,
            imageHeight: 450,
            imageAlternateText: "Апібудинки в очікуванні гостей",
            phoneImageUrl: "img/banner1_narrow.jpg",
            phoneImageWidth: 410,
            phoneImageHeight: 200
        },
        {
            imageUrl: "img/banner2.jpg",
            imageWidth: 751,
            imageHeight: 450,
            imageAlternateText: "Апібудинки пригощають",
            phoneImageUrl: "img/banner2_narrow.jpg",
            phoneImageWidth: 334,
            phoneImageHeight: 200
        },
        {
            imageUrl: "img/banner3.jpg",
            imageWidth: 1098,
            imageHeight: 450,
            imageAlternateText: "Бджола у пошуках сот",
            phoneImageUrl: "img/banner3_narrow.jpg",
            phoneImageWidth: 488,
            phoneImageHeight: 200
        },
        {
            imageUrl: "img/banner4.jpg",
            imageWidth: 1011,
            imageHeight: 450,
            imageAlternateText: "Апібудинки виросли",
            phoneImageUrl: "img/banner4_narrow.jpg",
            phoneImageWidth: 449,
            phoneImageHeight: 200
        },
        {
            imageUrl: "img/banner5.jpg",
            imageWidth: 600,
            imageHeight: 450,
            imageAlternateText: "Підйом апібудинків до сніданку",
            phoneImageUrl: "img/banner5_narrow.jpg",
            phoneImageWidth: 267,
            phoneImageHeight: 200
        }
    ];
}

const banners = getBannerItems()

const fetchBannerItems = async (abortSignal?: AbortSignal): Promise<Array<BannerItem>> => {
    return new Promise<Array<BannerItem>>(resolve => {
        setTimeout(() => {
            resolve(banners);
        }, 4000)
    });
}

let intervalId

export default function App() {
    const bannerItems = useAsync(fetchBannerItems, []);
    const [bannerIndex, setBannerIndex] = useState(0);
    const [navIndex, setNavIndex] = useState(0);
    const [moveNext, onMoveNextChanged] = useState(true);
    const [manualMove, onManualMoveChanged] = useState(false);
    useEffect(() => {
        if (moveNext) {
            doMoveNext(bannerIndex, (index) => {
                setBannerIndex(index)
            });
        } else {
            doMovePrevious(bannerIndex, (index) => {
                setBannerIndex(index)
            });
        }
        onManualMoveChanged(false);
    }, [moveNext, manualMove]);

    if (bannerItems.loading) {
        return "Data loading... Please, wait...";
    }
    if (bannerItems.error) {
        return `Error occured: ${bannerItems.error.message}`;
    }

    return (
        <div>
            <header>
                <Navigation navIndex={navIndex} onNavIndexChanged={setNavIndex}/>
            </header>
            <main>
                <Banner moveNext={moveNext}
                        currentItemIndex={bannerIndex}
                        banners={banners}
                        onManualMove={() => {
                            onMoveNextChanged(!moveNext);
                            onManualMoveChanged(true);
                        }}/>
                <article>
                    <h2>Апітерапія - нове слово в сфері оздоровлення</h2>
                    <p>
                        Монотонне гудіння бджіл та їх природнє тепло розслаблююче діють на весь організм людини, і за
                        рахунок цього
                        всього за чотири години Ви повністю відпочинете.
                    </p>
                    <p>
                        Запрошуємо відчути на собі цілющу дію бджолиних сімей!
                    </p>
                </article>
                <aside>
                    <h2>А що крім апітерапії?</h2>
                    <p>Михайлівський апітерапевтичний оздоровчий комплекс пропонує також:</p>
                </aside>
            </main>
            <footer>
                <h2>Михайлівський апітерапевтичний оздоровчий центр запрошує Вас</h2>
                <ContactUs/>
            </footer>
        </div>
    );
}

function doMovePrevious(currentItemIndex, onItemChanged) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (currentItemIndex === 0) {
            currentItemIndex = banners.length - 1;
        } else {
            currentItemIndex--;
        }
        onItemChanged(currentItemIndex);
    }, 3000);
}

function doMoveNext(currentItemIndex, onItemChanged) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (currentItemIndex === banners.length - 1) {
            currentItemIndex = 0;
        } else {
            currentItemIndex++;
        }
        onItemChanged(currentItemIndex);
    }, 3000);
}