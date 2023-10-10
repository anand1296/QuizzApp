// import { createStore } from "redux";
// import rootReducer from "./root-reducer";

// const store = createStore(rootReducer)

// export default store;




//with reduxjs-toolkit
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './root-reducer'

const store = configureStore({
  reducer: rootReducer
})

export default store;