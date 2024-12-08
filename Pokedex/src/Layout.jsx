import React, { useState } from "react";
import SearchBox from "./components/Searchbox/SearchBox";
import { Outlet } from "react-router-dom";

function Layout() {
  const [showPokelist, setShowPokelist] = useState(true);

  return (
    <div>
      <SearchBox setShowPokelist={setShowPokelist} />

      {showPokelist && <Outlet />}
    </div>
  );
}

export default Layout;
