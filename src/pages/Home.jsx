import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Categories from '../components/Home/Categories'
import Sort from '../components/Home/Sort'
import Filter from '../components/Home/Filter'
import ProductCard, { ProductCardSkeleton } from '../components/Home/ProductCard'
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
				const response = await axios.get('/api/pizzas', {
					params: {
						category: category === 'Все' ? undefined : category,
						sortBy,
						canAssemble: filters?.canAssemble || undefined,
						isNew: filters?.isNew || undefined,
						priceFrom: filters?.priceFrom || undefined,
						priceTo: filters?.priceTo || undefined,
						ingredients: filters?.ingredients?.length ? filters.ingredients.join(',') : undefined,
					},
				})

				if (!isCancelled) {
					setProducts(response.data)
				}
			} catch (requestError) {
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

				<div className="home__products">
					{isLoading &&
						Array.from({ length: 6 }).map((item, index) => <ProductCardSkeleton key={index} />)}

					{!isLoading && error && (
						<p className="home__message">Не удалось загрузить пиццы. Попробуйте обновить страницу</p>
					)}

					{!isLoading && !error && products.length === 0 && (
						<p className="home__message">Ничего не найдено по заданным условиям</p>
					)}

					{!isLoading &&
						!error &&
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
			</div>
		</div>
	)
}

export default Home
