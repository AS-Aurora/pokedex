import React, { useEffect, useState, useContext } from "react"
import { PokedexContext } from "../../context/Context"
import { BsSearch } from "react-icons/bs"
import PokeCard from "../Pokelist/Pokecard/PokeCard"

function SearchBox({ onSearchBarClick, isSearchActive }) {
  const [input, setInput] = useState("")
  const [search, setSearch] = useState([])
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const { pokemons } = useContext(PokedexContext)

  useEffect(() => {
    async function fetchAllPokemonDetails() {
      const detailedData = await Promise.all(
        pokemons.map(async (pokemon) => {
          const response = await fetch(pokemon.url)
          const data = await response.json()       
          return { ...pokemon, id: data.id }
        })
      )
      
      setDetailedPokemons(detailedData)
    }

    if (pokemons.length > 0) {
      fetchAllPokemonDetails()
    }
  }, [pokemons]);

  useEffect(() => {
    function fetchPokeCards(input) {
      if (!input.trim()) {
        setSearch([])
        return;
      }

      if (/^\d+$/.test(input)) {
        const filteredByNumbers = detailedPokemons.filter((item) =>
          item.id.toString().startsWith(input)
        );
        setSearch(filteredByNumbers)
      } else {
        const filteredByName = detailedPokemons.filter((item) =>
          item.name.toLowerCase().startsWith(input.toLowerCase())
        );
        setSearch(filteredByName)
      }
    }

    fetchPokeCards(input)
  }, [input, detailedPokemons])

  useEffect(() => {
    if (!isSearchActive) {
      // setInput("");
      setSearch([]);
    }
  }, [isSearchActive]);

  return (
    <div className="px-16 py-4">
      {/* Search Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={onSearchBarClick}
          className="m-2 p-2 border border-gray-300 rounded w-124 text-white"
        />
        <BsSearch className="text-lg" />
      </div>

      {/* Pokémon List */}
      {isSearchActive && search.length > 0 && (
      <div className="bg-gray-500 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {search.length > 0 ? (
            search.map((pokemon) => (
              <PokeCard key={pokemon.id} singlePokemon={pokemon} />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              {input.trim() ? "No Pokémon found" : ""}
            </p>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default SearchBox;
