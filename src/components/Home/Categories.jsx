import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CategoryButton from './CategoryButton'
import CategoryDropdown from './CategoryDropdown'
import ChevronIcon from './ChevronIcon'
import '../../styles/Categories.css'

const VISIBLE_CATEGORIES = ['Все', 'Мясные', 'Острые', 'Сладкие', 'Вегетарианские', 'С курицей']
const HIDDEN_CATEGORIES = ['Сырные', 'Постные', 'Гриль']

function Categories({ active, onSelect }) {
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [indicator, setIndicator] = useState(null)
	const moreRef = useRef(null)
	const categoriesRef = useRef(null)
	const categoryRefs = useRef(new Map())
	const isActiveHidden = HIDDEN_CATEGORIES.includes(active)

	useLayoutEffect(() => {
		function updateIndicator() {
			const activeCategory = categoryRefs.current.get(active) || categoryRefs.current.get('more')
			const categories = categoriesRef.current

			if (!activeCategory || !categories) return

			const categoryBounds = activeCategory.getBoundingClientRect()
			const categoriesBounds = categories.getBoundingClientRect()
			setIndicator({
				left: categoryBounds.left - categoriesBounds.left,
				top: categoryBounds.top - categoriesBounds.top,
				width: categoryBounds.width,
				height: categoryBounds.height,
			})
		}

		updateIndicator()
		window.addEventListener('resize', updateIndicator)
		return () => window.removeEventListener('resize', updateIndicator)
	}, [active])

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
		<ul className="categories" ref={categoriesRef}>
			{indicator && <span className="categories__indicator" style={indicator} aria-hidden="true" />}
			{VISIBLE_CATEGORIES.map((category) => (
				<li key={category} ref={(element) => categoryRefs.current.set(category, element)}>
					<CategoryButton active={active === category} onClick={() => chooseCategory(category)}>
						{category}
					</CategoryButton>
				</li>
			))}

			<li
				className="categories__more"
				ref={(element) => {
					moreRef.current = element
					categoryRefs.current.set('more', element)
				}}
			>
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
