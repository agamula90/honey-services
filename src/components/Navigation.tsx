import React from 'react';

export default function Navigation({navItems, navIndex, onNavIndexChanged}: {
    navItems: Array<String>,
    navIndex: number,
    onNavIndexChanged: Function
}) {
    return (
        <nav>
            {navItems.map((item, index) => {
                if (index === navIndex) {
                    return (
                        <div key={index} className="active">
                            {item}
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
                            {item}{' '}
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
    onNavIndexChanged: Function
) {
    e.preventDefault();
    onNavIndexChanged(newNavIndex);
}
