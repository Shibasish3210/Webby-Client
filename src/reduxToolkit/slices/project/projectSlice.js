import { createSlice } from "@reduxjs/toolkit";
import {
	createProject,
	deleteProject,
	fetchInitialProject,
	fetchMoreProjects,
	fetchPublicProjects,
	getCurrentProject,
} from "./projectAction";

const initialState = {
	feedProjects: [],
	projects: [],
	currProject: null,
	loading: false,
	error: null,
	totalProjects: 0,
	totalFeedProjects: 0,
};

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		addCurrProject: (state, action) => {
			state.currProject = { ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch initial projects (initial load)
			.addCase(fetchInitialProject.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchInitialProject.fulfilled, (state, action) => {
				state.loading = false;
				state.projects = action.payload.projects;
				state.totalProjects = action.payload.total;
			})
			.addCase(fetchInitialProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Fetch public projects (initial load)
			.addCase(fetchPublicProjects.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPublicProjects.fulfilled, (state, action) => {
				state.loading = false;
				state.feedProjects = action.payload.feedProjects;
				state.totalFeedProjects = action.payload.total;
			})
			.addCase(fetchPublicProjects.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Fetch more projects(for InfiniteScroll)
			.addCase(fetchMoreProjects.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMoreProjects.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.type === "feed") {
					// Update public projects
					state.feedProjects = [
						...state.feedProjects,
						...action.payload.data,
					];
					state.totalFeedProjects = action.payload.total;
				} else {
					// Update user's projects
					state.projects = [
						...state.projects,
						...action.payload.data,
					];
					state.totalProjects = action.payload.total;
				}
			})
			.addCase(fetchMoreProjects.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Create project
			.addCase(createProject.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
				state.totalProjects += 1;
				state.projects = [action.payload, ...state.projects];
			})
			.addCase(createProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Delete project
			.addCase(deleteProject.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				state.loading = false;
				state.projects = [
					...state.projects.filter(
						(proj) => proj._id !== action.payload,
					),
				];
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Get Current project
			.addCase(getCurrentProject.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCurrentProject.fulfilled, (state, action) => {
				state.loading = false;
				state.currProject = { ...action.payload };
			})
			.addCase(getCurrentProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { addCurrProject } = projectSlice.actions;
export default projectSlice.reducer;
