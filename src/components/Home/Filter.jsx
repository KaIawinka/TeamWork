import { useState } from 'react'
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

function CheckIcon() {
	return (
		<svg width="10" height="8" viewBox="0 0 10 8" fill="none">
			<path d="M1 4L4 7L9 1" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

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

			<label className="filter__checkbox">
				<input type="checkbox" checked={canAssemble} onChange={(event) => setCanAssemble(event.target.checked)} />
				<span className="filter__checkbox-box">{canAssemble && <CheckIcon />}</span>
				Можно собирать
			</label>

			<label className="filter__checkbox">
				<input type="checkbox" checked={isNew} onChange={(event) => setIsNew(event.target.checked)} />
				<span className="filter__checkbox-box">{isNew && <CheckIcon />}</span>
				Новинки
			</label>

			<div className="filter__section">
				<h3 className="filter__subtitle">Цена от и до:</h3>
				<div className="filter__price">
					<div className="filter__price-input">
						<input
							type="number"
							value={priceFrom}
							onChange={(event) => setPriceFrom(event.target.value)}
						/>
						<span>₽</span>
					</div>
					<div className="filter__price-input">
						<input
							type="number"
							value={priceTo}
							onChange={(event) => setPriceTo(event.target.value)}
						/>
						<span>₽</span>
					</div>
				</div>
			</div>

			<div className="filter__section">
				<h3 className="filter__subtitle">Ингредиенты:</h3>
				{ingredientsToShow.map((ingredient) => (
					<label className="filter__checkbox" key={ingredient.id}>
						<input
							type="checkbox"
							checked={selectedIngredients.includes(ingredient.id)}
							onChange={() => toggleIngredient(ingredient.id)}
						/>
						<span className="filter__checkbox-box">
							{selectedIngredients.includes(ingredient.id) && <CheckIcon />}
						</span>
						{ingredient.name}
					</label>
				))}

				{!showAllIngredients && INGREDIENTS.length > VISIBLE_COUNT && (
					<button className="filter__show-all" onClick={() => setShowAllIngredients(true)}>
						+ Показать всё
					</button>
				)}
			</div>

			<button className="filter__apply" onClick={handleApply}>
				Применить
			</button>
		</div>
	)
}

export default Filter
