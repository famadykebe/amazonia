import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loading from '../tools/Loading'
import {productDetail} from '../store/action'

const ProductScreen = (props) =>  {
  
    const {product} = props;

    const [Qty,setQTY] = useState(1)

    useEffect(() => {
        
        props.productDetailProps(props.match.params.id)

    }, [])

    return (
        <div className="content-product">
          {props.loadingProducts ? (<Loading />) : (
            <>
            <Link  className="back-to-result">Back to result</Link>
            <div className="details-pro">
                <figure className="pro-image">
                    <img src={product.image} alt=""/>
                </figure>
                <div className="details-info">
                    <h4 className="pro-name">{product.name}</h4>
                    <span>Start ({product.numReviews} Reviews)</span>
                    <span className="pro-price">Price <strong>${product.price}</strong></span>
                    <p className="pro-dest">
                        Description! {product.description}
                    </p>
                </div>
                <div className="details-action">
                    <p className="action-price"> Price: {product.price}</p>
                    <p className="action-status">Status {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</p>
                    <div className="group-qty">
                        <span>Qty :</span>
                        <select className="action-qty" onChange={(e) => setQTY(e.target.value)}>
                            {
                               Array.from(Array(product.countInStock).keys()).map(q => {
                                //    console.log('number value --->',)
                                   return <option value={q + 1}>{q + 1}</option>
                               })
                            }
                        </select>
                    </div>
                    {product.countInStock > 0 ? (<button className="button" type="button"> Add to Cart</button>) : null}
                </div>
            </div>
            </>
              
          )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        product:state.productDetail.ProductDetail,
        loading: state.ProducstList.loadingProducts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productDetailProps : (id) => dispatch(productDetail(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen)
