import React from 'react'
import NavBar from '../components/NavBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import RestaurantsDisplay from '../components/RestaurantsDisplay'

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div className="LandingSection">
        <ItemsDisplay />      
        <Chains /> 
        <RestaurantsDisplay />
      </div>
     
    </div>
  )
}

export default LandingPage
