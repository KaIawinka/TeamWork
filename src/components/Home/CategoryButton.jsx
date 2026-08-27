function CategoryButton({ children, onClick }) {
	return (
		<button
			type="button"
			className="categories__item"
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default CategoryButton
