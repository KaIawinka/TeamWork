import CodeInputs from './CodeInputs'
import ResendButton from './ResendButton'

function CodeStep({ phone, code, codeRefs, timer, isLoading, onCodeChange, onCodeKeyDown, onResend }) {
	return (
		<div className="auth-modal__form">
			<div className="auth-modal__heading">
				<h2 className="auth-modal__title">Введите код</h2>
				<span className="auth-modal__decor">🤙</span>
			</div>

			<p className="auth-modal__subtitle">
				SMS-код был отправлен на номер телефона {phone}
			</p>

			<CodeInputs code={code} codeRefs={codeRefs} onCodeChange={onCodeChange} onCodeKeyDown={onCodeKeyDown} />
			<ResendButton timer={timer} isLoading={isLoading} onClick={onResend} />
		</div>
	)
}

export default CodeStep
