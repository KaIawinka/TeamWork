import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router'

function Layout() {
	return (
		<>
			<main id='main'>
				<Header />
					<main id='second-main'>
							<Outlet />
					</main>
			</main>
		</>
	)
}

export default Layout
