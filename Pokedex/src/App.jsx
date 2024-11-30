import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import PokeList from './components/Pokelist/PokeList'

function App() {

  return (
    <>
    <div className="flex justify-center m-5">
        <div className="text-xl font-bold text-black m-16  ">POKEDEX USING APIS</div>
      </div>
    <PokeList />
    </>
  )
}

export default App
