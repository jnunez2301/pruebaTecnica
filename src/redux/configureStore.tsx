import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice';
import crudReducer from './crudSlice';


const store = configureStore({
    reducer: {
        products: productReducer,
        crud: crudReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;