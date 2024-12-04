import React, { useContext } from 'react'
import { PokeCardContext } from '../../context/PokeCardContext'

function PokeCardContent() {

    const {pokemons, fetchPokemonDetails, loading} = useContext(PokeCardContext)

    if(loading) {
        return <div>Loading...</div>
    }
  return (
    <div>PokeCardContent</div>
  )
}

export default PokeCardContent