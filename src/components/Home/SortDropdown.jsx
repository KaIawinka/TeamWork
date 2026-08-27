function SortDropdown({ options, current, onSelect }) {
	return (
		<ul className="sort__dropdown">
			{options.map((option) => (
				<li key={option.value}>
					<button
						type="button"
						className={option.value === current.value ? 'sort__item sort__item--active' : 'sort__item'}
						onClick={() => onSelect(option)}
					>
						{option.label}
					</button>
				</li>
			))}
		</ul>
	)
}

export default SortDropdown
