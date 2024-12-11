import React, { useContext, useState, useEffect, useMemo } from "react";
import { PokedexContext } from "../../../../context/Context";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsQuestion } from "react-icons/bs";
import {UseFavourites} from '../../../../hooks/UseFavourites'
import {AuthContext} from '../../../../context/AuthContext'

function PokeDetails() {
  const { id } = useParams();
  const cleanedId = id.replace(":", "");
  const numberId = parseInt(id.replace(":", ""), 10);
  const { loading } = useContext(PokedexContext);
  const [details, setDetails] = useState(null);
  const [abilitiesDes, setAbilitiesDes] = useState([]);
  const [showAbilities, setShowAbilities] = useState(false);
  const [evolutions, setEvolutions] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const {addToFavorites} = UseFavourites()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const typeColors = useMemo(
    () => ({
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-500",
      ice: "bg-cyan-400",
      fighting: "bg-orange-600",
      poison: "bg-purple-500",
      ground: "bg-yellow-700",
      flying: "bg-indigo-300",
      psychic: "bg-pink-400",
      bug: "bg-lime-600",
      rock: "bg-gray-700",
      ghost: "bg-indigo-600",
      dragon: "bg-indigo-800",
      dark: "bg-black",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
      normal: "bg-gray-200",
    }),
    []
  );

  useEffect(() => {
    async function fetchDetails() {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${cleanedId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const originalPokemon = {
          pokemon: { name: data.name, id: data.id},
          is_default: true,
        };

        setDetails({
          ...data,
          description:
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text || "No description available.",
        });

        const filteredVarieties = speciesData.varieties.filter(
          (variety) => variety.pokemon.name !== data.name
        );
        setVarieties([originalPokemon, ...filteredVarieties]);

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const chain = [];
        let current = evolutionData.chain;

        while (current) {
          const pokemonResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${current.species.name}`
          );
          const pokemonData = await pokemonResponse.json();

          chain.push({
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other["official-artwork"].front_default,
          });

          current = current.evolves_to[0];
        }

        setEvolutions(chain);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setDetails(null);
      }
    }

    fetchDetails();
  }, [cleanedId]);

  useEffect(() => {
    async function fetchAbilities() {
      if (details?.abilities) {
        try {
          const abilityPromises = details.abilities.map(async (abilityInfo) => {
            const response = await fetch(abilityInfo.ability.url);
            const abilityData = await response.json();
            return {
              name: abilityInfo.ability.name,
              description:
                abilityData.effect_entries.find(
                  (entry) => entry.language.name === "en"
                )?.effect || "No description available.",
            };
          });

          const abilitiesWithDetails = await Promise.all(abilityPromises);
          setAbilitiesDes(abilitiesWithDetails);
        } catch (error) {
          console.error("Error fetching abilities:", error);
          setAbilitiesDes([]);
        }
      }
    }

    fetchAbilities();
  }, [details?.abilities]);

  const handleVarietyChange = async (e) => {
    const selectedVarietyName = e.target.value;
    if (selectedVarietyName) {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${selectedVarietyName}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
  
        setDetails({
          ...data,
          description:
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text || "No description available.",
        });
      } catch (error) {
        console.error("Error fetching variety details:", error);
      }
    }
  };

  const handleAddToFavorites = () => {
    if (!user) {
      alert("Please log in to add to favorites.");
      return;
    }
  
    addToFavorites({ id: details.id, name: details.name });
  };
  

  if (loading || !details) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!details) {
    return (
      <div className="text-center text-red-500">
        Could not load Pokémon details. Please try again.
      </div>
    );
  }

  console.log(varieties);

  const { name, sprites, stats, height, weight, types, description } = details;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between gap-5 my-5 text-white text-lg">
        <div
          className={`font-semibold bg-cyan-500 p-3 w-6/12 text-center rounded-l-xl hover:scale-105 transition-all ${
            numberId === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => numberId>0?navigate(`/all-pokemons/:${Number(numberId) - 1}`):null}
          disabled={numberId<=0}
        >
          Prev
        </div>
        <div
          className={`font-semibold bg-cyan-500 p-3 w-6/12 text-center rounded-r-xl hover:scale-105 transition-all ${
            numberId === 3000 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => numberId?navigate(`/all-pokemons/:${Number(numberId) + 1}`):null}
          disabled={numberId<=3000}
        >
          Next
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 my-5">
        <h1 className="text-4xl capitalize">{name}</h1>
      </div>

      {/* Dropdown for Varieties */}
      {varieties.length > 1 && (
        <div className="mb-6">
          <select
            id="varieties"
            className="w-full p-2 border border-gray-300 rounded text-white"
            onChange={handleVarietyChange}
            value={details?.name}
          >
            {varieties.map((variety) => (
              <option key={variety.pokemon.name} value={variety.pokemon.name}>
                {variety.pokemon.name[0].toUpperCase() +
                  variety.pokemon.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="text-gray-500 text-center mb-5">
        #
        {details?.id
          ? details.id >= 1000
            ? details.id
            : details.id.toString().padStart(4, "0")
          : "----"}
      </p>
      {/* Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <img
          src={sprites?.other["official-artwork"]?.front_default}
          alt={name}
          className="sm:w-11/12 sm:h-11/12 w-full h-auto rounded-md bg-gray-300"
        />
        <div>
          {/* Pokemon Description */}
          <div>{description}</div>
          {/* AbilitiesDescription */}
          {showAbilities ? (
            <div className="p-4 bg-gray-300 rounded-md shadow-md relative mt-6 transition-all">
              <button
                className="absolute top-2 right-2 text-red-500 text-lg"
                onClick={() => setShowAbilities(false)}
              >
                ×
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                Abilities Descriptions
              </h2>
              <ul className="mt-4 space-y-2">
                {abilitiesDes.map((ability) => (
                  <li key={ability.name} className="text-gray-700">
                    <span className="font-semibold">
                      {ability.name[0].toUpperCase() + ability.name.slice(1)}:
                    </span>{" "}
                    {ability.description}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-6 bg-cyan-500 p-4 rounded-md transition-all">
              {/* Sub-Height */}
              <div>
                <h2 className="text-lg font-semibold text-white">Height</h2>
                <p>{height / 10} m</p>
              </div>
              {/* Sub-Weight */}
              <div>
                <h2 className="text-lg font-semibold text-white">Weight</h2>
                <p>{weight / 10} kg</p>
              </div>
              {/* Sub-Type */}
              <div>
                <h2 className="text-white font-semibold text-lg">Type</h2>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`flex items-center mt-2 rounded-lg px-3 h-8 text-white ${
                        typeColors[type.type.name] || "bg-gray-400"
                      }`}
                    >
                      {type.type.name[0].toUpperCase() +
                        type.type.name.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              {/* Des-Abilities */}
              <div>
                <h2 className="text-lg font-semibold text-white">Abilities</h2>
                <div className="flex gap-2 flex-wrap">
                  {abilitiesDes.map((ability) => (
                    <div
                      key={ability.name}
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setShowAbilities(true)}
                    >
                      <span>
                        {ability.name[0].toUpperCase() + ability.name.slice(1)}
                      </span>
                      <BsQuestion className="text-lg bg-white rounded-lg text-cyan-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-blue-500">Base Stats</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {stats.map((stat) => (
            <div key={stat.stat.name} className="flex justify-between">
              <span className="capitalize">{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Section */}
      <div className="mt-6">
        <h2 className="text-xl text-blue-500 font-bold">Evolutions</h2>
        <div className="flex gap-4 mt-4 flex-wrap">
          {evolutions.map((evolution) => (
            <Link
              key={evolution.id}
              to={`/all-pokemons/:${evolution.id}`}
              className="flex flex-col items-center px-16 py-10 bg-gray-200 rounded-full"
            >
              <img
                src={evolution.image}
                alt={evolution.name}
                className="w-20 h-20 object-contain rounded-md"
              />
              <p className="capitalize mt-2 font-semibold">{evolution.name}</p>
              <p className="text-gray-500">
                #{evolution.id.toString().padStart(4, "0")}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToFavorites}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add to Favorites
      </button>
    </div>
  );
}

export default PokeDetails;
