import React, { createContext, useState, useEffect } from 'react';

export const PokedexContext = createContext(null);

function PokedexProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [visiblePokemons, setVisiblePokemons] = useState(20)
  


  async function fetchAPI() {
    setLoading(true);
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=3000');
    const result = await response.json();
    setPokemons(result?.results);
    setLoading(false);
  }

  async function fetchPokemonDetails(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null;
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const showMorePokemons = () => {
    setVisiblePokemons((prevCount) =>
      Math.min(prevCount + 20, pokemons.length)
    )
  }

  return (
    <PokedexContext.Provider value={{ pokemons, loading, fetchPokemonDetails, showMorePokemons, visiblePokemons }}>
      {children}
    </PokedexContext.Provider>
  );
}

export default PokedexProvider;
