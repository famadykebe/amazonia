import apiServerRequet from '../config/confApi';
import Cookie from 'js-cookie'

//KEY FOR UPDATE STORE

export const KEY_IS_TOGGLE_NAV = 'KEY_IS_TOGGLE_NAV';
export const CLOSE_NAV_MENU = 'CLOSE_NAV_MENU';
export const PRODUCT_DETAIL = 'PRODUCT_DETAIL';
export const PRODUCT_DETAIL_FAIL = 'PRODUCT_DETAIL_FAIL';
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const PRODUCT_DELETE_ITEM = 'PRODUCT_DELETE_ITEM'
export const PRODUCT_ITEM_GESTION_FAIL = 'PRODUCT_ITEM_GESTION_FAIL';
export const DATA_PRODUCTS_ADMIN = 'DATA_PRODUCTS_ADMIN';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const DATA_PRODUCTS = 'DATA_PRODUCTS';
export const ERROR_REQUET = 'DATA_PRODUCTS_ERROR_REQUET'
// ALL CREATE ACTIONQ

export const isTogleActive = (data) => {
   
    return {
        type:KEY_IS_TOGGLE_NAV,
        payload:data
    }
   
}

const errorRequet = (error,KEY) => {
    return {
        type: KEY,
        payload : error
    }
}

export const getDataProducts = () => {
        
    return (dispatch) => {

        apiServerRequet.get('/api/products').then(response => {
            dispatch({
                type:DATA_PRODUCTS,
                payload: response.data
            })
        
        }).catch(error => {
            dispatch(errorRequet(error.message,ERROR_REQUET))
        })

      
    }
}

export const productDetail = (id) => {

    return (dispatch) => {

        apiServerRequet.get('api/product/'+id).then(response => {
          
            dispatch({
                type:PRODUCT_DETAIL,
                payload:response.data
            })

        }).catch(error => {
            dispatch(errorRequet(error.message,PRODUCT_DETAIL_FAIL))
        })

    }
}

export const addTocart = (productId,qty) => {
    
    return (dispatch,getState) => {
        apiServerRequet.get('/api/products/'+productId).then(response => {

            const {data} = response;
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    Idproduct: data._id,
                    name: data.name,
                    image:data.image,
                    price:data.price,
                    countInStock: data.countInStock,
                    qty:qty
                }
            });

            const {cartReducer: {cartItems}} = getState();
            Cookie.set('cartItems',JSON.stringify(cartItems))

        }).catch(error => {
           
        })
    }
}

export const removeItemCar = (productId) => {
    return (dispatch,getState) => {
       dispatch({type:CART_REMOVE_ITEM,payload:productId});

       const {cartReducer: {cartItems}} = getState();

       Cookie.set('cartItems',JSON.stringify(cartItems))

    }

}

export const signin =  (email,password) =>  async (dispatch) => {

        try{
            const {data} = await apiServerRequet.post('api/signin',{
                email:email,
                password:password
            });
            if(data){
                dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
                Cookie.set('userInfos',JSON.stringify(data))
            }
        }catch(error){
            dispatch({type:USER_SIGNIN_ERROR,payload:'email ou mot de passe incorrect'})
        }
        
}

export const signOut = () => {
   Cookie.remove('userInfos');
    return (dispatch) => {
        dispatch({type:SIGN_OUT_USER})  
    }
}


export const register = (name,email,password) => async (dispatch) => {

    try{
        const {data}  = await apiServerRequet.post('api/singup',{
            name:name,
            email:email,
            password:password
        })
        
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})

        if(!data.msg){
            Cookie.set('userInfos',JSON.stringify(data))
        }
        
    }catch(error){
        
        dispatch({type:USER_REGISTER_ERROR,payload:error})
    }

}

// creataction gestion item product


export const updateItemProduct = (id) => async (dispatch) => {

    try{
        const {data} = await apiServerRequet.delete('api/product/'+id);
        if(data){
            const object = {};
            object.msg = data.msg;
            object.id = id
           dispatch({type:PRODUCT_DELETE_ITEM,payload:object})
        }
    }catch(error){
        dispatch({type:PRODUCT_ITEM_GESTION_FAIL,payload:error.message})
    }


}
