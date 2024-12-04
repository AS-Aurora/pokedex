import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import PokeList from './components/Pokelist/PokeList'
import SearchBox from './components/Searchbox/SearchBox'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'

function App() {
  

  return (
    <>
    <div className="flex justify-center m-5">
        <div className="text-4xl font-bold text-black m-16  ">
        Pokédex using APIs</div>
      </div>
    <Routes>
      <Route path='/all-pokemons' element={<Layout />} >
      {/* {if()} */}
      {/* <Route path="/search" element={<SearchBox />} /> */}
      <Route index element={<PokeList />} />
      
      </Route>
    </Routes>
    </>
  )
}

export default App
