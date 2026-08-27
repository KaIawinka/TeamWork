import { useEffect, useRef, useState } from 'react'
import SortDropdown from './SortDropdown'
import SortToggle from './SortToggle'
import '../../styles/Sort.css'

const OPTIONS = [
	{ value: 'rating', label: 'рейтингу' },
	{ value: 'price', label: 'цене' },
	{ value: 'name', label: 'алфавиту' },
]

function Sort({ value, order, onChange }) {
	const [isOpen, setIsOpen] = useState(false)
	const sortRef = useRef(null)
	const current = OPTIONS.find((option) => option.value === value) || OPTIONS[0]

	useEffect(() => {
		function closeDropdown(event) {
			if (sortRef.current && !sortRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', closeDropdown)
		return () => document.removeEventListener('mousedown', closeDropdown)
	}, [])

	function chooseSort(option) {
		onChange(option.value)
		setIsOpen(false)
	}

	return (
		<div className="sort" ref={sortRef}>
			<SortToggle current={current} order={order} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && <SortDropdown options={OPTIONS} current={current} onSelect={chooseSort} />}
		</div>
	)
}

export default Sort
