import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import PokeList from "./components/Pokelist/PokeList"
import PokeDetails from "./components/Pokelist/Pokecard/PokeDetails/PokeDetails";

function App() {
  return (
    <>
      <div className="flex justify-center m-5">
        <div className="text-4xl font-bold text-black m-16">Pokédex using APIs</div>
      </div>
      <Routes>
        <Route path="/all-pokemons" element={<Layout />}>
          <Route index element={<PokeList />} />
          <Route path=":id" element={<PokeDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
