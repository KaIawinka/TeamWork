import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart, selectCartItems, selectCartTotal } from '../redux/Cart/cartSlice'
import '../styles/Cart.css'

function Cart() {
	const dispatch = useDispatch()
	const items = useSelector(selectCartItems)
	const total = useSelector(selectCartTotal)

	return (
		<section className="cart-page">
			<div className="cart-page__heading"><h1>Корзина</h1><Link to="/">Вернуться в каталог</Link></div>
			{items.length === 0 ? <div className="cart-page__empty"><h2>Корзина пуста</h2><p>Добавьте пиццу из каталога, чтобы оформить заказ.</p><Link to="/" className="cart-page__button">Выбрать пиццу</Link></div> : (
				<div className="cart-page__layout">
					<div className="cart-page__items">
						{items.map((item) => <article className="cart-item" key={item.id}><img src={item.imageUrl} alt={item.name} /><div><h2>{item.name}</h2><p>{item.size} см, {item.dough === 'thin' ? 'тонкое' : 'традиционное'} тесто</p><strong>{item.price} ₽ × {item.quantity}</strong></div><button type="button" onClick={() => dispatch(removeFromCart(item.id))}>−</button></article>)}
						<button type="button" className="cart-page__clear" onClick={() => dispatch(clearCart())}>Очистить корзину</button>
					</div>
					<aside className="cart-summary"><h2>Ваш заказ</h2><div><span>Товары</span><strong>{total} ₽</strong></div><div><span>Доставка</span><strong>Бесплатно</strong></div><hr /><div className="cart-summary__total"><span>Итого</span><strong>{total} ₽</strong></div><button className="cart-page__button" type="button">Оформить заказ</button></aside>
				</div>
			)}
		</section>
	)
}

export default Cart