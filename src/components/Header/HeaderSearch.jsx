import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { SearchIcon } from './HeaderIcons'

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

function SearchResult({ item, query }) {
	return (
		<li className="header__search-item">
			<img className="header__search-item-image" src={item.imageUrl} alt={item.name} />
			<span className="header__search-item-name">{highlightMatch(item.name, query)}</span>
			<span className="header__search-item-price">{item.price}₽</span>
		</li>
	)
}

function SearchResults({ results, query }) {
	return (
		<ul className="header__search-dropdown">
			{results.map((item) => (
				<SearchResult key={item.id} item={item} query={query} />
			))}
		</ul>
	)
}

function HeaderSearch() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const searchRef = useRef(null)
	const debounceRef = useRef(null)

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
		}
	}, [])

	function handleSearchChange(event) {
		const value = event.target.value
		setQuery(value)
		clearTimeout(debounceRef.current)

		if (!value.trim()) {
			setResults([])
			setIsSearchOpen(false)
			return
		}

		debounceRef.current = setTimeout(async () => {
			try {
				const response = await axios.get('/api/pizzas', { params: { search: value } })
				const nextResults = Array.isArray(response.data) ? response.data : []
				setResults(nextResults)
				setIsSearchOpen(nextResults.length > 0)
			} catch {
				setResults([])
				setIsSearchOpen(false)
			}
		}, 300)
	}

	return (
		<div className="header__search" ref={searchRef}>
			<span className="header__search-icon">
				<SearchIcon />
			</span>
			<input
				className="header__search-input"
				type="text"
				placeholder="Поиск пиццы..."
				value={query}
				onChange={handleSearchChange}
				onFocus={() => query && results.length > 0 && setIsSearchOpen(true)}
			/>

			{isSearchOpen && results.length > 0 && <SearchResults results={results} query={query} />}
		</div>
	)
}

export default HeaderSearch
