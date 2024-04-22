const Button = ({value, type='button', func, wide}) => {
  return (
    <button type={type} onClick={func} className={`Button ${wide && 'w-full'}`} >{value}</button>
  )
}

export default Button
