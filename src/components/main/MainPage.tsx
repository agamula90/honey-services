import Banner from './Banner';
import { contentItemsQuery } from './contentItemsSlice';
import Aside from './Aside';
import ContactUs from '../ContactUs';
import React, { useEffect } from 'react';
import '../style.css';
import '../banner.css';
import '../layout.css';
import '../nav-arrows.css';
import styles from './main.module.css';
import DefaultProgressBar from '../DefaultProgressBar';
import { setGraphQLResultFromRemote } from '../../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { cacheTimeoutMillis, RootState } from '../../store';
import { asideItemsQuery } from './asideItemsSlice';
import { ContentItem } from './contentItems';
import { set as setContentItems } from './contentItemsSlice';
import { set as setAsideItems } from './asideItemsSlice';
import { setLoaded } from '../navigationSlice';
import { AsideItem } from './asideItems';
import ContentItemsComponent from './ContentItemsComponent';

export default function MainPage() {
    const contentItems = useSelector(
        (state: RootState) => state.contentItems.data
    );
    const asideItems = useSelector((state: RootState) => state.asideItems.data);
    const contentItemsLoading = useSelector(
        (state: RootState) => state.contentItems.loading
    );
    const asideItemsLoading = useSelector(
        (state: RootState) => state.asideItems.loading
    );
    const navItem = useSelector((state: RootState) =>
        state.navigation.items.find((item) => item.type === 'main')
    )!;
    const dispatch = useDispatch();
    const isFetchingAllowed =
        navItem.selectedAt - navItem.updatedAt > cacheTimeoutMillis;

    setGraphQLResultFromRemote<ContentItem>(
        (result) => {
            dispatch(setContentItems(result.data));
        },
        contentItemsQuery,
        isFetchingAllowed
    );
    setGraphQLResultFromRemote<AsideItem>(
        (result) => {
            dispatch(setAsideItems(result.data));
        },
        asideItemsQuery,
        isFetchingAllowed
    );
    useEffect(() => {
        if (!contentItemsLoading && !asideItemsLoading) {
            dispatch(setLoaded('main'));
        }
    }, [contentItemsLoading, asideItemsLoading]);

    if (contentItemsLoading || asideItemsLoading) {
        return <DefaultProgressBar />;
    }

    return (
        <>
            <main className={styles.main}>
                <Banner />
                <ContentItemsComponent contentItems={contentItems} />
                <Aside asideItems={asideItems} />
            </main>
            <ContactUs />
        </>
    );
}
