import Cookie from 'js-cookie';


import {
    KEY_IS_TOGGLE_NAV,
    DATA_PRODUCTS,ERROR_REQUET,
    PRODUCT_DETAIL,
    PRODUCT_DETAIL_FAIL,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_ERROR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    PRODUCT_DELETE_ITEM,
    PRODUCT_ITEM_GESTION_FAIL,
    DATA_PRODUCTS_ADMIN,
    SIGN_OUT_USER
} from './action'

const inisialState = {
    products:[],
    isToggle:false,
    errorRequete : null,
    loadingProducts:true,
}
const inisialStateProduct = {
    loadingProducts:true,
    ProductDetail: {},
    errorRequete:null
}

const cartItems = Cookie.getJSON('CartItems') || [];
const userInfos = Cookie.getJSON('userInfos') || null

const inisialStateSIgnin = {
    userSigninError:null,
    usersInfos: userInfos,
    emailExiste:null
}



export const ProducstList = (state = inisialState,action) => {

    switch(action.type){
        
        case KEY_IS_TOGGLE_NAV : {
           
            return {
                ...state,
                isToggle:action.payload
            }
        }

        case DATA_PRODUCTS : {
           
            return {
                ...state,
                products:action.payload,
                loadingProducts:false
            }
        }

        case ERROR_REQUET : {
           return  {
                ...state,
                errorRequete:action.payload
            }
        }

        default: return state

    }


}

export const productDetail = (state = inisialStateProduct,action) => {
    switch(action.type){
        case PRODUCT_DETAIL : {
            return {
                ...state,
                ProductDetail:action.payload,
                loadingProducts:false
            }
        }

        case PRODUCT_DETAIL_FAIL : {
            return {
                ...state,
                errorRequete:action.payload
            }
        }

        default : return state
    }
}

export const cartReducer = (state = {cartItems:cartItems,isLoadingCartItem:true},action) => {

    switch(action.type){

        case CART_ADD_ITEM : {
 
            const item = action.payload;
            const productIndex = state.cartItems.findIndex(x => x.Idproduct === item.Idproduct);
            
            if(productIndex >= 0){
                let product = state.cartItems[productIndex];
                product.qty = Number(item.qty)
                let cartItems = state.cartItems;
                cartItems[productIndex] = product;
                return{
                    ...state,
                    cartItems: [...cartItems],
                    isLoadingCartItem:false
                }
            } 
        
            return {cartItems: [...state.cartItems,item]}

        }

        case CART_REMOVE_ITEM : {
            return {
                ...state,
                cartItems : state.cartItems.filter(el => el.Idproduct !== action.payload)
            }
        }


        default : return state;
        
    }
}

export const userSignin = (state = inisialStateSIgnin,action) => {

    switch(action.type){

  
        case USER_SIGNIN_SUCCESS : {
          
           return{
            ...state,
            usersInfos:action.payload,
            userSigninError:null,
           
           }
        }

        case SIGN_OUT_USER : {
            return {
                ...state,
                usersInfos:null
            }
        }

        case USER_SIGNIN_ERROR : {
            return{
                ...state,
                userSigninError:action.payload
            }
        }

        case USER_REGISTER_SUCCESS : {
            console.log('action --->',action.payload)
            let newEmailExiste = '';
            let data = action.payload;
            if(action.payload.msg){
                newEmailExiste =  action.payload.msg;
                data = null;
            }
            return {
                ...state,
                userLoading:false,
                usersInfos:data,
                userSigninError:null,
                emailExiste:newEmailExiste || null
            } 
        }

        case USER_REGISTER_ERROR : {
            return{
                ...state,
                userLoading:false,
                userSigninError:action.payload
            }
        }

        default : return state
    }

}

export const productListGestion = (state = {products:[],productIteminError:null,resultDeleteItem:null},action) => {

    switch(action.type){

        case DATA_PRODUCTS_ADMIN : {
            return {
                ...state,
                products:action.payload
            }
        }

        case PRODUCT_DELETE_ITEM : {
            
           

            return {
                ...state,
                products:[],
                resultDeleteItem:action.payload.msg
            }

            
        }

        case PRODUCT_ITEM_GESTION_FAIL :{
            return {
                ...state,
                productIteminError:action.payload
            }
        }

    
        default : return state

    }

}

