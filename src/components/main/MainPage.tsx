import {AsideItem, ContentItem, contentItemsQuery, supplementaryContentItemsQuery} from './mocks';
import Banner, { BannerState, MoveDirection } from './Banner';
import ContentItems from './ContentItems';
import Aside from './Aside';
import ContactUs from '../ContactUs';
import React, { useEffect, useState } from 'react';
import '../style.css';
import '../banner.css';
import '../layout.css';
import '../nav-arrows.css';
import styles from './main.module.css';
import DefaultProgressBar from '../DefaultProgressBar';
import {useQueryWithCache} from "../../utilities";

let intervalId: NodeJS.Timeout | null;

const countBanners = 5;
export default function MainPage() {
  const [bannerState, setBannerState] = useState<BannerState>({
    currentItemIndex: 0,
    moveDirection: 'right',
  });
  const contentItems = useQueryWithCache<ContentItem[]>(contentItemsQuery);
  const asideItems = useQueryWithCache<AsideItem[]>(supplementaryContentItemsQuery);

  useEffect(() => {
    intervalId = setInterval(() => {
      const autoMoveEnabled = window.scrollY < 1;
      if (autoMoveEnabled) {
        if (bannerState.moveDirection == 'right') {
          doMoveNext(bannerState.currentItemIndex, (index: number) => {
            setBannerState({ ...bannerState, currentItemIndex: index });
          });
        } else {
          doMovePrevious(bannerState.currentItemIndex, (index: number) => {
            setBannerState({ ...bannerState, currentItemIndex: index });
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

  if (contentItems.loading || asideItems.loading) {
    return <DefaultProgressBar />;
  }
  if (contentItems.error) {
    return `Error occurred: ${contentItems.error}`;
  }
  if (asideItems.error) {
    return `Error occurred: ${asideItems.error}`;
  }
  if (!contentItems.data) {
    return "Content items not found";
  }
  if (!asideItems.data) {
    return "Aside items not found";
  }

  return (
    <>
      <main className={styles.main}>
        <Banner
          bannerState={bannerState}
          countBanners={countBanners}
          onManualMove={() => {
            const moveDirection: MoveDirection =
              bannerState.moveDirection === 'right' ? 'left' : 'right';
            setBannerState({
              ...bannerState,
              moveDirection,
            });
          }}
        />
        <ContentItems contentItems={contentItems.data} />
        <Aside asideItems={asideItems.data} />
      </main>
      <ContactUs />
    </>
  );
}

function doMovePrevious(currentItemIndex: number, onItemChanged: (arg: number) => void) {
  if (currentItemIndex === 0) {
    currentItemIndex = countBanners - 1;
  } else {
    currentItemIndex--;
  }
  onItemChanged(currentItemIndex);
}

function doMoveNext(currentItemIndex: number, onItemChanged: (arg: number) => void) {
  if (currentItemIndex === countBanners - 1) {
    currentItemIndex = 0;
  } else {
    currentItemIndex++;
  }
  onItemChanged(currentItemIndex);
}
