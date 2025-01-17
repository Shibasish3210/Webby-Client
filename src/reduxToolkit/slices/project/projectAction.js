import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import callApi from "../../../config/api";
import { PROJECT_CALL } from "../../../helpers/apiEndpoints";

export const fetchPublicProjects = createAsyncThunk(
	"project/fetchPublicProjects",
	async (_, thunkAPI) => {
		try {
			const response = await callApi.get(PROJECT_CALL.GET_FEED_PROJECTS);
			const data = response.data;

			if (data.status !== 200) {
				toast.error(data.message);
				return thunkAPI.rejectWithValue(data.message);
			}

			return {
				feedProjects: data.data.data,
				total: data.data.metadata[0]?.total,
			};
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const fetchMoreProjects = createAsyncThunk(
	"project/fetchMoreProjects",
	async ({ skipCount, type }, thunkAPI) => {
		try {
			const endpoint =
				type === "feed"
					? PROJECT_CALL.GET_FEED_PROJECTS
					: PROJECT_CALL.GET_PERSONAL_PROJECT;
			const response = await callApi.get(`${endpoint}?skip=${skipCount}`);
			const data = response.data;

			if (data.status !== 200) {
				toast.error(data.message);
				return thunkAPI.rejectWithValue(data.message);
			}

			return {
				data: data.data.data,
				total: data.data.metadata[0]?.total,
				type,
			};
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const fetchInitialProject = createAsyncThunk(
	"project/fetchInitialProject",
	async (_, thunkAPI) => {
		try {
			const response = await callApi.get(
				PROJECT_CALL.GET_PERSONAL_PROJECT,
			);
			const data = response.data;

			if (data.status !== 200) {
				toast.error(data.message);
				return thunkAPI.rejectWithValue(data.message);
			}

			return {
				projects: data.data.data,
				total: data.data.metadata[0]?.total,
			};
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const createProject = createAsyncThunk(
	"project/createProject",
	async ({ projectName, projectDesc, isPublished }, thunkAPI) => {
		try {
			const response = await callApi.post(PROJECT_CALL.CREATE_PROJECT, {
				name: projectName.current.value,
				details: projectDesc.current.value,
				visibility: isPublished,
			});

			const data = response.data;

			if (data.status !== 200) {
				toast.error(data.message);
				return thunkAPI.rejectWithValue(data.message);
			}

			toast.success(data.message);
			return data.data;
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const deleteProject = createAsyncThunk(
	"project/delete",
	async ({ projName, name, _id }, thunkAPI) => {
		if (projName !== name) {
			toast.error("Sorry, project name doesn't match with actual name");
			return;
		}
		try {
			const response = await callApi.delete(
				`${PROJECT_CALL.DELETE_PROJECT}${_id}`,
			);
			if (response.data.status !== 200) {
				toast.error(response.data.message);
				return;
			}
			toast.success(response.data.message);
			return _id;
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const getCurrentProject = createAsyncThunk(
	"project/getCurrentProject",
	async (projectId, thunkAPI) => {
		try {
			const response = await callApi.get(`/project/${projectId}`);

			if (response.data.status !== 200) {
				toast.error(response.data.message);
			}

			return response.data.data;
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const updateCurrentProject = createAsyncThunk(
	"project/updateCurrentProject",
	async ({ currProjData }, thunkAPI) => {
		try {
			const { projectId, html, css, js } = currProjData;
			const response = await callApi.patch(PROJECT_CALL.UPDATE_PROJECT, {
				projectId,
				html,
				css,
				js,
			});

			const data = response.data;

			if (data.status !== 200) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
			return response.data;
		} catch (error) {
			toast.error(error.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
