import React, { useEffect, useState } from 'react';
import { getImagePath } from '../../utilities';

export type MoveDirection = 'left' | 'right';

export interface BannerState {
    currentImageIndex: number;
    images: string[];
    moveDirection: MoveDirection;
}

let intervalId: NodeJS.Timeout | null;

export default function Banner() {
    const [bannerState, setBannerState] = useState<BannerState>({
        currentImageIndex: 0,
        moveDirection: 'right',
        images: Array(5)
            .fill(null)
            .map((_, index: number) => getBannerPathByIndex(index)),
    });

    useEffect(() => {
        intervalId = setInterval(() => {
            const autoMoveEnabled = window.scrollY < 1;
            if (autoMoveEnabled) {
                const currentImageIndex = bannerState.currentImageIndex;
                if (bannerState.moveDirection == 'right') {
                    setBannerState({
                        ...bannerState,
                        currentImageIndex: getNextIndex(
                            currentImageIndex,
                            bannerState.images
                        ),
                    });
                } else {
                    setBannerState({
                        ...bannerState,
                        currentImageIndex: getPreviousIndex(
                            currentImageIndex,
                            bannerState.images
                        ),
                    });
                }
            }
        }, 3000);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            intervalId = null;
        };
    }, [bannerState]);

    const foregroundImageIndex = bannerState.currentImageIndex;
    const moveNext = bannerState.moveDirection == 'right';
    const backgroundImageIndex = moveNext
        ? (bannerState.currentImageIndex + 1 + bannerState.images.length) %
          bannerState.images.length
        : (bannerState.currentImageIndex - 1 + bannerState.images.length) %
          bannerState.images.length;
    const foregroundImageBackground = `url(${bannerState.images[foregroundImageIndex]}) no-repeat 50%/100%`;
    const backgroundImageBackground = `url(${bannerState.images[backgroundImageIndex]}) no-repeat 50%/100%`;

    return (
        <div id="slider">
            <div
                key={foregroundImageIndex}
                style={{ background: foregroundImageBackground }}
                className="active slider-image"
            ></div>
            <div
                key={backgroundImageIndex}
                style={{ background: backgroundImageBackground }}
                className="slider-image"
            ></div>
            <div
                className="previous-arrow"
                onClick={() => {
                    setBannerState({
                        ...bannerState,
                        moveDirection: 'left',
                        currentImageIndex: getPreviousIndex(
                            bannerState.currentImageIndex,
                            bannerState.images
                        ),
                    });
                }}
            ></div>
            <div
                className="next-arrow"
                onClick={() => {
                    setBannerState({
                        ...bannerState,
                        moveDirection: 'right',
                        currentImageIndex: getNextIndex(
                            bannerState.currentImageIndex,
                            bannerState.images
                        ),
                    });
                }}
            ></div>
            <section>
                <h1>Бджолиний рай в селі Михайлівка</h1>
                <p>
                    Апітерапія, сон на вулику, продаж бджолопродуктів,
                    екскурсії, дегустація меду.
                </p>
            </section>
        </div>
    );
}

function getPreviousIndex(index: number, images: string[]) {
    if (index > 0) {
        return index - 1;
    }
    if (index < 0) {
        throw new Error('Base index is out of allowed range');
    }
    return images.length - 1;
}

function getNextIndex(index: number, images: string[]) {
    if (index < images.length - 1) {
        return index + 1;
    }
    if (index >= images.length) {
        throw new Error('Base index is out of allowed range');
    }
    return 0;
}

function getBannerPathByIndex(index: number) {
    const isSmallScreen = window.innerWidth < 450;
    return getImagePath(
        `banner${index + 1}${isSmallScreen ? '_narrow' : ''}.jpg`
    );
}
