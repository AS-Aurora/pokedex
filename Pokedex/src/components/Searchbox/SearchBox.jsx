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
      const detailedData = await Promise.all(
        pokemons.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return { ...pokemon, id: data.id };
        })
      );

      setDetailedPokemons(detailedData);
    }

    if (pokemons.length > 0) {
      fetchAllPokemonDetails();
    }
  }, [pokemons]);

  useEffect(() => {
    function fetchPokeCards(input) {
      if (!input.trim()) {
        setSearch([]);
        setShowPokelist(true);
        return;
      }

      if (/^\d+$/.test(input)) {
        const filteredByNumbers = detailedPokemons.filter((item) =>
          item.id.toString().startsWith(input)
        );
        setSearch(filteredByNumbers);
        setShowPokelist(false);
      } else {
        const filteredByName = detailedPokemons.filter((item) =>
          item.name.toLowerCase().startsWith(input.toLowerCase())
        );
        setSearch(filteredByName);
        setShowPokelist(false);
      }
    }

    fetchPokeCards(input);
  }, [input, detailedPokemons, setShowPokelist]);

  const handleCardClick = (id) => {
    navigate(`/all-pokemons/${id}`);
    setInput("");
    setSearch([]);
    setShowPokelist(true);
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
          className="m-2 p-2 border border-gray-300 rounded w-124 text-white"
        />
        {input && (
          <IoClose
            className="text-lg cursor-pointer"
            onClick={resetSearch}
          />
        )}
        <BsSearch className="text-lg" />
      </div>

      {/* Pokémon List */}
      {input && search.length > 0 && (
        <div className="bg-gray-500 rounded-md max-h-100 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {search.map((pokemon) => (
              <PokeCard
                key={pokemon.id}
                singlePokemon={pokemon}
                onClick={() => handleCardClick(pokemon.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
