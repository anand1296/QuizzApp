import { combineReducers } from 'redux'
import cartSlice from './cart/cart.slice';

// import userReducer from './user/user.reducer'
import userSlice from './user/user.slice';

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // userReducer//-> use in case of without reduxtoolkit
    user: userSlice,
    cart: cartSlice
})

export default rootReducer;