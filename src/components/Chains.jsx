import React from 'react'
import { API_URL } from '../api'
import { useState } from 'react'
import { useEffect } from 'react'
import '../css/Chains.css'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";



const Chains = () => {
  const [chains, setChains] = useState([])

  const chainsData = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/allvendors`)
      const data = await response.json()
      console.log("Fetched chains data:", data)
      setChains(data)
    } catch (error) {
      console.error("Error fetching chains data:", error)
    }
  }
  useEffect(() => {
    chainsData()
  }, [])

  const handleScroll = (dir) => {
    const gallery = document.getElementById('gallerySection')
    const scrollAmount = 400
    if (dir === 'left') {
      gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else if (dir === 'right') {
      gallery.scrollBy({ left: +scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="chainbutton">
        <h2>Top restaurant chains in Hyderabad</h2>
        <div className="buttonSection">
          <button onClick={() => handleScroll('left')}>
            <FaArrowAltCircleLeft />
          </button>
          <button onClick={() => handleScroll('right')}>
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>

      <section className="chainSection" id="gallerySection">
        {chains.map((chain) => (
          <div className="vendorBox" key={chain._id}>

            {chain.Firm.map((firm) => (
              <div className="firmBox" key={firm._id}>
                <img
                  src={`${API_URL}/${firm.image}`}
                  alt={firm.firmName}
                />
                <h3 className='chainNames'>{firm.firmName}</h3>
              </div>
            ))}

          </div>
        ))}
      </section>

    </>
  )
}

export default Chains
