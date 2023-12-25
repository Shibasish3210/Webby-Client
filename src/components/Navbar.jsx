import { NavLink } from 'react-router-dom'

const Navbar = ({Element}) => {
  return (
    <div className='flex justify-between px-4 items-center'>
    <nav className='flex gap-4'>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/dashboard'}>Dashboard</NavLink>
    </nav>
    {Element && <Element/>}
    </div>
  )
}

export default Navbar
