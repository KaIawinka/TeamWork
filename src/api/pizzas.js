import axios from 'axios'

const API_BASE_URL = 'https://pizza-api-pj4j.onrender.com'

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
	const imageUrl = pizza.imageUrl || pizza.image || ''

	return {
		...pizza,
		name: pizza.name || pizza.title,
		imageUrl: imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`,
	}
}

function matchesFilters(pizza, options) {
	const categoryField = CATEGORY_FIELDS[options.category]
	const ingredients = options.ingredients || []

	if (categoryField && !pizza[categoryField]) return false
	if (options.canAssemble && !pizza.canCustomise) return false
	if (options.isNew && !pizza.isNew) return false
	if (options.priceFrom !== undefined && pizza.price < options.priceFrom) return false
	if (options.priceTo !== undefined && pizza.price > options.priceTo) return false

	return ingredients.every((id) => pizza[INGREDIENT_FIELDS[id]])
}

export async function getPizzas(options = {}) {
	const response = await axios.get(`${API_BASE_URL}/api/v1/pizzas`)
	const pizzas = Array.isArray(response.data) ? response.data.map(normalizePizza) : []
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
