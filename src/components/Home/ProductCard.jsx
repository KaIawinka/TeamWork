import ProductCardFooter from './ProductCardFooter'
import '../../styles/ProductCard.css'

function ProductCard({ product, onOpen }) {
	const { name, description, price, imageUrl, canCustomise } = product

	return (
		<div className="product-card">
			<button className="product-card__preview" type="button" onClick={() => onOpen(product)}>
				<span className="product-card__image-wrap">
					<img className="product-card__image" src={imageUrl} alt={name} />
				</span>
			</button>
			<button className="product-card__name-button" type="button" onClick={() => onOpen(product)}>
				<h3 className="product-card__name">{name}</h3>
			</button>
			<p className="product-card__description">{description}</p>
			<ProductCardFooter price={price} onAdd={() => onOpen(product)} canCustomise={canCustomise} />
		</div>
	)
}

export default ProductCard
