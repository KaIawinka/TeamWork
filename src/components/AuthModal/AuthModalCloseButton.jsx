import CloseIcon from './CloseIcon'

function AuthModalCloseButton({ onClose }) {
	return (
		<button className="auth-modal__close" onClick={onClose}>
			<CloseIcon />
		</button>
	)
}

export default AuthModalCloseButton
