import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AuthModal from '../AuthModal/AuthModal'
import { logout, selectIsAuthenticated, selectUserPhone } from '../../redux/Auth/AuthSlice'
import './Header.css'

function SearchIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
			<path d="M16 16L12.3 12.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	)
}

function UserIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
			<path d="M2.3 14C2.3 11 4.9 9 8 9C11.1 9 13.7 11 13.7 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
		</svg>
	)
}

function CartIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path d="M2 2H3.6L5.4 11.3C5.5 11.9 6 12.3 6.6 12.3H13.7C14.3 12.3 14.8 11.9 14.9 11.3L16 5H4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="7.2" cy="15.6" r="1.1" fill="currentColor" />
			<circle cx="13.2" cy="15.6" r="1.1" fill="currentColor" />
		</svg>
	)
}

function highlightMatch(name, query) {
	const index = name.toLowerCase().indexOf(query.toLowerCase())
	if (index === -1) return name

	const before = name.slice(0, index)
	const match = name.slice(index, index + query.length)
	const after = name.slice(index + query.length)

	return (
		<>
			{before}
			<b>{match}</b>
			{after}
		</>
	)
}

function Header() {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const totalPrice = useSelector((state) => state.cart?.totalPrice ?? 0)
	const totalCount = useSelector((state) => state.cart?.totalCount ?? 0)

	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

	const searchRef = useRef(null)
	const profileRef = useRef(null)
	const debounceRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsSearchOpen(false)
			}
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setIsProfileOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	function handleSearchChange(event) {
		const value = event.target.value
		setQuery(value)
		clearTimeout(debounceRef.current)

		if (!value.trim()) {
			setResults([])
			setIsSearchOpen(false)
			return
		}

		debounceRef.current = setTimeout(async () => {
			try {
				const response = await axios.get('/api/pizzas', { params: { search: value } })
				setResults(response.data)
				setIsSearchOpen(true)
			} catch (error) {
				setResults([])
			}
		}, 300)
	}

	function handleLogout() {
		dispatch(logout())
		setIsProfileOpen(false)
	}

	return (
		<header className="header">
			<div className="header__inner">
				<Link to="/" className="header__logo">
					<span className="header__logo-icon">🍕</span>
					<span className="header__logo-text">
						<span className="header__logo-title">NEXT PIZZA</span>
						<span className="header__logo-subtitle">вкусней уже некуда</span>
					</span>
				</Link>

				<div className="header__search" ref={searchRef}>
					<span className="header__search-icon">
						<SearchIcon />
					</span>
					<input
						className="header__search-input"
						type="text"
						placeholder="Поиск пиццы..."
						value={query}
						onChange={handleSearchChange}
						onFocus={() => query && results.length > 0 && setIsSearchOpen(true)}
					/>

					{isSearchOpen && results.length > 0 && (
						<ul className="header__search-dropdown">
							{results.map((item) => (
								<li key={item.id} className="header__search-item">
									<img className="header__search-item-image" src={item.imageUrl} alt={item.name} />
									<span className="header__search-item-name">{highlightMatch(item.name, query)}</span>
									<span className="header__search-item-price">{item.price}₽</span>
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="header__actions">
					{isAuthenticated ? (
						<div className="header__profile" ref={profileRef}>
							<button
								className="header__btn header__btn--outline"
								onClick={() => setIsProfileOpen((state) => !state)}
							>
								<UserIcon />
								Профиль
							</button>

							{isProfileOpen && (
								<ul className="header__profile-dropdown">
									<li className="header__profile-item">Настройки</li>
									<li className="header__profile-item">Заказы</li>
									<li className="header__profile-item" onClick={handleLogout}>
										Выйти
									</li>
								</ul>
							)}
						</div>
					) : (
						<button className="header__btn header__btn--outline" onClick={() => setIsAuthModalOpen(true)}>
							<UserIcon />
							Войти
						</button>
					)}

					<Link to="/cart" className={totalCount > 0 ? 'header__cart header__cart--filled' : 'header__cart'}>
						{totalCount > 0 ? (
							<>
								<span className="header__cart-price">{totalPrice} ₽</span>
								<span className="header__cart-divider" />
								<CartIcon />
								<span className="header__cart-count">{totalCount}</span>
							</>
						) : (
							<CartIcon />
						)}
					</Link>
				</div>
			</div>

			{isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
		</header>
	)
}

export default Header
