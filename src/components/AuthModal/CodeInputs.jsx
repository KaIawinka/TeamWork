function CodeInputs({ code, codeRefs, onCodeChange, onCodeKeyDown }) {
	return (
		<div className="auth-modal__code">
			{code.map((digit, index) => (
				<input
					key={index}
					ref={(element) => (codeRefs.current[index] = element)}
					className="auth-modal__code-input"
					type="text"
					inputMode="numeric"
					maxLength={1}
					value={digit}
					onChange={(event) => onCodeChange(index, event.target.value)}
					onKeyDown={(event) => onCodeKeyDown(index, event)}
					autoFocus={index === 0}
				/>
			))}
		</div>
	)
}

export default CodeInputs
