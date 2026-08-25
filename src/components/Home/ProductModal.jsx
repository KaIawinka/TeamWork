import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Cart/cartSlice'
import './ProductModal.css'

const SIZES = [25, 30, 35]

function getPrice(price, size) {
	if (size === 35) return price + 100
	if (size === 30) return price + 50
	return price
}

function ProductModal({ product, onClose }) {
	const dispatch = useDispatch()
	const [size, setSize] = useState(30)
	const [dough, setDough] = useState(product.doughType === 'thin' ? 'thin' : 'traditional')
	const price = getPrice(product.price, size)
	const doughName = dough === 'thin' ? 'тонкое' : 'традиционное'

	function handleAdd() {
		dispatch(addToCart({
			...product,
			id: `${product.id}-${size}-${dough}`,
			price,
			size,
			dough,
		}))
		onClose()
	}

	return (
		<div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name}>
			<button className="product-modal__overlay" type="button" aria-label="Закрыть" onClick={onClose} />
			<div className="product-modal__window">
				<button className="product-modal__close" type="button" onClick={onClose} aria-label="Закрыть">
					x
				</button>

				<div className="product-modal__visual">
					<img src={product.imageUrl} alt={product.name} />
				</div>

				<div className="product-modal__details">
					<h2>{product.name}</h2>
					<p className="product-modal__meta">
						{size} см, {doughName} тесто
					</p>
					<p className="product-modal__description">{product.description}</p>

					<div className="product-modal__section">
						<span>Размер</span>
						<div className="product-modal__options">
							{SIZES.map((option) => (
								<button
									key={option}
									type="button"
									className={size === option ? 'is-active' : ''}
									onClick={() => setSize(option)}
								>
									{option} см
								</button>
							))}
						</div>
					</div>

					<div className="product-modal__section">
						<span>Тесто</span>
						<div className="product-modal__options">
							<button
								type="button"
								className={dough === 'traditional' ? 'is-active' : ''}
								onClick={() => setDough('traditional')}
							>
								Традиционное
							</button>
							<button
								type="button"
								className={dough === 'thin' ? 'is-active' : ''}
								onClick={() => setDough('thin')}
							>
								Тонкое
							</button>
						</div>
					</div>

					<button className="product-modal__add" type="button" onClick={handleAdd}>
						Добавить в корзину за {price} ₸
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductModal
