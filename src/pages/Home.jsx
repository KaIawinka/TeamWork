import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Categories from '../components/Home/Categories'
import Sort from '../components/Home/Sort'
import Filter from '../components/Home/Filter'
import ProductList from '../components/Home/ProductList'
import Pagination from '../components/Home/Pagination'
import ProductModal from '../components/Home/ProductModal'
import { getPizzas } from '../api/pizzas'
import '../styles/Home.css'

function Home() {
	const { searchQuery } = useOutletContext()
	const [category, setCategory] = useState('Все')
	const [sortBy, setSortBy] = useState('rating')
	const [filters, setFilters] = useState(null)
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const productsPerPage = 6
	const pageCount = Math.ceil(products.length / productsPerPage)
	const safeCurrentPage = pageCount > 0 ? Math.min(currentPage, pageCount) : 1
	const visibleProducts = products.slice((safeCurrentPage - 1) * productsPerPage, safeCurrentPage * productsPerPage)
	const hasActiveFilters = Boolean(searchQuery?.trim()) || category !== 'Все' || Boolean(filters?.canAssemble || filters?.isNew || filters?.priceFrom !== undefined || filters?.priceTo !== undefined || filters?.ingredients?.length)

	useEffect(() => {
		let isCancelled = false

		async function fetchProducts() {
			setIsLoading(true)
			setError(false)

			try {
				const nextProducts = await getPizzas({
					category: category === 'Все' ? undefined : category,
					sortBy,
					search: searchQuery,
					...filters,
				})

				if (!isCancelled) {
					setProducts(nextProducts)
				}
			} catch {
				if (!isCancelled) {
					setError(true)
					setProducts([])
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false)
				}
			}
		}

		fetchProducts()

		return () => {
			isCancelled = true
		}
	}, [category, sortBy, filters, searchQuery])

	function handleCategoryChange(value) {
		setCategory(value)
		setCurrentPage(1)
	}

	function handleSortChange(value) {
		setSortBy(value)
		setCurrentPage(1)
	}

	function handleFilterApply(value) {
		setFilters(value)
		setCurrentPage(1)
	}

	return (
		<div className="home">
			<h1 className="home__title">Все пиццы</h1>

			<div className="home__controls">
				<Categories active={category} onSelect={handleCategoryChange} />
				<Sort value={sortBy} onChange={handleSortChange} />
			</div>

			<div className="home__body">
				<Filter onApply={handleFilterApply} />
				<ProductList products={visibleProducts} isLoading={isLoading} error={error} onOpen={setSelectedProduct} hasActiveFilters={hasActiveFilters} />
			</div>

			{!isLoading && !error && pageCount > 1 && (
				<Pagination currentPage={safeCurrentPage} pageCount={pageCount} onChange={setCurrentPage} />
			)}
			{selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
		</div>
	)
}

export default Home
