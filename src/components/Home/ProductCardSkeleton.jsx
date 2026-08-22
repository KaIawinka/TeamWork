function SkeletonLine({ style }) {
	return <div className="product-card__skeleton product-card__skeleton--line" style={style} />
}

function SkeletonPill({ style }) {
	return <div className="product-card__skeleton product-card__skeleton--pill" style={style} />
}

function ProductCardSkeleton() {
	return (
		<div className="product-card">
			<div className="product-card__image product-card__skeleton product-card__skeleton--circle" />
			<SkeletonLine style={{ width: '80%', height: 16 }} />
			<SkeletonLine style={{ width: '95%', marginTop: 10 }} />
			<SkeletonLine style={{ width: '40%', marginTop: 6 }} />
			<div className="product-card__footer">
				<SkeletonPill style={{ width: 70 }} />
				<SkeletonPill style={{ width: 90 }} />
			</div>
		</div>
	)
}

export default ProductCardSkeleton
