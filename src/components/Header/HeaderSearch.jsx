import { useEffect, useRef, useState } from 'react'
import { getPizzas } from '../../api/pizzas'
import { SearchIcon } from './HeaderIcons'

function highlightMatch(name, query) {
	const index = name.toLowerCase().indexOf(query.toLowerCase())
	if (index === -1) return name

	return (
		<>
			{name.slice(0, index)}
			<b>{name.slice(index, index + query.length)}</b>
			{name.slice(index + query.length)}
		</>
	)
}

function SearchResult({ item, query, onSelect }) {
	return (
		<li className="header__search-item" onClick={() => onSelect(item.name)}>
			<img className="header__search-item-image" src={item.imageUrl} alt={item.name} />
			<span className="header__search-item-name">{highlightMatch(item.name, query)}</span>
			<span className="header__search-item-price">{item.price}₸</span>
		</li>
	)
}

function HeaderSearch({ onSearchApply }) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const searchRef = useRef(null)

	useEffect(() => {
		function closeSearch(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', closeSearch)
		return () => document.removeEventListener('mousedown', closeSearch)
	}, [])

	useEffect(() => {
		if (!query.trim()) return

		const timerId = setTimeout(async () => {
			setIsLoading(true)
			setIsOpen(true)

			try {
				const data = await getPizzas({ search: query })
				setResults(data)
			} catch {
				setResults([])
			} finally {
				setIsLoading(false)
			}
		}, 300)

		return () => clearTimeout(timerId)
	}, [query])

	function handleChange(event) {
		const value = event.target.value
		setQuery(value)

		if (!value.trim()) {
			setResults([])
			setIsOpen(false)
		}
	}

	function applySearch(value) {
		const text = value.trim()
		onSearchApply(text)
		setQuery(text)
		setIsOpen(false)
	}

	function handleSubmit(event) {
		event.preventDefault()
		applySearch(query)
	}

	return (
		<form className="header__search" ref={searchRef} onSubmit={handleSubmit}>
			<span className="header__search-icon">
				<SearchIcon />
			</span>

			<input
				className="header__search-input"
				type="text"
				placeholder="Поиск пиццы..."
				value={query}
				onChange={handleChange}
				onFocus={() => query.trim() && setIsOpen(true)}
			/>

			{isOpen && query.trim() && (
				<ul className="header__search-dropdown">
					{isLoading && <li className="header__search-item">Поиск...</li>}
					{!isLoading && results.length === 0 && <li className="header__search-item">Ничего не найдено</li>}
					{!isLoading && results.map((item) => (
						<SearchResult key={item.id} item={item} query={query} onSelect={applySearch} />
					))}
				</ul>
			)}
		</form>
	)
}

export default HeaderSearch
