import React from 'react';
import { getNavItemTitle, NavigationItemType } from './navigationSlice';

export default function Navigation({
    navItems,
    navIndex,
    onNavIndexChanged,
}: {
    navItems: NavigationItemType[];
    navIndex: number;
    onNavIndexChanged: (index: number) => void;
}) {
    return (
        <nav>
            {navItems.map((item, index) => {
                if (index === navIndex) {
                    return (
                        <div key={index} className="active">
                            {getNavItemTitle(item)}
                        </div>
                    );
                } else {
                    return (
                        <a
                            key={index}
                            href=""
                            onClick={(e) => {
                                setNavIndex(e, index, onNavIndexChanged);
                            }}
                        >
                            {getNavItemTitle(item)}{' '}
                        </a>
                    );
                }
            })}
        </nav>
    );
}

function setNavIndex(
    e: React.MouseEvent,
    newNavIndex: number,
    onNavIndexChanged: (index: number) => void
) {
    e.preventDefault();
    onNavIndexChanged(newNavIndex);
}
