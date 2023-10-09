import React from "react";

export type BannerItem = {
    imageUrl: string,
    imageWidth: number,
    imageHeight: number,
    phoneImageUrl: string,
    phoneImageWidth: number,
    phoneImageHeight: number,
    imageAlternateText: string
}

export default function Banner({currentItemIndex, moveNext, banners, onManualMove}) {
    const firstItemIndex = currentItemIndex;
    const secondItemIndex = moveNext ? (currentItemIndex + 1 + banners.length) % banners.length : (currentItemIndex - 1 + banners.length) % banners.length;
    const firstItemPath = getBannerPathByIndex(firstItemIndex);
    const secondItemPath = getBannerPathByIndex(secondItemIndex);
    const firstItemBackground = `url(${firstItemPath}) no-repeat 50%/100%`;
    const secondItemBackground = `url(${secondItemPath}) no-repeat 50%/100%`

    return (
        <div id="slider">
            <div key={firstItemIndex}
                 style={{background: firstItemBackground }}
                 className="slider-image active"
            ></div>
            <div key={secondItemIndex}
                 style={{background: secondItemBackground }}
                 className="slider-image"
            ></div>
            <div className="previous-arrow" onClick={() => {
                if (moveNext) onManualMove();
            }}></div>
            <div className="next-arrow" onClick={() => {
                if (!moveNext) onManualMove()
            }}></div>
            <section>
                <h1>Бджолиний рай в селі Михайлівка</h1>
                <p>Апітерапія, сон на вулику, продаж бджолопродуктів, екскурсії, дегустація меду.</p>
            </section>
        </div>
    )
};

function getBannerPathByIndex(index) {
    const isSmallScreen = window.innerWidth < 450;
    return `public/banner${index + 1}${isSmallScreen ? '_narrow' : ''}.jpg`;
}