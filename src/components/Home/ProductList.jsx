import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

function ProductSkeletons() {
	return Array.from({ length: 6 }).map((item, index) => <ProductCardSkeleton key={index} />)
}

function ProductList({ products, isLoading, error }) {
	const shouldShowSkeletons = isLoading || error || products.length === 0

	return (
		<div className="home__products">
			{shouldShowSkeletons && <ProductSkeletons />}

			{!isLoading &&
				!error &&
				products.length > 0 &&
				products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						description={product.description}
						price={product.price}
						imageUrl={product.imageUrl}
					/>
				))}
		</div>
	)
}

export default ProductList
