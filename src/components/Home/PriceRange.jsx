function PriceInput({ value, onChange }) {
	return (
		<div className="filter__price-input">
			<input type="number" value={value} onChange={onChange} />
			<span>₽</span>
		</div>
	)
}

function PriceRange({ priceFrom, priceTo, onPriceFromChange, onPriceToChange }) {
	return (
		<div className="filter__section">
			<h3 className="filter__subtitle">Цена от и до:</h3>
			<div className="filter__price">
				<PriceInput value={priceFrom} onChange={onPriceFromChange} />
				<PriceInput value={priceTo} onChange={onPriceToChange} />
			</div>
		</div>
	)
}

export default PriceRange
