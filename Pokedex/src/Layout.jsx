import React, { useState, useRef, useEffect } from "react";
import SearchBox from "./components/Searchbox/SearchBox";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isVisible, setIsVisible] = useState(true);
  const searchRef = useRef(null);

  const handleSearchBarClick = () => {
    // console.log("Search bar clicked");
    setIsVisible(false);
  };

  const handleOutsideClick = (e) => {
    // console.log("Clicked outside?", e.target);
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      // console.log("Outside click detected");
      setIsVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={searchRef} >
      <SearchBox onSearchBarClick={handleSearchBarClick} />
      {isVisible && <Outlet />}
    </div>
  );
}

export default Layout;
