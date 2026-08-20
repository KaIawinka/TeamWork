import '../../styles/ProductCard.css'

function ProductCard({ name, description, price, imageUrl }) {
	return (
		<div className="product-card">
			<img className="product-card__image" src={imageUrl} alt={name} />
			<h3 className="product-card__name">{name}</h3>
			<p className="product-card__description">{description}</p>
			<div className="product-card__footer">
				<span className="product-card__price">от {price} ₽</span>
				<button className="product-card__btn">Добавить</button>
			</div>
		</div>
	)
}

export function ProductCardSkeleton() {
	return (
		<div className="product-card">
			<div className="product-card__image product-card__skeleton product-card__skeleton--circle" />
			<div className="product-card__skeleton product-card__skeleton--line" style={{ width: '80%', height: 16 }} />
			<div className="product-card__skeleton product-card__skeleton--line" style={{ width: '95%', marginTop: 10 }} />
			<div className="product-card__skeleton product-card__skeleton--line" style={{ width: '40%', marginTop: 6 }} />
			<div className="product-card__footer">
				<div className="product-card__skeleton product-card__skeleton--pill" style={{ width: 70 }} />
				<div className="product-card__skeleton product-card__skeleton--pill" style={{ width: 90 }} />
			</div>
		</div>
	)
}

export default ProductCard
