import { Link } from 'react-router-dom'
import '../styles/Closed.css'

function Closed({ isModal = false, onClose }) {
	return (
		<div className={isModal ? 'closed closed--modal' : 'closed'}>
			{isModal && <button className="closed__overlay" type="button" aria-label="Закрыть" onClick={onClose} />}
			<div className="closed__window">
				{isModal && (
					<button className="closed__close" type="button" aria-label="Закрыть" onClick={onClose}>
						x
					</button>
				)}
				<div className="closed__icon" aria-hidden="true">
					!
				</div>
				<h2>Доступ запрещён</h2>
				<p>Зарегистрируйтесь или войдите в аккаунт, чтобы добавлять товары и открывать корзину.</p>
				<div className="closed__actions">
					<Link to="/" className="closed__button closed__button--primary" onClick={onClose}>
						На главную
					</Link>
					<button className="closed__button" type="button" onClick={() => window.location.reload()}>
						Обновить
					</button>
				</div>
			</div>
		</div>
	)
}

export default Closed
