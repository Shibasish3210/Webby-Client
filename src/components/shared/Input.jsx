const Input = ({ id, label, type, placeholder, refrence }) => {
	return (
		<div className="flex justify-between w-full items-center mb-2">
			<label className="w-fit" htmlFor={id}>
				{label}
			</label>
			<input
				className="w-8/12 Input"
				id={id}
				type={type}
				placeholder={placeholder}
				ref={refrence}
			/>
		</div>
	);
};

// value={value} onChange={e=>setValue(e.target.value)}
// value, setValue

export default Input;
