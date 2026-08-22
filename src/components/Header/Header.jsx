import { useState } from 'react'
import AuthModal from '../AuthModal/AuthModal'
import HeaderActions from './HeaderActions'
import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import './Header.css'

function Header() {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

	return (
		<header className="header">
			<div className="header__inner">
				<HeaderLogo />
				<HeaderSearch />
				<HeaderActions onLoginClick={() => setIsAuthModalOpen(true)} />
			</div>

			{isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
		</header>
	)
}

export default Header
