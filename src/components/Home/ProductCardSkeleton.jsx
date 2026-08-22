function SkeletonLine({ style }) {
	return <div className="product-card__skeleton product-card__skeleton--line" style={style} />
}

function SkeletonPill({ style }) {
	return <div className="product-card__skeleton product-card__skeleton--pill" style={style} />
}

function ProductCardSkeleton() {
	return (
		<div className="product-card">
			<div className="product-card__image-wrap">
				<div className="product-card__skeleton product-card__skeleton--circle" />
			</div>
			<SkeletonLine style={{ width: '72%', height: 18 }} />
			<SkeletonLine style={{ width: '100%', marginTop: 12 }} />
			<SkeletonLine style={{ width: '86%', marginTop: 6 }} />
			<SkeletonLine style={{ width: '58%', marginTop: 6 }} />
			<div className="product-card__footer">
				<SkeletonPill style={{ width: 70 }} />
				<SkeletonPill style={{ width: 90 }} />
			</div>
		</div>
	)
}

export default ProductCardSkeleton
