import { useEffect } from "react";
import { authenticateUser } from "../reduxToolkit/slices/user/userSlice";
import { useDispatch } from "react-redux";

const useAuthState = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authenticateUser());
	}, [dispatch]);

	return [];
};

export default useAuthState;
