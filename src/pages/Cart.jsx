import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../redux/Cart/cartSlice'
import Closed from './Closed'
import '../styles/Cart.css'

function CartItem({ item, onRemove }) {
	const doughName = item.dough === 'thin' ? 'тонкое' : 'традиционное'

	return (
		<article className="cart-item">
			<img src={item.imageUrl} alt={item.name} />
			<div>
				<h2>{item.name}</h2>
				<p>
					{item.size} см, {doughName} тесто
				</p>
				<strong>
					{item.price} ₽ x {item.quantity}
				</strong>
			</div>
			<button type="button" onClick={onRemove}>
				-
			</button>
		</article>
	)
}

function EmptyCart() {
	return (
		<div className="cart-page__empty">
			<h2>Корзина пуста</h2>
			<p>Добавьте пиццу из каталога, чтобы оформить заказ.</p>
			<Link to="/" className="cart-page__button">
				Выбрать пиццу
			</Link>
		</div>
	)
}

function Cart() {
	const dispatch = useDispatch()
	const isLogin = useSelector((state) => state.auth.isLogin)
	const items = useSelector((state) => state.cart.items)
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

	if (!isLogin) return <Closed />

	return (
		<section className="cart-page">
			<div className="cart-page__heading">
				<h1>Корзина</h1>
				<Link to="/">Вернуться в каталог</Link>
			</div>

			{items.length === 0 ? (
				<EmptyCart />
			) : (
				<div className="cart-page__layout">
					<div className="cart-page__items">
						{items.map((item) => (
							<CartItem key={item.id} item={item} onRemove={() => dispatch(removeFromCart(item.id))} />
						))}

						<button type="button" className="cart-page__clear" onClick={() => dispatch(clearCart())}>
							Очистить корзину
						</button>
					</div>

					<aside className="cart-summary">
						<h2>Ваш заказ</h2>
						<div>
							<span>Товары</span>
							<strong>{total} ₽</strong>
						</div>
						<div>
							<span>Доставка</span>
							<strong>Бесплатно</strong>
						</div>
						<hr />
						<div className="cart-summary__total">
							<span>Итого</span>
							<strong>{total} ₽</strong>
						</div>
						<button className="cart-page__button" type="button">
							Оформить заказ
						</button>
					</aside>
				</div>
			)}
		</section>
	)
}

export default Cart
