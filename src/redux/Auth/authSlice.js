import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLogin: false,
		phone: '',
	},
	reducers: {
		login(state, action) {
			state.isLogin = true
			state.phone = action.payload
		},
		logout(state) {
			state.isLogin = false
			state.phone = ''
		},
	},
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
