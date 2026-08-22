import { Link } from 'react-router-dom'

function HeaderLogo() {
	return (
		<Link to="/" className="header__logo">
			<span className="header__logo-icon">🍕</span>
			<span className="header__logo-text">
				<span className="header__logo-title">NEXT PIZZA</span>
				<span className="header__logo-subtitle">вкусней уже некуда</span>
			</span>
		</Link>
	)
}

export default HeaderLogo
