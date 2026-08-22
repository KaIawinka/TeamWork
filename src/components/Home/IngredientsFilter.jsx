import FilterCheckbox from './FilterCheckbox'

function ShowAllButton({ onClick }) {
	return (
		<button className="filter__show-all" onClick={onClick}>
			+ Показать всё
		</button>
	)
}

function IngredientsFilter({
	ingredients,
	ingredientsToShow,
	selectedIngredients,
	showAllIngredients,
	visibleCount,
	onToggleIngredient,
	onShowAll,
}) {
	return (
		<div className="filter__section">
			<h3 className="filter__subtitle">Ингредиенты:</h3>
			{ingredientsToShow.map((ingredient) => (
				<FilterCheckbox
					key={ingredient.id}
					checked={selectedIngredients.includes(ingredient.id)}
					onChange={() => onToggleIngredient(ingredient.id)}
				>
					{ingredient.name}
				</FilterCheckbox>
			))}

			{!showAllIngredients && ingredients.length > visibleCount && <ShowAllButton onClick={onShowAll} />}
		</div>
	)
}

export default IngredientsFilter
