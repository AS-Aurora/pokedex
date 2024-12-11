import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PokedexContext } from "../../context/Context";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import PokeCard from "../Pokelist/Pokecard/PokeCard";

function SearchBox({ setShowPokelist }) {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const { pokemons } = useContext(PokedexContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPokemonDetails() {
      try {
        const detailedData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return { ...pokemon, id: data.id };
          })
        );
        setDetailedPokemons(detailedData);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    }

    if (pokemons.length > 0) {
      fetchAllPokemonDetails();
    }
  }, [pokemons]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!input.trim()) {
        setSearch([]);
        setShowPokelist(true);
        return;
      }

      const filterPokemons = () => {
        const filtered =
          /^\d+$/.test(input)
            ? detailedPokemons.filter((item) =>
                item.id.toString().startsWith(input)
              )
            : detailedPokemons.filter((item) =>
                item.name.toLowerCase().startsWith(input.toLowerCase())
              );
        setSearch(filtered);
        setShowPokelist(false);
      };

      filterPokemons();
    }, 300); // Debounce delay

    return () => clearTimeout(debounceTimeout);
  }, [input, detailedPokemons, setShowPokelist]);

  const handleCardClick = (id) => {
    navigate(`/all-pokemons/${id}`);
    resetSearch();
  };

  const resetSearch = () => {
    setInput("");
    setSearch([]);
    setShowPokelist(true);
  };

  return (
    <div className="px-16 py-4">
      {/* Search Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="m-2 p-2 border border-gray-300 rounded w-full sm:w-96 text-white"
          aria-label="Search Pokémon"
        />
        {input && (
          <IoClose
            className="text-lg cursor-pointer"
            onClick={resetSearch}
            aria-label="Clear search"
          />
        )}
        <BsSearch className="text-lg" />
      </div>

      {/* Pokémon List */}
      {input && (
        <div className="bg-gray-100 rounded-md mt-4">
          {search.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {search.map((pokemon) => (
                <PokeCard
                  key={pokemon.id}
                  singlePokemon={pokemon}
                  onClick={() => handleCardClick(pokemon.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center p-4 text-gray-500">
              No Pokémon found. Try a different search query.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
