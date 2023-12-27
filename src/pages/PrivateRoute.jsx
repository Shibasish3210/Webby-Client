import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import useAuthState from "../hooks/useAuthState";
import { toast } from "react-toastify";


const PrivateRoute = () => {
    useAuthState();
   const { loading, user, error } = useSelector(state => state.userReducer);
    
    if(loading){
        return <h1>Loading</h1>;
    }else if(error){
        toast.error(error);
        return <Navigate to='/login' replace/>;
    }else if(user){
        return <Outlet/>;
    }else{
        return <Navigate to='/login' replace/>;
    }
  
}

export default PrivateRoute;
