import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/Auth/authSlice'
import AuthModalCloseButton from './AuthModalCloseButton'
import PhoneStep from './PhoneStep'
import './AuthModal.css'

function formatPhone(value) {
	const digits = value.replace(/\D/g, '').slice(0, 11)
	const local = digits.startsWith('7') ? digits.slice(1) : digits

	let result = '+7'
	if (local.length > 0) result += ` (${local.slice(0, 3)}`
	if (local.length >= 3) result += `) ${local.slice(3, 6)}`
	if (local.length >= 6) result += `-${local.slice(6, 8)}`
	if (local.length >= 8) result += `-${local.slice(8, 10)}`

	return result
}

function AuthModal({ onClose }) {
	const dispatch = useDispatch()
	const [phone, setPhone] = useState('+7')

	function handlePhoneChange(event) {
		setPhone(formatPhone(event.target.value))
	}

	function handleSubmit(event) {
		event.preventDefault()
		dispatch(login(phone))
		onClose()
	}

	const isPhoneComplete = phone.replace(/\D/g, '').length === 11

	return (
		<div className="auth-modal">
			<div className="auth-modal__overlay" onClick={onClose} />

			<div className="auth-modal__window">
				<AuthModalCloseButton onClose={onClose} />
				<PhoneStep
					phone={phone}
					isPhoneComplete={isPhoneComplete}
					onPhoneChange={handlePhoneChange}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default AuthModal
