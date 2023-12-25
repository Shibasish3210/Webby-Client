import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    currProject: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers:{
        addProjects: (state,action)=>{
            state.projects = [...action.payload];
        },
        addCurrProject: (state,action)=>{
            state.currProject = {...action.payload};
        },
        removeCurrProject: (state)=>{
            state.currProject = null;
        },
        deleteProject: (state,action)=>{
            state.projects = [...state.projects.filter(proj => proj._id !== action.payload)];
        }
    }
})

export const { addProjects, addCurrProject, removeCurrProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;