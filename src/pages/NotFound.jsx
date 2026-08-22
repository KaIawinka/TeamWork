import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

function ArrowLeftIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M13 8H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
			<path d="M6.5 4L3 8L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function NotFoundIllustration() {
	return (
		<img
			className="not-found__illustration"
			src="./039-error-404-colour.svg"
			alt="Страница не найдена"
		/>
	)
}

function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found__text">
				<h1 className="not-found__title">Страница не найдена</h1>
				<p className="not-found__subtitle">
					Проверьте корректность введённого адреса или повторите попытку позже
				</p>

				<div className="not-found__actions">
					<Link to="/" className="not-found__btn not-found__btn--accent">
						<ArrowLeftIcon />
						На главную
					</Link>
					<button className="not-found__btn" onClick={() => window.location.reload()}>
						Обновить
					</button>
				</div>
			</div>

			<NotFoundIllustration />
		</div>
	)
}

export default NotFound
