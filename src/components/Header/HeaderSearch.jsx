import { useEffect, useRef, useState } from 'react'
import { SearchIcon } from './HeaderIcons'
import { getPizzas } from '../../api/pizzas'

function highlightMatch(name, query) {
	const index = name.toLowerCase().indexOf(query.toLowerCase())
	if (index === -1) return name

	const before = name.slice(0, index)
	const match = name.slice(index, index + query.length)
	const after = name.slice(index + query.length)

	return (
		<>
			{before}
			<b>{match}</b>
			{after}
		</>
	)
}

function SearchResult({ item, query, onSelect }) {
	return (
		<li className="header__search-item" onClick={() => onSelect(item.name)}>
			<img className="header__search-item-image" src={item.imageUrl} alt={item.name} />
			<span className="header__search-item-name">{highlightMatch(item.name, query)}</span>
			<span className="header__search-item-price">{item.price}₽</span>
		</li>
	)
}

function SearchResults({ results, query, isLoading, onSelect }) {
	return (
		<ul className="header__search-dropdown">
			{isLoading && <li className="header__search-item">Поиск...</li>}
			{!isLoading && results.length === 0 && <li className="header__search-item">Ничего не найдено</li>}
			{!isLoading && results.map((item) => (
				<SearchResult key={item.id} item={item} query={query} onSelect={onSelect} />
			))}
		</ul>
	)
}

function HeaderSearch({ onSearchApply }) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const searchRef = useRef(null)
	const debounceRef = useRef(null)
	const requestIdRef = useRef(0)

	function applySearch(value) {
		const normalizedValue = value.trim()

		clearTimeout(debounceRef.current)
		requestIdRef.current += 1
		onSearchApply(normalizedValue)
		setIsSearchOpen(false)
		setResults([])
		setIsLoading(false)
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsSearchOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			clearTimeout(debounceRef.current)
			requestIdRef.current += 1
		}
	}, [])

	function handleSearchChange(event) {
		const value = event.target.value
		setQuery(value)
		clearTimeout(debounceRef.current)
		const requestId = ++requestIdRef.current

		if (!value.trim()) {
			setResults([])
			setIsSearchOpen(false)
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		setIsSearchOpen(true)
		debounceRef.current = setTimeout(async () => {
			try {
				const nextResults = await getPizzas({ search: value })
				if (requestId !== requestIdRef.current) return
				setResults(nextResults)
			} catch {
				if (requestId !== requestIdRef.current) return
				setResults([])
			} finally {
				if (requestId === requestIdRef.current) setIsLoading(false)
			}
		}, 300)
	}

	function handleSubmit(event) {
		event.preventDefault()
		applySearch(query)
	}

	function handleResultSelect(value) {
		setQuery(value)
		applySearch(value)
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
				onChange={handleSearchChange}
				onFocus={() => query.trim() && setIsSearchOpen(true)}
			/>

			{isSearchOpen && query.trim() && <SearchResults results={results} query={query} isLoading={isLoading} onSelect={handleResultSelect} />}
		</form>
	)
}

export default HeaderSearch
