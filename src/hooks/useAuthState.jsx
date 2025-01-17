import { useEffect } from "react";
import { authenticateUser } from "../reduxToolkit/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useAuthState = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);

	useEffect(() => {
		if (!user) {
			dispatch(authenticateUser());
		}
	}, [dispatch]);

	return [];
};

export default useAuthState;
