import { UserIcon } from './HeaderIcons'

function LoginButton({ onClick }) {
	return (
		<button className="header__btn header__btn--outline" onClick={onClick}>
			<UserIcon />
			Войти
		</button>
	)
}

export default LoginButton
