function CategoryButton({ active, children, onClick }) {
	return (
		<button
			type="button"
			className={active ? 'categories__item categories__item--active' : 'categories__item'}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default CategoryButton
