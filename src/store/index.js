import {combineReducers} from 'redux';
import {ProducstList,productDetail,cartReducer,userSignin,productListGestion} from './reducers';


const storeReducer = combineReducers({
    ProducstList,
    productDetail,
    cartReducer,
    userSignin,
    productListGestion
})

export default storeReducer;