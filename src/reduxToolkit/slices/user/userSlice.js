import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../../../config/api";
import { USER_CALL, USER_TOKEN } from "../../../helpers/apiEndpoints";
import { toast } from "react-toastify";

const initialState = {
	loading: false,
	user: null,
	error: null,
};

//async thunk for authenticating user
export const authenticateUser = createAsyncThunk(
	"user/authenticate",
	async (_, thunkAPI) => {
		try {
			const response = await callApi.get(
				`${USER_CALL.AUTHENTICATE_USER}`,
			);
			if (response.data.status === 200) {
				const user = response.data.user;
				return user;
			} else {
				toast.error(response.data.message);
				return thunkAPI.rejectWithValue(response.data.message);
			}
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
//async thunk for registering user
export const registerUser = createAsyncThunk(
	"user/register",
	async ({ name, email, userName, password, navigate }, thunkAPI) => {
		try {
			const response = await callApi.post(`${USER_CALL.REGISTER_USER}`, {
				name: name.current.value,
				userName: userName.current.value,
				email: email.current.value,
				password: password.current.value,
			});

			if (response.data.status !== 201) {
				return toast.error(response.data.message);
			}

			navigate("/login");
			return null;
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	},
);
//async thunk for logging user in
export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ loginId, password, navigate }, thunkAPI) => {
		try {
			const response = await callApi.post(`${USER_CALL.SIGN_IN_USER}`, {
				loginId: loginId,
				password: password,
			});
			if (response.data.status !== 200) {
				toast.error(response.data.message);
				return;
			}

			const accessToken = response.data.accessToken;

			const user = response.data.user;
			document.cookie =
				import.meta.env.VITE_ENVIRONMENT === "development"
					? `${USER_TOKEN}=${accessToken}; path=/;`
					: `${USER_TOKEN}=${accessToken}; path=/; httpOnly: true; secure: true; sameSite: "none"`;
			navigate("/dashboard");
			return user;
		} catch (error) {
			toast.error(error.message);
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

//async thunk for deleting user
export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async ({ email, password, navigate }, thunkAPI) => {
		try {
			const response = await callApi.delete(
				`${USER_CALL.DELETE_USER}?email=${email}&password=${password}`,
			);
			if (response.data.status !== 200) {
				toast.error(response.data.message);
				return null;
			}
			document.cookie =
				USER_TOKEN +
				"=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			navigate("/");
			return null;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

//async thunk for updating user details
export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (
		{ name, userName, email, password, newPassword, image, navigate },
		thunkAPI,
	) => {
		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("avatar", image);
			formData.append("userName", userName);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("newPassword", newPassword);
			console.log(formData);

			const response = await callApi.patch(
				USER_CALL.UPDATE_USER,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			if (response.data.status !== 200) {
				toast.error(response.data.message);
				return null;
			}
			console.log("here", response.data);
			// navigate("/dashboard");
			return response.data.user;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		addUser: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		removeUser: (state) => {
			state.user = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(authenticateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(authenticateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { addUser, setLoading, setError, removeUser } = userSlice.actions;
export default userSlice.reducer;
