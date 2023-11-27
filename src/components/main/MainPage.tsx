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
import {useGraphQLQuery} from "../../utilities";

export default function MainPage() {
  const contentItems = useGraphQLQuery<ContentItem>(contentItemsQuery);
  const asideItems = useGraphQLQuery<AsideItem>(supplementaryContentItemsQuery);
  if (asideItems.loading || contentItems.loading) {
    return <DefaultProgressBar />;
  }
  if (asideItems.error) {
    return `Error occurred when aside items loading: ${asideItems.error}`;
  }
  if (contentItems.error) {
    return `Error occurred when content items loading: ${contentItems.error}`;
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
