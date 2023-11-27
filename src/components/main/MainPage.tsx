import {AsideItem, ContentItem, contentItemsQuery, supplementaryContentItemsQuery} from './mocks';
import Banner from './Banner';
import ContentItems from './ContentItems';
import Aside from './Aside';
import ContactUs from '../ContactUs';
import React from 'react';
import '../style.css';
import '../banner.css';
import '../layout.css';
import '../nav-arrows.css';
import styles from './main.module.css';
import DefaultProgressBar from '../DefaultProgressBar';
import {useQueryWithCache} from "../../utilities";

export default function MainPage() {
  const contentItems = useQueryWithCache<ContentItem[]>(contentItemsQuery);
  const asideItems = useQueryWithCache<AsideItem[]>(supplementaryContentItemsQuery);

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
        <Banner />
        <ContentItems contentItems={contentItems.data} />
        <Aside asideItems={asideItems.data} />
      </main>
      <ContactUs />
    </>
  );
}
