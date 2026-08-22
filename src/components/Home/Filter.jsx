import { useState } from 'react'
import FilterApplyButton from './FilterApplyButton'
import FilterCheckbox from './FilterCheckbox'
import IngredientsFilter from './IngredientsFilter'
import PriceRange from './PriceRange'
import '../../styles/Filter.css'

const INGREDIENTS = [
	{ id: 1, name: 'Сырный соус' },
	{ id: 2, name: 'Моцарелла' },
	{ id: 3, name: 'Чеснок' },
	{ id: 4, name: 'Солёные огурчики' },
	{ id: 5, name: 'Красный лук' },
	{ id: 6, name: 'Томаты' },
	{ id: 7, name: 'Грибы' },
	{ id: 8, name: 'Ветчина' },
	{ id: 9, name: 'Ананасы' },
]

const VISIBLE_COUNT = 6

function Filter({ onApply }) {
	const [canAssemble, setCanAssemble] = useState(false)
	const [isNew, setIsNew] = useState(false)
	const [priceFrom, setPriceFrom] = useState('0')
	const [priceTo, setPriceTo] = useState('1950')
	const [selectedIngredients, setSelectedIngredients] = useState([])
	const [showAllIngredients, setShowAllIngredients] = useState(false)

	const ingredientsToShow = showAllIngredients ? INGREDIENTS : INGREDIENTS.slice(0, VISIBLE_COUNT)

	function toggleIngredient(id) {
		setSelectedIngredients((current) =>
			current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
		)
	}

	function handleApply() {
		onApply({
			canAssemble,
			isNew,
			priceFrom: Number(priceFrom) || 0,
			priceTo: Number(priceTo) || 0,
			ingredients: selectedIngredients,
		})
	}

	return (
		<div className="filter">
			<h2 className="filter__title">Фильтрация</h2>

			<FilterCheckbox checked={canAssemble} onChange={(event) => setCanAssemble(event.target.checked)}>
				Можно собирать
			</FilterCheckbox>

			<FilterCheckbox checked={isNew} onChange={(event) => setIsNew(event.target.checked)}>
				Новинки
			</FilterCheckbox>

			<PriceRange
				priceFrom={priceFrom}
				priceTo={priceTo}
				onPriceFromChange={(event) => setPriceFrom(event.target.value)}
				onPriceToChange={(event) => setPriceTo(event.target.value)}
			/>

			<IngredientsFilter
				ingredients={INGREDIENTS}
				ingredientsToShow={ingredientsToShow}
				selectedIngredients={selectedIngredients}
				showAllIngredients={showAllIngredients}
				visibleCount={VISIBLE_COUNT}
				onToggleIngredient={toggleIngredient}
				onShowAll={() => setShowAllIngredients(true)}
			/>

			<FilterApplyButton onClick={handleApply} />
		</div>
	)
}

export default Filter
