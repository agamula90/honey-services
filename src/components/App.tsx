import Navigation from './Navigation';
import React from 'react';
import MainPage from './main/MainPage';
import NewsPage from './news/NewsPage';
import ProductsPage from './products/ProductsPage';
import ServicesPage from './services/ServicesPage';
import AboutUsPage from './about/AboutUsPage';
import ContactsPage from './contacts/ContactsPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActive } from './navigationSlice';

export default function App() {
    const navItems = useSelector((state: RootState) =>
        state.navigation.items.map((item) => item.type)
    );
    const currentItemType = useSelector(
        (state: RootState) => state.navigation.currentItemType
    );
    const navIndex = navItems.indexOf(currentItemType);
    const dispatch = useDispatch();

    const navHeader = (
        <header>
            <Navigation
                navItems={navItems}
                navIndex={navIndex}
                onNavIndexChanged={(index) =>
                    dispatch(setActive(navItems[index]))
                }
            />
        </header>
    );

    switch (navIndex) {
        case 0: {
            return (
                <>
                    {navHeader}
                    <MainPage />
                </>
            );
        }
        case 1: {
            return (
                <>
                    {navHeader}
                    <NewsPage />
                </>
            );
        }
        case 2: {
            return (
                <>
                    {navHeader}
                    <ProductsPage />
                </>
            );
        }
        case 3: {
            return (
                <>
                    {navHeader}
                    <ServicesPage />
                </>
            );
        }
        case 4: {
            return (
                <>
                    {navHeader}
                    <AboutUsPage />
                </>
            );
        }
        case 5: {
            return (
                <>
                    {navHeader}
                    <ContactsPage />
                </>
            );
        }
    }
}
