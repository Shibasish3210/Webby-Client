import AuthButtons from '../components/AuthButtons';
import Navbar from '../components/Navbar';
import Hero from '../assets/hero.svg';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
    <Navbar Element={AuthButtons}/>
    
    <div className='w-[90vw] m-auto h-[90vh mt-4 flex items-center'>
      <div className='w-[50%] p-8'>
      <h1 className='text-5xl mb-8 tracking-tighter'>Code, Compile, and Create</h1>
      <p className=' w-4/5 mb-8 leading-7 tracking-wider'>A simple and powerful online HTML, CSS, JS compiler that lets you build and run your web projects in minutes.</p>
      <Button value={'Start Coding'}/>
      </div>
      <div className='w-[50%]'>
        <img src={Hero} alt="hero_image" className=' h-[75%] object-cover' />
      </div>
    </div>
    </div>
  )
}

export default Home
