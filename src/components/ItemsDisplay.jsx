import React  from 'react'
import {useState} from 'react'
import { items } from '../data'
import '../css/ItemsDisplay.css'

const ItemsDisplay = () => {
    const [displayItems, setDisplayItems] = useState(items)
  return (
    <div className="itemsSection">
      {displayItems.map((item) => (
        <div className='images' key={item.item_image}>
          <img src={item.item_image} alt={`Item ${item.item_image.split('/').pop()}`} />
        </div>
      ))}
    </div>
  )
}

export default ItemsDisplay
