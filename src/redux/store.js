import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/cartSlice'

const myStore = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
})

export default myStore
