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
	{ id: 4, name: 'Соленые огурчики' },
	{ id: 5, name: 'Красный лук' },
	{ id: 6, name: 'Томаты' },
]

function Filter({ onApply }) {
	const [canAssemble, setCanAssemble] = useState(false)
	const [isNew, setIsNew] = useState(false)
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
	const [selectedIngredients, setSelectedIngredients] = useState([])

	function toggleIngredient(id) {
		if (selectedIngredients.includes(id)) {
			setSelectedIngredients(selectedIngredients.filter((item) => item !== id))
		} else {
			setSelectedIngredients([...selectedIngredients, id])
		}
	}

	function handleSubmit(event) {
		event.preventDefault()
		onApply({
			canAssemble,
			isNew,
			priceFrom: priceFrom ? Number(priceFrom) : undefined,
			priceTo: priceTo ? Number(priceTo) : undefined,
			ingredients: selectedIngredients,
		})
	}

	return (
		<form className="filter" onSubmit={handleSubmit}>
			<h2 className="filter__title">Фильтрация</h2>

			<FilterCheckbox checked={canAssemble} onChange={(event) => setCanAssemble(event.target.checked)}>
				Можно собрать
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
				ingredientsToShow={INGREDIENTS}
				selectedIngredients={selectedIngredients}
				showAllIngredients
				visibleCount={INGREDIENTS.length}
				onToggleIngredient={toggleIngredient}
				onShowAll={() => {}}
			/>

			<FilterApplyButton />
		</form>
	)
}

export default Filter
