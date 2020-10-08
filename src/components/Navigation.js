import React, { useEffect } from "react";

export default function SimpleBottomNavigation({
  category,
  currentNavIndex,
  isNavActive,
}) {
  const elem = document.getElementById(`nav-header-${currentNavIndex}`);
  useEffect(() => {
    // const elem = document.getElementById(`nav-header-${currentNavIndex}`);
    if (isNavActive && elem) {
      elem.focus();
      elem.scrollIntoView(true);
    }
  }, [currentNavIndex, elem, isNavActive]);

  return (
    <div className="nav-header">
      {category.map((v, i) => (
        <button
          key={i}
          id={`nav-header-${i}`}
          nav-selectable="true"
          data-link={v.link}
        >
          {v.title}
        </button>
      ))}
    </div>
  );
}
