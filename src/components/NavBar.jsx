import React from 'react'
import '../css/NavBar.css'

const NavBar = () => {
  return (
    <div className="navBar">
        <div className="companyName">
            <h1>Sigvy</h1>
        </div>
        <div className="searchbar">
            <input type="text" placeholder='Search here' />
        </div>
        <div className="authSection">
            Login / Sign Up
        </div>
    </div>
  )
}

export default NavBar
