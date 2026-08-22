import ProductCardFooter from './ProductCardFooter'
import '../../styles/ProductCard.css'

function ProductCard({ name, description, price, imageUrl }) {
	return (
		<div className="product-card">
			<img className="product-card__image" src={imageUrl} alt={name} />
			<h3 className="product-card__name">{name}</h3>
			<p className="product-card__description">{description}</p>
			<ProductCardFooter price={price} />
		</div>
	)
}

export default ProductCard
