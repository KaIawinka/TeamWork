import { useEffect, useRef, useState } from 'react'
import CategoryButton from './CategoryButton'
import CategoryDropdown from './CategoryDropdown'
import ChevronIcon from './ChevronIcon'
import '../../styles/Categories.css'

const VISIBLE_CATEGORIES = ['Все', 'Мясные', 'Острые', 'Сладкие', 'Вегетарианские', 'С курицей']
const HIDDEN_CATEGORIES = ['Сырные', 'Постные', 'Гриль']

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
					<CategoryButton active={active === category} onClick={() => handleSelect(category)}>
						{category}
					</CategoryButton>
				</li>
			))}

			<li className="categories__more" ref={moreRef}>
				<CategoryButton active={isActiveHidden} onClick={() => setIsMoreOpen((state) => !state)}>
					{isActiveHidden ? active : 'Ещё'}
					<ChevronIcon />
				</CategoryButton>

				{isMoreOpen && <CategoryDropdown categories={HIDDEN_CATEGORIES} onSelect={handleSelect} />}
			</li>
		</ul>
	)
}

export default Categories
