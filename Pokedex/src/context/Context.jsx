
import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const PokedexContext = createContext(null)

function PokedexProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState([])

    async function fetchAPI() {
        setLoading(true)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=3000')
        const result = await response.json()
        setPokemons(result?.results)
        console.log(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

  return (
    <PokedexContext.Provider value={{pokemons, loading}}>
        {children}
    </PokedexContext.Provider>
  )
}

export default PokedexProvider
