import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import callApi from '../config/api';
import { addUser } from '../reduxToolkit/slices/userSlice';
import Cookies from 'js-cookie';


const Login = () => {
  const loginId = useRef('');
  const password = useRef('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const response = await callApi.post('/auth/login', {
        loginId: loginId.current.value,
        password: password.current.value
      });
      if(response.data.status !== 200){
        toast.error(response.data.message);
        return;
      }

      const accessToken = response.data.accessToken;
      
      const user = response.data.user;
      user.accessToken = accessToken; 
      Cookies.set('USER_TOKEN', accessToken);
      dispatch(addUser({...user}));
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  return (
    <>
    <Navbar/>
    <form onSubmit={handleLogin}>
      <div className="inputFields">
        <Input id='loginId' label='User Name/ Email :' placeholder={'Enter your user name or email'} refrence={loginId}/>
        <Input id='password' type={'password'} label='Your Password :' placeholder={'Enter your Password'} refrence={password}/>
      </div>

      <div className="mt-20 w-full text-center">
        <Button type='submit' value={'Log In'}/>
        <p className='mt-4'>{`Don't Have An Account?`} <Link className='pl-3' to={'/register'}>Click Here!</Link> </p>
      </div>
    </form>
    </>
  )
}

export default Login
