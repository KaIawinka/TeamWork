import api, { API_BASE_URL } from './client'

const CATEGORY_FIELDS = {
	Мясные: 'isMeat',
	Острые: 'isSpicy',
	Сладкие: 'isSweet',
	Вегетарианские: 'isVegetarian',
	'С курицей': 'isChicken',
	Сырные: 'hasMozzarella',
	Постные: 'isVegetarian',
	Гриль: 'canCustomise',
}

const INGREDIENT_FIELDS = {
	1: 'hasCheeseSauce',
	2: 'hasMozzarella',
	3: 'hasGarlic',
	4: 'hasPickles',
	5: 'hasRedOnion',
	6: 'hasTomatoes',
}

function normalizePizza(pizza) {
	const imageUrl = pizza.imageUrl ?? pizza.image

	return {
		...pizza,
		name: pizza.name ?? pizza.title,
		imageUrl: imageUrl?.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl ?? ''}`,
	}
}

function matchesFilters(pizza, options) {
	const categoryField = CATEGORY_FIELDS[options.category]
	const ingredients = options.ingredients ?? []

	return (
		(!categoryField || pizza[categoryField]) &&
		(!options.canAssemble || pizza.canCustomise) &&
		(!options.isNew || pizza.isNew) &&
		(options.priceFrom === undefined || Number.isNaN(options.priceFrom) || pizza.price >= options.priceFrom) &&
		(options.priceTo === undefined || Number.isNaN(options.priceTo) || pizza.price <= options.priceTo) &&
		ingredients.every((id) => pizza[INGREDIENT_FIELDS[id]])
	)
}

export async function getPizzas(options = {}) {
	let apiPizzas = []

	try {
		const response = await api.get('/api/v1/pizzas')
		apiPizzas = Array.isArray(response.data) ? response.data.map(normalizePizza) : []
	} catch (error) {
		console.warn('Не удалось загрузить товары из API', error)
	}

	const pizzas = apiPizzas
	const query = options.search?.trim().toLowerCase()

	return pizzas
		.filter((pizza) => !query || pizza.name.toLowerCase().includes(query))
		.filter((pizza) => matchesFilters(pizza, options))
		.sort((first, second) => {
			if (options.sortBy === 'price') return first.price - second.price
			if (options.sortBy === 'name') return first.name.localeCompare(second.name, 'ru')
			return 0
		})
}

