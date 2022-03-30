import React from 'react'
import './Product.css'
import {BsDash} from 'react-icons/bs'

function Product({ product, onAddToCart }) {
    const handleAddToCart = () => onAddToCart(product.id, 1)

    return (
        <div className='product'>
            
            <img className='product__img' src={product.image.url} title={product.name} width={400} height={400} alt="" />
            
            <div className="product__info">
                <em className='product__title'>{product.name} </em>
                <BsDash/>
                <p className="product__price">
                    <strong> UGX </strong>
                    <strong>{product.price.formatted_with_symbol}</strong>
                </p>
                       {/* remember to add product description */}
            </div>
            {/* <div className="product__rating">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p><AiOutlineStar/></p>
                    ))}
            </div> */}
            <button className='btn btn-primary' onClick={handleAddToCart} >Add to Cart</button>
        </div>
    )
}

export default Product