import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import callApi from '../config/api'
import Cookies from "js-cookie";

const Sidebar = () => {
    const user = useSelector(state=>state.userReducer.user);

    const navigate = useNavigate();
    const handleLogOut = () => {
        Cookies.remove('USER_TOKEN');
        navigate('/login')
    }

    const handleLogOutFromAllDevices = async ()=>{
      try {
        const response = await callApi.put('/auth/logout',null, {withCredentials: true});
        if(response.data.status === 200){
          Cookies.remove('USER_TOKEN');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }

    }
  return (
    <div className="absolute right-0 h-screen top-0 bg-slate-800 flex flex-col p-8 gap-4 items-center z-10">
      <img className="h-32 w-32 mt-12 rounded-full object-center" src={user?.avatar} alt='Hello' />
      <div className="mt-auto flex flex-col items-center gap-8">
        <Button func={handleLogOut} value={'Log Out'}/>
        <Button func={handleLogOutFromAllDevices} value={'Log Out From All Devices'}/>
      </div>
    </div>
  )
}

export default Sidebar
