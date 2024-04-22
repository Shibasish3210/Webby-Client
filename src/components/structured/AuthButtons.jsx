import { NavLink } from 'react-router-dom';

const AuthButtons = () => {

  return (
    <div className='flex gap-4'>
      <NavLink to={'/login'}>Log In</NavLink>
      <NavLink to={'/register'}>Sign Up</NavLink>
    </div>
  )
}

export default AuthButtons
