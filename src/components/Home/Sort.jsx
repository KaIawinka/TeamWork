import { useEffect, useRef, useState } from 'react'
import SortDropdown from './SortDropdown'
import SortToggle from './SortToggle'
import '../../styles/Sort.css'

const OPTIONS = [
	{ value: 'rating', label: 'рейтингу' },
	{ value: 'price', label: 'цене' },
	{ value: 'name', label: 'алфавиту' },
]

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
			<SortToggle current={current} onClick={() => setIsOpen((state) => !state)} />

			{isOpen && <SortDropdown options={OPTIONS} current={current} onSelect={handleSelect} />}
		</div>
	)
}

export default Sort
