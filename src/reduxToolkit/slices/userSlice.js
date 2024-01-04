import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setLoading: (state, action)=>{
            state.loading = action.payload;
            
        },
        addUser: (state,action)=>{
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        removeUser: (state)=>{
            state.user = null
        },
        setError: (state, action)=>{
            state.error = action.payload;
        }
    }
})

export const { addUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;