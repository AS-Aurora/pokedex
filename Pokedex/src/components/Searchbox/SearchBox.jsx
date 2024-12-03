import React, { useEffect, useState, useContext } from 'react'
import { PokedexContext } from '../../context/Context'
import {BsSearch} from 'react-icons/bs'
import PokeCard from '../Pokelist/Pokecard/PokeCard'

function SearchBox() {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState([])

  const {pokemons} = useContext(PokedexContext)

  useEffect(() => {
    function fetchPokeCards(input) {
      if(!input) {
        setSearch([])
        return
      }

      const filtered  = pokemons.filter((item) => 
        item.name.toLowerCase().includes(input.toLowerCase())
      )
      setSearch(filtered)
    }

    fetchPokeCards(input)
  }, [input, pokemons])

  return (
    <div className="p-4">
      {/* Search Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <BsSearch className="text-lg" />
      </div>

      {/* Pokémon List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {search.length > 0 ? (
          search.map((pokemon, index) => (
            <PokeCard key={index} singlePokemon={pokemon} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No Pokémon found</p>
        )}
      </div>
    </div>
  )
}

export default SearchBox