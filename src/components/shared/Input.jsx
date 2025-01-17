const Input = ({ id, label, type, placeholder, reference, required }) => {
	return (
		<div className="flex flex-col gap-2 justify-between w-full relative">
			<label className="font-light text-sm" htmlFor={id}>
				{label} :
				{required && (
					<span className="text-red-400 absolute right-0">*</span>
				)}
			</label>
			<input
				className="Input"
				id={id}
				type={type}
				placeholder={placeholder}
				ref={reference}
			/>
		</div>
	);
};

// value={value} onChange={e=>setValue(e.target.value)}
// value, setValue

export default Input;
