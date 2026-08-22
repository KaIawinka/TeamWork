import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/Auth/authSlice'
import { UserIcon } from './HeaderIcons'

function ProfileButton({ onClick }) {
	return (
		<button className="header__btn header__btn--outline" onClick={onClick}>
			<UserIcon />
			Профиль
		</button>
	)
}

function ProfileDropdown({ onLogout }) {
	return (
		<ul className="header__profile-dropdown">
			<li className="header__profile-item">Настройки</li>
			<li className="header__profile-item">Заказы</li>
			<li className="header__profile-item" onClick={onLogout}>
				Выйти
			</li>
		</ul>
	)
}

function ProfileMenu() {
	const dispatch = useDispatch()
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const profileRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setIsProfileOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	function handleLogout() {
		dispatch(logout())
		setIsProfileOpen(false)
	}

	return (
		<div className="header__profile" ref={profileRef}>
			<ProfileButton onClick={() => setIsProfileOpen((state) => !state)} />
			{isProfileOpen && <ProfileDropdown onLogout={handleLogout} />}
		</div>
	)
}

export default ProfileMenu
