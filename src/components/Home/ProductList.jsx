import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

function ProductSkeletons() {
	return Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
}

function ProductList({ products, isLoading, error, onOpen, hasActiveFilters }) {
	return (
		<div className="home__products">
			{isLoading && <ProductSkeletons />}
			{!isLoading && error && <p className="home__message">Не удалось загрузить товары</p>}
			{!isLoading && !error && products.length === 0 && (
				<p className="home__message">
					{hasActiveFilters ? 'Товар не найден' : 'Каталог пока пуст'}
				</p>
			)}
			{!isLoading && !error && products.map((product) => (
				<ProductCard key={product.id} product={product} onOpen={onOpen} />
			))}
		</div>
	)
}

export default ProductList
