function PhoneStep({ phone, isPhoneComplete, onPhoneChange, onSubmit }) {
	return (
		<form className="auth-modal__form" onSubmit={onSubmit}>
			<h2 className="auth-modal__title">Регистрация</h2>
			<p className="auth-modal__subtitle">Введите номер телефона, чтобы создать аккаунт или войти</p>

			<input
				className="auth-modal__input"
				type="tel"
				inputMode="numeric"
				value={phone}
				onChange={onPhoneChange}
				placeholder="+7 (921) XXX-XX-XX"
				autoFocus
			/>

			<button className="auth-modal__submit" type="submit" disabled={!isPhoneComplete}>
				Зарегистрироваться
			</button>
		</form>
	)
}

export default PhoneStep
