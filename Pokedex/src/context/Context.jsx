import React, { createContext, useState, useEffect } from "react";

export const PokedexContext = createContext(null);

function PokedexProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState(20);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=3000");
      const result = await response.json();
      if (response.ok) {
        setPokemons(result?.results || []);
      } else {
        console.error("Failed to fetch Pokémon list:", result);
      }
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      return null;
    }
  };

  const showMorePokemons = () => {
    setVisiblePokemons((prevCount) => Math.min(prevCount + 20, pokemons.length));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <PokedexContext.Provider
      value={{
        pokemons,
        loading,
        fetchPokemonDetails,
        showMorePokemons,
        visiblePokemons,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}

export default PokedexProvider;
