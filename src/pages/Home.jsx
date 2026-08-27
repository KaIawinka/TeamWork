import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Categories from '../components/Home/Categories'
import Filter from '../components/Home/Filter'
import Pagination from '../components/Home/Pagination'
import ProductList from '../components/Home/ProductList'
import ProductModal from '../components/Home/ProductModal'
import Sort from '../components/Home/Sort'
import { getPizzas } from '../api/pizzas'
import '../styles/Home.css'

function Home() {
	const { searchQuery } = useOutletContext()
	const [category, setCategory] = useState('Все')
	const [sort, setSort] = useState({ field: 'rating', order: 'desc' })
	const [filters, setFilters] = useState({})
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	const productsPerPage = 6
	const pageCount = Math.ceil(products.length / productsPerPage)
	const safeCurrentPage = pageCount > 0 ? Math.min(currentPage, pageCount) : 1
	const startIndex = (safeCurrentPage - 1) * productsPerPage
	const visibleProducts = products.slice(startIndex, startIndex + productsPerPage)
	const hasActiveFilters = Boolean(
		searchQuery ||
		category !== 'Все' ||
		filters.canAssemble ||
		filters.isNew ||
		filters.priceFrom !== undefined ||
		filters.priceTo !== undefined ||
		filters.ingredients?.length,
	)

	useEffect(() => {
		async function loadProducts() {
			setIsLoading(true)
			setError(false)

			try {
				const data = await getPizzas({
					category: category === 'Все' ? undefined : category,
					sortBy: sort.field,
					sortOrder: sort.order,
					search: searchQuery,
					...filters,
				})
				setProducts(data)
			} catch {
				setProducts([])
				setError(true)
			} finally {
				setIsLoading(false)
			}
		}

		loadProducts()
	}, [category, sort, filters, searchQuery])

	function changeCategory(value) {
		setCategory(value)
		setCurrentPage(1)
	}

	function changeSort(value) {
		setSort((current) => ({
			field: value,
			order: current.field === value && current.order === 'asc' ? 'desc' : 'asc',
		}))
		setCurrentPage(1)
	}

	function applyFilters(value) {
		setFilters(value)
		setCurrentPage(1)
	}

	return (
		<div className="home">
			<h1 className="home__title">Все пиццы</h1>

			<div className="home__controls">
				<Categories active={category} onSelect={changeCategory} />
				<Sort value={sort.field} order={sort.order} onChange={changeSort} />
			</div>

			<div className="home__body">
				<Filter onApply={applyFilters} />
				<ProductList
					products={visibleProducts}
					isLoading={isLoading}
					error={error}
					onOpen={setSelectedProduct}
					hasActiveFilters={hasActiveFilters}
				/>
			</div>

			{!isLoading && !error && pageCount > 1 && (
				<Pagination currentPage={safeCurrentPage} pageCount={pageCount} onChange={setCurrentPage} />
			)}

			{selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
		</div>
	)
}

export default Home
