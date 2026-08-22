import CheckIcon from './CheckIcon'

function FilterCheckbox({ checked, onChange, children }) {
	return (
		<label className="filter__checkbox">
			<input type="checkbox" checked={checked} onChange={onChange} />
			<span className="filter__checkbox-box">{checked && <CheckIcon />}</span>
			{children}
		</label>
	)
}

export default FilterCheckbox
