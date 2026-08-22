import { useState } from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div id="main">
			<Header onSearchApply={setSearchQuery} />
			<main id="second-main">
				<Outlet context={{ searchQuery }} />
			</main>
		</div>
	)
}

export default Layout
