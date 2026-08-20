import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Sort.css'

const OPTIONS = [
	{ value: 'rating', label: 'рейтингу' },
	{ value: 'price', label: 'цене' },
	{ value: 'name', label: 'алфавиту' },
]

function SortIcon() {
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
			<path d="M4 2V12M4 12L1.5 9.5M4 12L6.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10 12V2M10 2L7.5 4.5M10 2L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function Sort({ value, onChange }) {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const current = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0]

	function handleSelect(option) {
		onChange(option.value)
		setIsOpen(false)
	}

	return (
		<div className="sort" ref={ref}>
			<button className="sort__toggle" onClick={() => setIsOpen((state) => !state)}>
				<SortIcon />
				Сортировка: <span className="sort__value">{current.label}</span>
			</button>

			{isOpen && (
				<ul className="sort__dropdown">
					{OPTIONS.map((option) => (
						<li
							key={option.value}
							className={option.value === current.value ? 'sort__item sort__item--active' : 'sort__item'}
							onClick={() => handleSelect(option)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Sort
