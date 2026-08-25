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
	const isActiveHidden = HIDDEN_CATEGORIES.includes(active)

	useEffect(() => {
		function closeDropdown(event) {
			if (moreRef.current && !moreRef.current.contains(event.target)) {
				setIsMoreOpen(false)
			}
		}

		document.addEventListener('mousedown', closeDropdown)
		return () => document.removeEventListener('mousedown', closeDropdown)
	}, [])

	function chooseCategory(category) {
		onSelect(category)
		setIsMoreOpen(false)
	}

	return (
		<ul className="categories">
			{VISIBLE_CATEGORIES.map((category) => (
				<li key={category}>
					<CategoryButton active={active === category} onClick={() => chooseCategory(category)}>
						{category}
					</CategoryButton>
				</li>
			))}

			<li className="categories__more" ref={moreRef}>
				<CategoryButton active={isActiveHidden} onClick={() => setIsMoreOpen(!isMoreOpen)}>
					{isActiveHidden ? active : 'Ещё'}
					<ChevronIcon />
				</CategoryButton>

				{isMoreOpen && <CategoryDropdown categories={HIDDEN_CATEGORIES} onSelect={chooseCategory} />}
			</li>
		</ul>
	)
}

export default Categories
