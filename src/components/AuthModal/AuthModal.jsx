import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../../api/client'
import { setAuthenticated } from '../../redux/Auth/authSlice'
import AuthModalCloseButton from './AuthModalCloseButton'
import CodeStep from './CodeStep'
import PhoneStep from './PhoneStep'
import './AuthModal.css'

function formatPhone(value) {
	const digits = value.replace(/\D/g, '').slice(0, 11)
	const local = digits.startsWith('7') ? digits.slice(1) : digits

	let result = '+7'
	if (local.length > 0) result += ' (' + local.slice(0, 3)
	if (local.length >= 3) result += ') ' + local.slice(3, 6)
	if (local.length >= 6) result += '-' + local.slice(6, 8)
	if (local.length >= 8) result += '-' + local.slice(8, 10)
	return result
}

function AuthModal({ onClose }) {
	const dispatch = useDispatch()
	const [step, setStep] = useState('phone')
	const [phone, setPhone] = useState('+7')
	const [code, setCode] = useState(['', '', '', ''])
	const [timer, setTimer] = useState(30)
	const [isLoading, setIsLoading] = useState(false)
	const codeRefs = useRef([])

	useEffect(() => {
		if (step !== 'code' || timer <= 0) return
		const id = setTimeout(() => setTimer((value) => value - 1), 1000)
		return () => clearTimeout(id)
	}, [step, timer])

	function handlePhoneChange(event) {
		setPhone(formatPhone(event.target.value))
	}

	async function requestCode() {
		setIsLoading(true)
		try {
			await api.post('/api/auth/send-code', { phone })
			setStep('code')
			setTimer(30)
		} finally {
			setIsLoading(false)
		}
	}

	function handleSubmitPhone(event) {
		event.preventDefault()
		requestCode()
	}

	function handleResend() {
		if (timer > 0) return
		requestCode()
	}

	function handleCodeChange(index, value) {
		const digit = value.replace(/\D/g, '').slice(-1)
		const next = [...code]
		next[index] = digit
		setCode(next)

		if (digit && index < code.length - 1) {
			codeRefs.current[index + 1]?.focus()
		}

		if (next.every((item) => item !== '')) {
			verifyCode(next.join(''))
		}
	}

	function handleCodeKeyDown(index, event) {
		if (event.key === 'Backspace' && !code[index] && index > 0) {
			codeRefs.current[index - 1]?.focus()
		}
	}

	async function verifyCode(value) {
		setIsLoading(true)
		try {
			const response = await api.post('/api/auth/verify', { phone, code: value })
			dispatch(setAuthenticated({ phone, user: response.data }))
			onClose()
		} catch {
			setCode(['', '', '', ''])
			codeRefs.current[0]?.focus()
		} finally {
			setIsLoading(false)
		}
	}

	const isPhoneComplete = phone.replace(/\D/g, '').length === 11

	return (
		<div className="auth-modal">
			<div className="auth-modal__overlay" onClick={onClose} />

			<div className="auth-modal__window">
				<AuthModalCloseButton onClose={onClose} />

				{step === 'phone' ? (
					<PhoneStep
						phone={phone}
						isLoading={isLoading}
						isPhoneComplete={isPhoneComplete}
						onPhoneChange={handlePhoneChange}
						onSubmit={handleSubmitPhone}
					/>
				) : (
					<CodeStep
						phone={phone}
						code={code}
						codeRefs={codeRefs}
						timer={timer}
						isLoading={isLoading}
						onCodeChange={handleCodeChange}
						onCodeKeyDown={handleCodeKeyDown}
						onResend={handleResend}
					/>
				)}
			</div>
		</div>
	)
}

export default AuthModal
