import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';

const store = configureStore({
    reducer:{
        userReducer: userReducer,
        projectReducer: projectReducer
    }
});

export default store