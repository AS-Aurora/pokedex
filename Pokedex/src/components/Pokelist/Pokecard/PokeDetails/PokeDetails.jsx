import React, { useContext, useState, useEffect } from "react";
import { PokedexContext } from "../../../../context/Context";
import { useParams } from "react-router-dom";

function PokeDetails() {
  const { id } = useParams()
  const cleanedId = id.replace(":", "");
  const { pokemons, fetchPokemonDetails, loading } = useContext(PokedexContext)
  const pokemon = pokemons[parseInt(cleanedId)]
  const [details, setDetails] = useState(null)

  

  useEffect(() => {
    async function fetchDetails() {

      if (!pokemon || !pokemon.url) {
        console.error("Pokémon or URL not found for ID:", cleanedId);
        return;
      }
      try {
        const data = await fetchPokemonDetails(pokemon.url);
        console.log('Data is: ', data);
        
        setDetails(data);
        
        
        
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setDetails(null);
      }
    }
    
    if (pokemons.length > 0) {
      fetchDetails();
    }
    }, [cleanedId, pokemons, fetchPokemonDetails]);

    // useEffect(() => {
    //   console.log('Updated details:', details);
    // }, [details]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!details) {
  //   return <div>No details available</div>;
  // }

  return (
    <>
      
    </>
  );
}

export default PokeDetails;
