const Button = ({value, type='button', func}) => {
  return (
    <button type={type} onClick={func} className="bg-slate-100 text-center text-black w-fit py-2 px-8" >{value}</button>
  )
}

export default Button
