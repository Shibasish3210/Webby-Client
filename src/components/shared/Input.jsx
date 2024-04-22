const Input = ({id, label, type, placeholder, refrence}) => {
  return (
    <div className="flex gap-4 w-full items-center">
        <label className="w-3/12" htmlFor={id}>{label}</label>
        <input className="w-9/12 Input" id={id} type={type} placeholder={placeholder} ref={refrence} />
    </div>
  )
}

// value={value} onChange={e=>setValue(e.target.value)}
// value, setValue

export default Input
