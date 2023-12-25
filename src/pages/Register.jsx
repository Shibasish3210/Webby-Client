import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import Navbar from "../components/Navbar"
import { toast } from "react-toastify"
import callApi from "../config/api"

const Register = () => {
  const name = useRef('');
  const userName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const confPass = useRef('');
  const navigate = useNavigate();

  const handleRegistration = async (e)=>{
    e.preventDefault();
    console.log(name.current.value, email.current.value, password.current.value, password.current.value);

    try {
      const response = await callApi.post('/auth/register', {
        name: name.current.value,
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value
      })

      if(response.data.status !== 201){
        return toast.error(response.data.message);
      }

      navigate('/login')
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }
  return (
    <>
    <Navbar/>
    <form onSubmit={handleRegistration}>
      <div className="inputFields">
        <Input id='name' label='Your Name :' placeholder={'Elon Musk'} refrence={name}/>
        <Input id='userName' label='Your User Name :' placeholder={'Elon_The_Doge_God'} refrence={userName}/>
        <Input id='email' label='Your Email :' placeholder={'elon@tesla.com'} refrence={email}/>
        <Input id='password' type={'password'} label='Your Password :' placeholder={'abcd123!@#'} refrence={password}/>
        <Input id='cpassword' type={'password'} label='Confirm Your Password :' placeholder={'abcd123!@#'} refrence={confPass}/>
      </div>

      <div className="buttons">
        <Button type={'submit'} value={'Register'}/>
        <p className='mt-4'>{`Already Have An Account?`} <Link className='pl-3' to={'/login'}>Click Here!</Link> </p>
      </div>
    </form>
    </>
  )
}

export default Register
