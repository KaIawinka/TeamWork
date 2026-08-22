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
]

const VISIBLE_COUNT = 6

function Filter({ onApply }) {
	const [canAssemble, setCanAssemble] = useState(false)
	const [isNew, setIsNew] = useState(false)
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
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
			priceFrom: priceFrom === '' ? undefined : Number(priceFrom),
			priceTo: priceTo === '' ? undefined : Number(priceTo),
			ingredients: selectedIngredients,
		})
	}

	return (
		<form className="filter" onSubmit={(event) => { event.preventDefault(); handleApply() }}>
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

			<FilterApplyButton />
		</form>
	)
}

export default Filter
