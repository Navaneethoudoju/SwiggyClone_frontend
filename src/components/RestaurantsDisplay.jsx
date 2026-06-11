import React from 'react'
import { API_URL } from '../api'
import { useState } from 'react'
import { useEffect } from 'react'
import '../css/ReastaurantsDisplay.css'
import { Link } from 'react-router-dom'

const RestaurantsDisplay = () => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedCuisine, setSelectedCuisine] = useState('All')

    const handleCuisineChange = (cuisine) => {
        setSelectedCuisine(cuisine)
    }

    const restaurantsData = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/allvendors`)
            const data = await response.json()
            setRestaurants(data)
        } catch (error) {
            console.error("Error fetching restaurants data:", error)
        }
    }

    useEffect(() => {
        restaurantsData()
    }, [])

    return (
        <div className='restaurantsDisplay'>
            <h2>Restaurants with online food delivery in Hyderabad</h2>

            <div className="cuisineButtons">
                <button
                    className={selectedCuisine === 'All' ? 'cuisineButton active' : 'cuisineButton'}
                    onClick={() => handleCuisineChange('All')}
                >
                    ALL
                </button>
                <button
                    className={selectedCuisine === 'South-Indian' ? 'cuisineButton active' : 'cuisineButton'}
                    onClick={() => handleCuisineChange('South-Indian')}
                >
                    South-Indian
                </button>
                <button
                    className={selectedCuisine === 'North-Indian' ? 'cuisineButton active' : 'cuisineButton'}
                    onClick={() => handleCuisineChange('North-Indian')}
                >
                    North-Indian
                </button>
                <button
                    className={selectedCuisine === 'Chinese' ? 'cuisineButton active' : 'cuisineButton'}
                    onClick={() => handleCuisineChange('Chinese')}
                >
                    Chinese
                </button>
            </div>

            <div className="restaurantSection">
                {/** Flatten all firms across restaurants, filter them, and render sequentially so they start at first grid cell */}
                {(() => {
                    const allFirms = []
                    for (const restaurant of restaurants) {
                        const firms = restaurant.Firm || []
                        for (const f of firms) allFirms.push(f)
                    }
                    const firmsToShow = allFirms.filter((f) => {
                        if (!f) return false
                        if (selectedCuisine === 'All') return true
                        const target = selectedCuisine.toLowerCase().replace(/\s|-/g, '')
                        const check = (val) => {
                            if (!val) return false
                            if (Array.isArray(val)) return val.some(v => v && v.toString().toLowerCase().replace(/\s|-/g,'').includes(target))
                            return val.toString().toLowerCase().replace(/\s|-/g,'').includes(target)
                        }
                        return check(f.cuisine) || check(f.cuisines) || check(f.tags) || check(f.region) || check(f.category)
                    })

                    return firmsToShow.map((firm) => (
                        <div className="restaurantBox" key={firm._id}>
                            <Link to={`/products/${firm._id}/${firm.firmName}`} className="restaurantLink">
                                <div className="Box">
                                    <img src={`${API_URL}/${firm.image}`} alt={firm.firmName} />
                                    <div className="firmInfo">
                                        <div className="firmName">{firm.firmName}</div>
                                        <div className="offerDetails">{firm.offer}</div>
                                        <div className="firmDetails">{(firm.region || []).join(', ')}</div>
                                        <div className="firmDetails">{firm.area}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                })()}
            </div>
        </div>
    )
}

export default RestaurantsDisplay