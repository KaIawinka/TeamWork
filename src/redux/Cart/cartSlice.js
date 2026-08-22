import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addToCart(state, action) {
			const item = state.items.find((cartItem) => cartItem.id === action.payload.id)
			if (item) item.quantity += 1
			else state.items.push({ ...action.payload, quantity: 1 })
		},
		removeFromCart(state, action) {
			const item = state.items.find((cartItem) => cartItem.id === action.payload)
			if (!item) return
			if (item.quantity === 1) state.items = state.items.filter((cartItem) => cartItem.id !== action.payload)
			else item.quantity -= 1
		},
		clearCart(state) {
			state.items = []
		},
	},
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export default cartSlice.reducer