import React from 'react';
import {Link} from 'react-router-dom';


 const ChildrenProduct = (props) => {
    const {image,name,brand,price,rating,_id} = props.product
    return (
     

            <article className="products">
                <img className="product-image" src={image} alt="product" />
                <Link to={'/product/'+ _id} className="product-name">{name}</Link>
                <span className="product-brand">{brand}</span>
                <span className="product-price">{price}$</span>
                <span className="product-review">{rating} Stars (10 Reviews) </span>
            </article>

  
        
    )
}

export default ChildrenProduct
