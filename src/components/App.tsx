import Navigation from './Navigation';
import React, { useState } from 'react';
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
  </header>;

  switch (navIndex) {
    case 0: {
      return <>
        {navHeader}
        <MainPage />
      </>;
    }
    case 1: {
      return <>
        {navHeader}
        <NewsPage />
      </>;
    }
    case 2: {
      return <>
        {navHeader}
        <ProductsPage />
      </>;
    }
    case 3: {
      return <>
        {navHeader}
        <ServicesPage />
      </>;
    }
    case 4: {
      return <>
        {navHeader}
        <AboutUsPage />
      </>;
    }
    case 5: {
      return <>
        {navHeader}
        <ContactsPage />
      </>;
    }
  }
}