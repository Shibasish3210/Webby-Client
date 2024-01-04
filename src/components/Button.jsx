const Button = ({value, type='button', func}) => {
  return (
    <button type={type} onClick={func} className="Button" >{value}</button>
  )
}

export default Button
