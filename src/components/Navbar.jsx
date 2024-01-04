import { NavLink } from 'react-router-dom'

const Navbar = ({Element}) => {
  return (
    <nav className='flex justify-between px-4 items-center'>
    <div className='flex gap-4'>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/dashboard'}>Dashboard</NavLink>
    </div>
    {Element && <Element/>}
    </nav>
  )
}

export default Navbar
