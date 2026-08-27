function CategoryDropdown({ categories, onSelect }) {
	return (
		<ul className="categories__dropdown">
			{categories.map((category) => (
				<li key={category}>
					<button
						type="button"
						className="categories__dropdown-item"
						onClick={() => onSelect(category)}
					>
						{category}
					</button>
				</li>
			))}
		</ul>
	)
}

export default CategoryDropdown
