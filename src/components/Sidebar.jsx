import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import Button from "./Button";
import callApi from '../config/api'
import { removeUser } from "../reduxToolkit/slices/userSlice";

const Sidebar = () => {
    const user = useSelector(state=>state.userReducer.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {

        Cookies.remove('USER_TOKEN');
        dispatch(removeUser());
        navigate('/login')
    }

    const handleDeletion = async ()=>{
      try {
        const response = await callApi.delete('/auth/delete',{
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
    <div className="absolute right-0 h-screen top-0 bg-[#233d4d] flex flex-col p-8 gap-4 items-center z-10">
      <img className="h-32 w-32 mt-12 rounded-full object-center" src={user?.avatar} alt='Hello' />
      <div className="mt-auto flex flex-col items-center gap-8">
        <Button func={handleLogOut} value={'Log Out'}/>
        <Button func={handleDeletion} value={'Delete Account'}/>
      </div>
    </div>
  )
}

export default Sidebar
