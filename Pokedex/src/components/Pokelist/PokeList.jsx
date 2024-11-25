import React, { useContext } from "react";
import { PokedexContext } from "../../context/Context";
import PokeCard from "./Pokecard/PokeCard";

function PokeList() {
  const { loading, pokemons } = useContext(PokedexContext);
  console.log(pokemons);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center m-5">
        <div className="text-xl font-bold">POKEDEX USING APIS</div>
      </div>
      {pokemons && pokemons.length > 0 ? (
        <div className="flex item-row-3 gap-5" >
          {pokemons.map((pokemon, index) => (
            <PokeCard key={index} singlePokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div>No Pokémon found</div>
      )}
    </>
  );
}

export default PokeList;
