function ProductCardButton({ onClick, canCustomise }) {
	return (
		<button type="button" className="product-card__btn" onClick={onClick}>
			{canCustomise ? 'Собрать' : 'Добавить'}
		</button>
	)
}

export default ProductCardButton
