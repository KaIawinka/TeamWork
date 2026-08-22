function ResendButton({ timer, isLoading, onClick }) {
	return (
		<button className="auth-modal__resend" type="button" onClick={onClick} disabled={timer > 0 || isLoading}>
			{timer > 0 ? `Запросить код — через ${timer} сек.` : 'Отправить код повторно'}
		</button>
	)
}

export default ResendButton
