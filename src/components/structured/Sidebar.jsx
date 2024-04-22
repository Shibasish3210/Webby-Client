import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import callApi from '../../config/api'
import { removeUser } from "../../reduxToolkit/slices/userSlice";
import Button from "../shared/Button";
import DeletionModal from "./DeleteModal";

const Sidebar = () => {
    const [ isDeleting, setIsDeleting ] = useState(false);
    const user = useSelector(state=>state.userReducer.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {

        Cookies.remove('USER_TOKEN');
        dispatch(removeUser());
        navigate('/login')
    }


    const handleDeletion = async (e, email, password)=>{
      e.preventDefault();
      try {
        const response = await callApi.delete(`/auth/delete?email=${email.current.value}&password=${password.current.value}`,{
          headers:{
            userToken: Cookies.get('USER_TOKEN')
          }
        });
        if(response.data.status !== 200){
          toast.error(response.data.message);
          return;
        }
        Cookies.remove('USER_TOKEN');
        dispatch(removeUser());
        navigate('/');
        
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <>
    <div className="fixed right-0 h-screen top-0 bg-[#233d4d] flex flex-col p-8 gap-4 items-center z-10">
      <img className="h-32 w-32 mt-12 rounded-full object-center" src={user?.avatar} alt='Hello' />
      <div className="mt-auto flex flex-col items-center gap-8">
        <Button wide={true} func={()=>navigate('/dashboard')} value={'Dashboard'}/>
        <Button wide={true} func={()=>navigate('/explore')} value={'Explore'}/>
        <Button wide={true} func={handleLogOut} value={'Log Out'}/>
        <Button wide={true} func={()=>setIsDeleting(true)} value={'Delete Account'}/>
      </div>
    </div>
    {
      isDeleting && <DeletionModal exeFunc={handleDeletion} modalCloser={setIsDeleting}/>
    }
    </>
  )
}

export default Sidebar
