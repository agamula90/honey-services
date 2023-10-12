import React, { useState } from 'react';

export type BannerDTO = {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  phoneImageUrl: string;
  phoneImageWidth: number;
  phoneImageHeight: number;
  imageAlternateText: string;
};

export type MoveDirection = 'left' | 'right';
export type BannerState = {
  currentItemIndex: number;
  resumeAutoMove: boolean,
  autoMoveEnabled: boolean;
  moveDirection: MoveDirection;
};

export default function Banner({
  bannerState,
  banners,
  onManualMove,
}: {
  bannerState: BannerState;
  banners: Array<BannerDTO>;
  onManualMove;
}) {
  const firstItemIndex = bannerState.currentItemIndex;
  const moveNext = bannerState.moveDirection == 'right'
  const secondItemIndex = moveNext
    ? (bannerState.currentItemIndex + 1 + banners.length) % banners.length
    : (bannerState.currentItemIndex - 1 + banners.length) % banners.length;
  const firstItemPath = getBannerPathByIndex(firstItemIndex);
  const secondItemPath = getBannerPathByIndex(secondItemIndex);
  const firstItemBackground = `url(${firstItemPath}) no-repeat 50%/100%`;
  const secondItemBackground = `url(${secondItemPath}) no-repeat 50%/100%`;

  return (
    <div id="slider">
      <div
        key={firstItemIndex}
        style={{ background: firstItemBackground }}
        className="slider-image active"
      ></div>
      <div
        key={secondItemIndex}
        style={{ background: secondItemBackground }}
        className="slider-image"
      ></div>
      <div
        className="previous-arrow"
        onClick={() => {
          if (moveNext) onManualMove();
        }}
      ></div>
      <div
        className="next-arrow"
        onClick={() => {
          if (!moveNext) onManualMove();
        }}
      ></div>
      <section>
        <h1>Бджолиний рай в селі Михайлівка</h1>
        <p>
          Апітерапія, сон на вулику, продаж бджолопродуктів, екскурсії,
          дегустація меду.
        </p>
      </section>
    </div>
  );
}

function getBannerPathByIndex(index) {
  const isSmallScreen = window.innerWidth < 450;
  const s3Prefix =
    'https://elasticbeanstalk-eu-central-1-306070261283.s3.eu-central-1.amazonaws.com/public';
  return `${s3Prefix}/banner${index + 1}${isSmallScreen ? '_narrow' : ''}.jpg`;
}
