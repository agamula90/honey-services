import Navigation from './Navigation';
import Banner, { BannerState, MoveDirection } from './main/Banner';
import ContactUs from './ContactUs';
import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import ContentItems from './main/ContentItems';
import Aside from './main/Aside';
import { fetchAsideItems, fetchContentItems } from "./main/mocks";
import MainPage from "./main/MainPage";
import NewsPage from "./news/NewsPage";
import ProductsPage from "./products/ProductsPage";
import ServicesPage from "./services/ServicesPage";
import AboutUsPage from "./about/AboutUsPage";
import ContactsPage from "./contacts/ContactsPage";

export default function App() {
  const [navIndex, setNavIndex] = useState(0);
  const navItems = [
    'Головна',
    'Новини',
    'Продукція',
    'Послуги',
    'Про нас',
    'Контакти',
  ];

  const navHeader = <header>
    <Navigation navItems={navItems} navIndex={navIndex} onNavIndexChanged={setNavIndex}/>
  </header>

  switch (navIndex) {
    case 0: {
      return <>
        {navHeader}
        <MainPage />
      </>
    }
    case 1: {
      return <>
        {navHeader}
        <NewsPage />
      </>
    }
    case 2: {
      return <>
        {navHeader}
        <ProductsPage />
      </>
    }
    case 3: {
      return <>
        {navHeader}
        <ServicesPage />
      </>
    }
    case 4: {
      return <>
        {navHeader}
        <AboutUsPage />
      </>
    }
    case 5: {
      return <>
        {navHeader}
        <ContactsPage />
      </>
    }
  }
}