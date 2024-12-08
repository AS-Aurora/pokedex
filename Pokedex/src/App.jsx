import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PokeList from "./components/Pokelist/PokeList";
import PokeDetails from "./components/Pokelist/Pokecard/PokeDetails/PokeDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex justify-center m-5">
        <h1 className="text-4xl font-bold text-black m-16">Pokédex using APIs</h1>
      </header>

      {/* Routes Configuration */}
      <Routes>
        <Route path="/all-pokemons" element={<Layout />}>
          <Route index element={<PokeList />} />
          <Route path=":id" element={<PokeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
