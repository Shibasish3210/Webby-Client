import { Navigate, Outlet } from "react-router-dom"
import useAuthState from "../hooks/useAuthState";


const PrivateRoute = () => {
    const [loading, user, error] = useAuthState();
    
    console.log(loading, user, error);
    if(loading){
        return <h1>Loading</h1>;
    }else if(error){
        return <Navigate to='/login' replace/>;
    }else if(user){
        return <Outlet/>;
    }else{
        return <h1> Nothing Coming {user}{loading}{error}</h1>
    }
  
}

export default PrivateRoute;
