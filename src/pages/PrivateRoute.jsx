import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import useAuthState from "../hooks/useAuthState";
import { toast } from "react-toastify";


const PrivateRoute = () => {
    useAuthState();
    const { loading, user, error } = useSelector(state => state.userReducer);
    
    if(loading){
        return <h1 className="text-black text-4xl">Loading</h1>;
    }else if(error){
        toast.error(error);
        return <Navigate to='/login' replace/>;
    }else if(user){
        return <Outlet/>;
    }
  
}

export default PrivateRoute;
