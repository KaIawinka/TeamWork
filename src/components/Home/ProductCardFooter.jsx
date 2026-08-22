import ProductCardButton from './ProductCardButton'

function ProductCardFooter({ price }) {
	return (
		<div className="product-card__footer">
			<span className="product-card__price">от {price} ₽</span>
			<ProductCardButton />
		</div>
	)
}

export default ProductCardFooter
