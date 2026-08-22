import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../redux/Auth/authSlice'
import { selectCartCount, selectCartTotal } from '../../redux/Cart/cartSlice'
import CartButton from './CartButton'
import LoginButton from './LoginButton'
import ProfileMenu from './ProfileMenu'

function HeaderActions({ onLoginClick }) {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const totalPrice = useSelector(selectCartTotal)
	const totalCount = useSelector(selectCartCount)

	return (
		<div className="header__actions">
			{isAuthenticated ? <ProfileMenu /> : <LoginButton onClick={onLoginClick} />}
			<CartButton totalPrice={totalPrice} totalCount={totalCount} />
		</div>
	)
}

export default HeaderActions
