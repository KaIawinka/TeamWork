import SortIcon from './SortIcon'

function SortToggle({ current, onClick }) {
	return (
		<button className="sort__toggle" type="button" onClick={onClick}>
			<SortIcon />
			Сортировка: <span className="sort__value">{current.label}</span>
		</button>
	)
}

export default SortToggle
