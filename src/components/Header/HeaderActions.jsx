import { useSelector } from 'react-redux'
import CartButton from './CartButton'
import LoginButton from './LoginButton'
import ProfileMenu from './ProfileMenu'

function HeaderActions({ onLoginClick }) {
	const isLogin = useSelector((state) => state.auth.isLogin)
	const cartItems = useSelector((state) => state.cart.items)
	const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0)
	const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

	return (
		<div className="header__actions">
			{isLogin ? <ProfileMenu /> : <LoginButton onClick={onLoginClick} />}
			<CartButton totalPrice={totalPrice} totalCount={totalCount} />
		</div>
	)
}

export default HeaderActions
