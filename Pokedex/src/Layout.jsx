import React, {useState} from 'react'
import SearchBox from './components/Searchbox/SearchBox'
import {Outlet} from 'react-router-dom'

function Layout() {

  const [isVisible, setIsVisible] = useState(true)

  const handleSearchBarClick=()=>{
    setIsVisible(false)
  }
  return (
    <>
    <SearchBox onSearchBarClick={handleSearchBarClick} />
    {isVisible && <Outlet />}
    </>

  )
}

export default Layout