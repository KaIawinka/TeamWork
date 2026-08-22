import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../redux/Auth/authSlice'
import CartButton from './CartButton'
import LoginButton from './LoginButton'
import ProfileMenu from './ProfileMenu'

function HeaderActions({ onLoginClick }) {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const totalPrice = useSelector((state) => state.cart?.totalPrice ?? 0)
	const totalCount = useSelector((state) => state.cart?.totalCount ?? 0)

	return (
		<div className="header__actions">
			{isAuthenticated ? <ProfileMenu /> : <LoginButton onClick={onLoginClick} />}
			<CartButton totalPrice={totalPrice} totalCount={totalCount} />
		</div>
	)
}

export default HeaderActions
