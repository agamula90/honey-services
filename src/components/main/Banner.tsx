import React from 'react';
import { getImagePath } from "../../utilities";

export type MoveDirection = 'left' | 'right';
export type BannerState = {
  currentItemIndex: number;
  resumeAutoMove: boolean,
  autoMoveEnabled: boolean;
  moveDirection: MoveDirection;
};

export default function Banner({
  bannerState,
  countBanners,
  onManualMove,
}: {
  bannerState: BannerState;
  countBanners: number;
  onManualMove: Function;
}) {
  const firstItemIndex = bannerState.currentItemIndex;
  const moveNext = bannerState.moveDirection == 'right'
  const secondItemIndex = moveNext
    ? (bannerState.currentItemIndex + 1 + countBanners) % countBanners
    : (bannerState.currentItemIndex - 1 + countBanners) % countBanners;
  const firstItemPath = getBannerPathByIndex(firstItemIndex);
  const secondItemPath = getBannerPathByIndex(secondItemIndex);
  const firstItemBackground = `url(${firstItemPath}) no-repeat 50%/100%`;
  const secondItemBackground = `url(${secondItemPath}) no-repeat 50%/100%`;

  return (
    <div id="slider">
      <div
        key={firstItemIndex}
        style={{ background: firstItemBackground }}
        className="active slider-image"
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

function getBannerPathByIndex(index: number) {
  const isSmallScreen = window.innerWidth < 450;
  return getImagePath(`banner${index + 1}${isSmallScreen ? '_narrow' : ''}.jpg`);
}
