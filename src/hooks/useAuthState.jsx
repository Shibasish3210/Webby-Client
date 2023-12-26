import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { addUser } from '../reduxToolkit/slices/userSlice'
import callApi from "../config/api";
import { useDispatch } from "react-redux";

const useAuthState = () => {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(()=>{
    const Authenticate = async ()=>{
        setLoading(true);
        try {
            const response = await callApi.get('/auth/authenticate', { withCredentials: true });
            if(response.data.status === 200){
                const user = response.data.user;
                console.log(response.data)
                user.accessToken = Cookie.get('USER_TOKEN');
                dispatch(addUser({...user}));
                setUser({...user});
            }else{
                setError(response.data.message)
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    }
    return ()=>{
        Authenticate();
    }
  },[dispatch]);

  return [loading, user, error];
}

export default useAuthState;
