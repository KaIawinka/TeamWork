function Pagination({ currentPage, pageCount, onChange }) {
	if (pageCount <= 1) return null

	return (
		<nav className="pagination" aria-label="Страницы каталога">
			<button type="button" className="pagination__button" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
				‹
			</button>
			{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
				<button
					type="button"
					className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
					key={page}
					onClick={() => onChange(page)}
				>
					{page}
				</button>
			))}
			<button type="button" className="pagination__button" disabled={currentPage === pageCount} onClick={() => onChange(currentPage + 1)}>
				›
			</button>
		</nav>
	)
}

export default Pagination