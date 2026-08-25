import ProductCardButton from './ProductCardButton'

function ProductCardFooter({ price, onAdd, canCustomise }) {
	return (
		<div className="product-card__footer">
			<span className="product-card__price">от {price} ₽</span>
			<ProductCardButton onClick={onAdd} canCustomise={canCustomise} />
		</div>
	)
}

export default ProductCardFooter
