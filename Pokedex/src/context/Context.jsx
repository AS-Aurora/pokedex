import React, { createContext, useState, useEffect } from 'react';

export const PokedexContext = createContext(null);

function PokedexProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  async function fetchAPI() {
    setLoading(true);
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=3000');
    const result = await response.json();
    setPokemons(result?.results);
    setLoading(false);
  }

  // New function to fetch individual Pokémon details
  async function fetchPokemonDetails(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null; // Fallback in case of error
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <PokedexContext.Provider value={{ pokemons, loading, fetchPokemonDetails }}>
      {children}
    </PokedexContext.Provider>
  );
}

export default PokedexProvider;
