import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Categories.css'

const VISIBLE_CATEGORIES = ['Все', 'Мясные', 'Острые', 'Сладкие', 'Вегетарианские', 'С курицей']
const HIDDEN_CATEGORIES = ['Сырные', 'Постные', 'Гриль']

function ChevronIcon() {
	return (
		<svg width="10" height="6" viewBox="0 0 10 6" fill="none">
			<path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function Categories({ active, onSelect }) {
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const moreRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (moreRef.current && !moreRef.current.contains(event.target)) {
				setIsMoreOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	function handleSelect(category) {
		onSelect(category)
		setIsMoreOpen(false)
	}

	const isActiveHidden = HIDDEN_CATEGORIES.includes(active)

	return (
		<ul className="categories">
			{VISIBLE_CATEGORIES.map((category) => (
				<li key={category}>
					<button
						className={active === category ? 'categories__item categories__item--active' : 'categories__item'}
						onClick={() => handleSelect(category)}
					>
						{category}
					</button>
				</li>
			))}

			<li className="categories__more" ref={moreRef}>
				<button
					className={isActiveHidden ? 'categories__item categories__item--active' : 'categories__item'}
					onClick={() => setIsMoreOpen((state) => !state)}
				>
					{isActiveHidden ? active : 'Ещё'}
					<ChevronIcon />
				</button>

				{isMoreOpen && (
					<ul className="categories__dropdown">
						{HIDDEN_CATEGORIES.map((category) => (
							<li
								key={category}
								className="categories__dropdown-item"
								onClick={() => handleSelect(category)}
							>
								{category}
							</li>
						))}
					</ul>
				)}
			</li>
		</ul>
	)
}

export default Categories
