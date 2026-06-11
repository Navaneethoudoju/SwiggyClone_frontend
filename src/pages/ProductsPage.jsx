import React from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../api'
import { useState } from 'react'
import { useEffect } from 'react'
import '../css/ProductsDisplay.css'
import NavBar from '../components/NavBar'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const { firmId , firmName} = useParams()
  console.log("Firm ID from URL:", firmId)

  const productsData = async () => {
    try {
      const response = await fetch(`${API_URL}/product/getproducts/${firmId}`)
      const data = await response.json()
      setProducts(data)
      console.log("Products data:", data)
    }
    catch (error) {
      console.error("Error fetching products data:", error)
    }
  }

  useEffect(() => {
    productsData()
  }, [])



return (<div className='productsPage'>
  <NavBar />
    
    <div className="productSection">
      <div className="restaurantName">
      <h2>{firmName}</h2>
    </div>
      {products.map((product) => (
        <div className="productBox" key={product._id}>
          
          <div className="productName">
            {product.productName}
          </div>
          <div className="productImage">
            <img
            src={`${API_URL}/${product.image}`}
            alt={product.productName}
          />
          <div className="addButton">
            Add
          </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProductsPage

