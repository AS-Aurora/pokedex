// PokeList.jsx
import React, { useState, useContext, useEffect } from "react"
import { PokedexContext } from "../../context/Context"
import PokeCard from "./Pokecard/PokeCard"

function PokeList() {
  const { loading, pokemons, showMorePokemons, visiblePokemons } = useContext(PokedexContext)  

  if (loading) {
    return <div>Loading...</div>
  }

  if (!pokemons || pokemons.length === 0) {
    return <div>No Pokémon found</div>
  }

  return (
    <>
      <div className=" mx-16 bg-gray-400 rounded-md ">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-5 s ">
          {pokemons.slice(0, visiblePokemons).map((pokemon) => (
            <PokeCard key={pokemon.name} singlePokemon={pokemon} />
          ))}
        </div>
        {visiblePokemons < pokemons.length && (
          <div className="flex justify-center my-5">
            <button
              onClick={showMorePokemons}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all mb-3"
            >
              Load More Pokemon
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PokeList;