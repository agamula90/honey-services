import Navigation from './Navigation';
import Banner, { BannerState, MoveDirection } from './Banner';
import ContactUs from './ContactUs';
import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import ContentItems, { ContentItemDTO } from './ContentItems';
import Aside, { AsideItem } from './Aside';

const getContentItems = function getContentItems(): Array<ContentItemDTO> {
  return [
    {
      text: 'Що ж таке апітерапія? Дослівно апітерапія означає лікування продуктами бджільництва. Тобто це не тільки сон на вуликах, а ще й лікування прополісом, пергою, маточним молочком, бджолиним підмором тощо.',
      imageUrl: 'content1.jpg',
      imageDescription: 'Бджоли готові зігріти своїм теплом',
    },
    {
      text: 'Апітерапію офіційна медицина визнала не так давно: у 1959 році. Саме тоді виникло й поняття апітерапевт. Не кожен пасічник є апітерапевтом, для цього потрібні грунтовні знання у сфері медицини, зокрема неврології та фізіотерапії.',
      imageUrl: 'content2.jpg',
      imageDescription:
        'Апібудинки як місце для відпочинку як для великих, так і для самих менших',
    },
    {
      text: 'Сон на вуликах не є панацеєю від усіх хвороб, проте має значний вплив у лікуванні дихальної системи, суглобів і опорно рухового апарату, нервової та психічної систем. Комплексний вплив всіх елементів апітерапії має накопичувальний ефект, тобто щоб отримати відчутний результат потрібно спати на вулику принаймні 10 ночей.',
      imageUrl: 'content3.jpg',
      imageDescription: 'Апібудинки як місце для усамітнення',
    },
  ];
};

const getAsideItems = function getAsideItems(): Array<AsideItem> {
  return [
    {
      text: 'Продаж та дегустація меду, крем меду та медових десертів. Також в нас широкий вибір подарункових наборів  на різний бюджет.',
      imageUrl: 'aside1.jpg',
      imageDescription: 'Медові вироби і ціни приємно вас здивують',
    },
    {
      text:
        'Екскурсії для дітей та дорослих: Ви познайомитеся з особливостями життєдіяльності бджолиної сім"ї, з інструментами пасічника, побачите як викачують мед та відвідаєте музей бджільництва та старожитностей. Музей розташований на двох поверхах і має чимало тематичних відділів: інструменти пасічника, вулики, медогонки, експонати побуту попередніх поколінь, вишиванки та вишиті картини, колекція вишитих рушників та багато іншого.\n' +
        '\n' +
        '  У вартість екскурсії входить дегустація меду з травяним чаєм і печивом. ',
      imageUrl: 'aside2.jpg',
      imageDescription: 'Поповніть свої знання про бджілок і не тільки...',
    },
  ];
};

const fetchContentItems = async (
  abortSignal?: AbortSignal
): Promise<Array<ContentItemDTO>> => {
  return new Promise<Array<ContentItemDTO>>((resolve) => {
    setTimeout(() => {
      resolve(getContentItems());
    }, 4000);
  });
};

const fetchAsideItems = async (
  abortSignal?: AbortSignal
): Promise<Array<AsideItem>> => {
  return new Promise<Array<AsideItem>>((resolve) => {
    setTimeout(() => {
      resolve(getAsideItems());
    }, 4000);
  });
};

let intervalId;
const countBanners = 5;

export default function App() {
  const [navIndex, setNavIndex] = useState(0);
  const [bannerState, setBannerState] = useState<BannerState>({
    currentItemIndex: 0,
    autoMoveEnabled: true,
    resumeAutoMove: false,
    moveDirection: 'right',
  });
  const contentItems = useAsync(fetchContentItems, []);
  const asideItems = useAsync(fetchAsideItems, []);

  useEffect(() => {
    if (bannerState.autoMoveEnabled) {
      if (bannerState.moveDirection == 'right') {
        doMoveNext(bannerState.currentItemIndex, (index) => {
          setBannerState({ ...bannerState, currentItemIndex: index });
        });
      } else {
        doMovePrevious(bannerState.currentItemIndex, (index) => {
          setBannerState({ ...bannerState, currentItemIndex: index });
        });
      }
    } else if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (bannerState.resumeAutoMove) {
      setBannerState({ ...bannerState, resumeAutoMove: false });
    }

    const handleBannerAutoMove = () => {
      const autoMoveEnabled = window.scrollY < 1;
      if (autoMoveEnabled != bannerState.autoMoveEnabled) {
        setBannerState({ ...bannerState, autoMoveEnabled });
      }
    };
    window.addEventListener('scroll', handleBannerAutoMove);
    return () => {
      clearInterval(intervalId);
      intervalId = null;
      window.removeEventListener('scroll', handleBannerAutoMove);
    };
  }, [bannerState]);

  if (contentItems.loading) {
    return 'Data loading... Please, wait...';
  }
  if (contentItems.error) {
    return `Error occurred: ${contentItems.error.message}`;
  }

  return (
    <>
      <header>
        <Navigation navIndex={navIndex} onNavIndexChanged={setNavIndex} />
      </header>
      <div className="main">
        <Banner
          bannerState={bannerState}
          countBanners={countBanners}
          onManualMove={() => {
            const moveDirection: MoveDirection =
              bannerState.moveDirection === 'right' ? 'left' : 'right';
            setBannerState({
              ...bannerState,
              resumeAutoMove: true,
              moveDirection,
            });
          }}
        />
        <ContentItems contentItems={contentItems.result} />

        <Aside asideItems={asideItems.result} />
      </div>
      <footer>
        <h2>Михайлівський апітерапевтичний оздоровчий центр запрошує Вас</h2>
        <hr />
        <ContactUs />
      </footer>
    </>
  );
}

function doMovePrevious(currentItemIndex, onItemChanged) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (currentItemIndex === 0) {
      currentItemIndex = countBanners - 1;
    } else {
      currentItemIndex--;
    }
    onItemChanged(currentItemIndex);
  }, 3000);
}

function doMoveNext(currentItemIndex, onItemChanged) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (currentItemIndex === countBanners - 1) {
      currentItemIndex = 0;
    } else {
      currentItemIndex++;
    }
    onItemChanged(currentItemIndex);
  }, 3000);
}
