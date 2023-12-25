import { Navigate, Outlet } from "react-router-dom"
import useAuthState from "../hooks/useAuthState";


const PrivateRoute = () => {
    const [loading, user, error] = useAuthState();
    
    if(loading){
        return <h1>Loading</h1>;
    }else if(error){
        return <Navigate to='/login' replace/>;
    }else if(user){
        return <Outlet/>;
    }
  
}

export default PrivateRoute;
