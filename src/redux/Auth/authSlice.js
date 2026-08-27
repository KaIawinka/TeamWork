import { createSlice } from '@reduxjs/toolkit'

function getSavedAuth() {
	if (typeof localStorage === 'undefined') {
		return {
			isLogin: false,
			phone: '',
		}
	}

	const phone = localStorage.getItem('authPhone') || ''

	return {
		isLogin: Boolean(phone),
		phone,
	}
}

const authSlice = createSlice({
	name: 'auth',
	initialState: getSavedAuth(),
	reducers: {
		login(state, action) {
			state.isLogin = true
			state.phone = action.payload
			localStorage.setItem('authPhone', action.payload)
		},
		logout(state) {
			state.isLogin = false
			state.phone = ''
			localStorage.removeItem('authPhone')
		},
	},
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
