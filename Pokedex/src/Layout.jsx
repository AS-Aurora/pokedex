import React, { useState, useRef, useEffect } from "react";
import SearchBox from "./components/Searchbox/SearchBox";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isVisible, setIsVisible] = useState(true);
  const searchRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchBarClick = () => {
    setIsVisible(false);
    setIsSearchActive(true);
  };

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsVisible(true);
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={searchRef}>
      <SearchBox
        onSearchBarClick={handleSearchBarClick}
        isSearchActive={isSearchActive}
      />
      {isVisible && <Outlet />}
    </div>
  );
}

export default Layout;
