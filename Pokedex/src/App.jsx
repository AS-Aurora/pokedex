import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PokeList from "./components/Pokelist/PokeList";
import PokeDetails from "./components/Pokelist/Pokecard/PokeDetails/PokeDetails";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { NavLink } from "react-router-dom";
import FavPage from "./pages/FavPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

<div>
    <header className="sticky top-0 w-full flex justify-between items-center p-5 max-w-6xl mx-auto z-10">
    <h1 className="text-4xl font-bold text-black">Pokédex using APIs</h1>
      <nav className="flex space-x-4">
        <NavLink
          to="/all-pokemons"
          className={({ isActive }) =>
            `relative text-black p-1 hover:underline ${isActive ? "underline" : ""}`
          }
        >
          Pokedex
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `relative text-black p-1 hover:underline ${isActive ? "underline" : ""}`
          }
        >
          Login  
        </NavLink>
      </nav>
    </header>
    </div>

      {/* Routes Configuration */}
      <Routes>
        <Route path="/all-pokemons" element={<Layout />}>
          <Route index element={<PokeList />} />
          <Route path=":id" element={<PokeDetails />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
