const Input = ({id, label, type, placeholder, refrence}) => {
  return (
    <div className="flex gap-4 w-full items-center">
        <label className="w-3/12" htmlFor={id}>{label}</label>
        <input className="w-9/12 bg-transparent border-2 py-2 px-4 outline-none border-transparent   border-b-stone-300 focus:border-2 focus:border-stone-300" id={id} type={type} placeholder={placeholder} ref={refrence} />
    </div>
  )
}

// value={value} onChange={e=>setValue(e.target.value)}
// value, setValue

export default Input
