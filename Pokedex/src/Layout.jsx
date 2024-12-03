import React from 'react'
import SearchBox from './components/Searchbox/SearchBox'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <>
    <SearchBox />
    <Outlet />
    </>

  )
}

export default Layout