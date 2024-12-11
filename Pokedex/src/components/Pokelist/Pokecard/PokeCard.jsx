import React, { useState, useEffect, useContext, useMemo } from 'react';
import { PokedexContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';

function PokeCard({ singlePokemon }) {
  const { fetchPokemonDetails } = useContext(PokedexContext);
  const [details, setDetails] = useState({});
  const [typesWithSprites, setTypesWithSprites] = useState([]);
  const navigate = useNavigate();

  const typeColors = useMemo(
    () => ({
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-500',
      ice: 'bg-cyan-400',
      fighting: 'bg-orange-600',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-400',
      bug: 'bg-lime-600',
      rock: 'bg-gray-700',
      ghost: 'bg-indigo-600',
      dragon: 'bg-indigo-800',
      dark: 'bg-black',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
      normal: 'bg-gray-200',
    }),
    []
  );

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await fetchPokemonDetails(singlePokemon.url);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    }

    fetchDetails();
  }, [singlePokemon.url, fetchPokemonDetails]);

  useEffect(() => {
    async function fetchTypeSprites() {
      if (!details.types) return;

      try {
        const typePromises = details.types.map(async (typeInfo) => {
          const response = await fetch(typeInfo.type.url);
          const typeData = await response.json();
          return {
            name: typeInfo.type.name,
            sprite: typeData.sprites?.['generation-viii']?.['sword-shield'] || null,
          };
        });

        const fetchedTypes = await Promise.all(typePromises);
        setTypesWithSprites(fetchedTypes);
      } catch (error) {
        console.error('Error fetching type sprites:', error);
      }
    }

    fetchTypeSprites();
  }, [details.types]);

  const handleNavigateToPokeCardContent = () => {
    if (details?.id) {
      navigate(`/all-pokemons/${details.id}`);
    }
  };

  if (!details || Object.keys(details).length === 0) {
    return <div className="text-gray-500">Loading details...</div>;
  }

  return (
    <div
      className="flex flex-col items-center bg-gray-300 p-5 m-5 rounded-lg shadow-md hover:scale-105 transition-all"
      onClick={handleNavigateToPokeCardContent}
      tabIndex="0"
      role="button"
    >
      <div className="w-full">
        <img
          src={
            details.sprites?.other['official-artwork']?.front_default ||
            '/placeholder.png'
          }
          alt={details?.name || 'Pokemon'}
          className="h-60 object-contain mx-auto w-9/12"
        />
        <div className="mb-3 text-xl text-white">
          #{details?.id
            ? details.id.toString().padStart(4, '0')
            : '----'}
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-3xl text-black">
            {singlePokemon.name.charAt(0).toUpperCase() + singlePokemon.name.slice(1)}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start w-full">
            {typesWithSprites.length > 0 ? (
              typesWithSprites.map((type) => (
                <div
                  key={type.name}
                  className={`flex items-center space-x-2 mt-2 rounded-lg px-3 h-8 flex-wrap ${
                    typeColors[type.name] || 'bg-gray-400'
                  }`}
                >
                  <span className="text-lg font-semibold text-white text-center">
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-lg font-semibold text-gray-400 mt-2">No types available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
