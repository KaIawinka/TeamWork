import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

function ProductSkeletons() {
	return Array.from({ length: 6 }).map((item, index) => <ProductCardSkeleton key={index} />)
}

function ProductList({ products, isLoading, error, onOpen, hasActiveFilters }) {
	const shouldShowSkeletons = isLoading

	return (
		<div className="home__products">
			{shouldShowSkeletons && <ProductSkeletons />}
			{!isLoading && error && <p className="home__message">Не удалось загрузить товары</p>}
			{!isLoading && !error && products.length === 0 && (
				<p className="home__message">
					{hasActiveFilters ? 'Товар не найден' : 'Каталог пока пуст. Добавьте товары через панель управления.'}
				</p>
			)}

			{!isLoading &&
				!error &&
				products.length > 0 &&
				products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onOpen={onOpen}
					/>
				))}
		</div>
	)
}

export default ProductList
