function PhoneStep({ phone, isLoading, isPhoneComplete, onPhoneChange, onSubmit }) {
	return (
		<form className="auth-modal__form" onSubmit={onSubmit}>
			<h2 className="auth-modal__title">Вход в аккаунт</h2>
			<p className="auth-modal__subtitle">
				Введите номер телефона, чтобы войти или зарегистрироваться
			</p>

			<input
				className="auth-modal__input"
				type="tel"
				inputMode="numeric"
				value={phone}
				onChange={onPhoneChange}
				placeholder="+7 (921) XXX-XX-XX"
				autoFocus
			/>

			<button className="auth-modal__submit" type="submit" disabled={!isPhoneComplete || isLoading}>
				Получить код в SMS
			</button>
		</form>
	)
}

export default PhoneStep
