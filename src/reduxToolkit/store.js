import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import projectReducer from "./slices/project/projectSlice";
import modalReducer from "./slices/modal/modalSlice";

const store = configureStore({
	reducer: {
		userReducer,
		projectReducer,
		modalReducer,
	},
});

export default store;
