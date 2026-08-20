import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	phone: null,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthenticated(state, action) {
			state.isAuthenticated = true
			state.phone = action.payload.phone
			state.user = action.payload.user
		},
		logout(state) {
			state.isAuthenticated = false
			state.phone = null
			state.user = null
		},
	},
})

export const { setAuthenticated, logout } = authSlice.actions

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUserPhone = (state) => state.auth.phone

export default authSlice.reducer
