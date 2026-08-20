import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setAuthenticated } from '../../redux/Auth/authSlice'
import './AuthModal.css'

function CloseIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	)
}

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
			await axios.post('/api/auth/send-code', { phone })
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
			const response = await axios.post('/api/auth/verify', { phone, code: value })
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
				<button className="auth-modal__close" onClick={onClose}>
					<CloseIcon />
				</button>

				{step === 'phone' ? (
					<form className="auth-modal__form" onSubmit={handleSubmitPhone}>
						<h2 className="auth-modal__title">Вход в аккаунт</h2>
						<p className="auth-modal__subtitle">
							Введите номер телефона, чтобы войти или зарегистрироваться
						</p>

						<input
							className="auth-modal__input"
							type="tel"
							inputMode="numeric"
							value={phone}
							onChange={handlePhoneChange}
							placeholder="+7 (921) XXX-XX-XX"
							autoFocus
						/>

						<button className="auth-modal__submit" type="submit" disabled={!isPhoneComplete || isLoading}>
							Получить код в SMS
						</button>
					</form>
				) : (
					<div className="auth-modal__form">
						<div className="auth-modal__heading">
							<h2 className="auth-modal__title">Введите код</h2>
							<span className="auth-modal__decor">🤙</span>
						</div>

						<p className="auth-modal__subtitle">
							SMS-код был отправлен на номер телефона {phone}
						</p>

						<div className="auth-modal__code">
							{code.map((digit, index) => (
								<input
									key={index}
									ref={(element) => (codeRefs.current[index] = element)}
									className="auth-modal__code-input"
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									onChange={(event) => handleCodeChange(index, event.target.value)}
									onKeyDown={(event) => handleCodeKeyDown(index, event)}
									autoFocus={index === 0}
								/>
							))}
						</div>

						<button className="auth-modal__resend" type="button" onClick={handleResend} disabled={timer > 0 || isLoading}>
							{timer > 0 ? `Запросить код — через ${timer} сек.` : 'Отправить код повторно'}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default AuthModal
