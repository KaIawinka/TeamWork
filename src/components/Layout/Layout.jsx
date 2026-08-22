import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
	return (
		<div id="main">
			<Header />
			<main id="second-main">
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
