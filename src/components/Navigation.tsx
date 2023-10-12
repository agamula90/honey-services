import React from 'react';

export default function Navigation({ navItems, navIndex, onNavIndexChanged }) {
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
  e: Event,
  newNavIndex: number,
  onNavIndexChanged: Function
) {
  e.preventDefault();
  onNavIndexChanged(newNavIndex);
}
