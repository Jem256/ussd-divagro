import React from 'react'
import './Shop.css'
import Product from '../product/Product'

function Shop({ products, onAddToCart }) {
  if (!products.length) {
    return (
      <p>Loading....</p>
    )
  }

  return (
    <div className='shop'>
      <div className="shop__container">

        <div className="shop__header">
          <h1>Products</h1>
        </div>

        <div className='shop__row'>
          {products.map((product) => (
            <Product key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Shop