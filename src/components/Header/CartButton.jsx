import { Link } from 'react-router-dom'
import { CartIcon } from './HeaderIcons'

function FilledCart({ totalPrice, totalCount }) {
	return (
		<>
			<span className="header__cart-price">{totalPrice} ₽</span>
			<span className="header__cart-divider" />
			<CartIcon />
			<span className="header__cart-count">{totalCount}</span>
		</>
	)
}

function CartButton({ totalPrice, totalCount }) {
	const className = totalCount > 0 ? 'header__cart header__cart--filled' : 'header__cart'

	return (
		<Link to="/cart" className={className}>
			{totalCount > 0 ? <FilledCart totalPrice={totalPrice} totalCount={totalCount} /> : <CartIcon />}
		</Link>
	)
}

export default CartButton
