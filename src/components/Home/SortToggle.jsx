import SortIcon from './SortIcon'

function SortToggle({ current, order, onClick }) {
	return (
		<button className="sort__toggle" type="button" onClick={onClick}>
			<SortIcon />
			Сортировка: <span className="sort__value">{current.label}</span>
			<span className="sort__direction" aria-hidden="true">
				{order === 'desc' ? '↓' : '↑'}
			</span>
		</button>
	)
}

export default SortToggle
