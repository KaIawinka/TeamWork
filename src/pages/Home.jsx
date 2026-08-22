import { useEffect, useState } from 'react'
import Categories from '../components/Home/Categories'
import Sort from '../components/Home/Sort'
import Filter from '../components/Home/Filter'
import ProductList from '../components/Home/ProductList'
import { getPizzas } from '../api/pizzas'
import '../styles/Home.css'

function Home() {
	const [category, setCategory] = useState('Все')
	const [sortBy, setSortBy] = useState('rating')
	const [filters, setFilters] = useState(null)
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		let isCancelled = false

		async function fetchProducts() {
			setIsLoading(true)
			setError(false)

			try {
				const nextProducts = await getPizzas({
					category: category === 'Все' ? undefined : category,
					sortBy,
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
	}, [category, sortBy, filters])

	return (
		<div className="home">
			<h1 className="home__title">Все пиццы</h1>

			<div className="home__controls">
				<Categories active={category} onSelect={setCategory} />
				<Sort value={sortBy} onChange={setSortBy} />
			</div>

			<div className="home__body">
				<Filter onApply={setFilters} />
				<ProductList products={products} isLoading={isLoading} error={error} />
			</div>
		</div>
	)
}

export default Home
