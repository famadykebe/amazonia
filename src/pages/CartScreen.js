import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {addTocart,removeItemCar} from '../store/action';
import {Link} from 'react-router-dom';
import Loading from '../tools/Loading'


const ShowCartItem = ({cartItems,propsRemoveItemCart,addTocart}) => {

    const removeFromCarHandler = (productId) => {
      
        propsRemoveItemCart(productId)   
    }

    return(
        <>
            {
                cartItems.map((item,index) => (
                    <div className="item" key={index}>
                        <img  className="item-img" src={item.image} alt="item-img" />
                        <div className="block-name-qty">
                            <Link to={'/product/'+item.Idproduct}className="item-name">{item.name}</Link>
                            <div>
                                <label>Qty: </label>
                                <select onChange={e => addTocart(e.target.value)}>
                                   
                                   {
                                    [...Array(item.countInStock).keys()].map((el,index) => {
                                        return <option key={index}value={el + 1}>{el + 1}</option>
                                    })
                                   }
                                    
                                </select>
                                <br />
                                <br />
                                <button type="" className="button delete" onClick={() => {removeFromCarHandler(item.Idproduct)}}>Delete</button>
                            </div>
                        </div>
                        <span className="item-price">{item.price}</span>
                    </div>
                ))
            }
        </>
    )
}


const CartScreen = (props) => {

    const productId = props.match.params.id;
    console.log('location',)
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : null;

    const {cartItems,propsRemoveItemCart,propsAddTocart} = props;

    useEffect(() => {

        if(productId){
           
            propsAddTocart(productId,qty);
        }
       
    }, [])


    const checkoutHandler = () => {
        props.hsitory.push('/signin?redirect=shipping')
    }


    return (
        <>
        {
            props.isLoadingCartItem ? (
                <Loading />
            ) : (
                <div className="cart">
                        <div className="cart-list">
                            <div className="cart-header">
                            <h3 className="cart-title">Shopping Cart</h3>
                            <p className="cart-price">Price</p>
                            </div>
                            <span>
                                {
                                    cartItems.length === 0 ? (<p> Cart is empty</p>) : (<ShowCartItem addTocart={(qtyevent) => props.propsAddTocart(productId,qtyevent)} cartItems={cartItems} propsRemoveItemCart={(productId) => {
                                        
                                        propsRemoveItemCart(productId)
                                    }}/>)
                                }
                            </span>
                        </div>

                        <div className="cart-action">
                                <h3>

                                {
                                        console.log('cartItems',cartItems)
                                }

                                    Subtotal ({cartItems && cartItems.length > 0 ? (cartItems.reduce((a,c) => {

                                    
                                    
                                        return a + c.qty
                                    
                                    },0)) : 0} items)
                                    :
                                    $ {cartItems && cartItems.length > 0 ? (cartItems.reduce((a,c) => a + c.price * c.qty,0)) : 0}
                                </h3>
                                <button onClick={() => checkoutHandler()} className="button primary" disabled={cartItems.length === 0}>
                                    Porceed to Chekout
                                </button>
                        </div>
                    </div>
            )
        }
        </>
    )
}

const mapStateToProps = (state) =>{
    console.log('state',state.cartReducer.cartItems)
    return {
        cartItems: state.cartReducer.cartItems,
        isLoadingCartItem:state.cartReducer.isLoadingCartItem
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        propsAddTocart: (productId,qty) => dispatch(addTocart(productId,qty)),
        propsRemoveItemCart : (productId) => dispatch(removeItemCar(productId))
   }
}


export default connect(mapStateToProps,mapDispatchToProps)(CartScreen)