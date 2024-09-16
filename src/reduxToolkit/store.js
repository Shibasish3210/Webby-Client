import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import projectReducer from "./slices/project/projectSlice";

const store = configureStore({
	reducer: {
		userReducer: userReducer,
		projectReducer: projectReducer,
	},
});

export default store;
