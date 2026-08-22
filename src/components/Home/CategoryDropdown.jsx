function CategoryDropdown({ categories, onSelect }) {
	return (
		<ul className="categories__dropdown">
			{categories.map((category) => (
				<li
					key={category}
					className="categories__dropdown-item"
					onClick={() => onSelect(category)}
				>
					{category}
				</li>
			))}
		</ul>
	)
}

export default CategoryDropdown
