import { useEffect } from "react";
import { addUser, setError, setLoading } from '../reduxToolkit/slices/userSlice'
import callApi from "../config/api";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const useAuthState = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    const Authenticate = async ()=>{
        dispatch(setLoading(true));
        try {
            const accessToken = Cookies.get('USER_TOKEN');
            const response = await callApi.get('/auth/authenticate', {
                headers:{
                    'userToken' : `${accessToken}`
                }
            });
            if(response.data.status === 200){
                const user = response.data.user;
                user.accessToken = accessToken;
                dispatch(addUser({...user}));
            }else{
                dispatch(setError(response.data.message))
            }
        } catch (error) {
            console.log(error);
            dispatch(setError(error.message));
        }
        dispatch(setLoading(false));
    }
    return ()=>{
        Authenticate();
    }
  },[dispatch]);

  return;
}

export default useAuthState;
