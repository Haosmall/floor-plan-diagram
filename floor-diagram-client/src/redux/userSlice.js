import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

const KEY = "user";

export const fetchUserProfile = createAsyncThunk(
	`${KEY}/fetchUser`,
	async (params, thunkApi) => {
		const user = await userApi.fetchUserProfile();
		return user;
	}
);

export const fetchListUsers = createAsyncThunk(
	`${KEY}/fetchListUsers`,
	async (params, thunkApi) => {
		const users = await userApi.fetchListUsers();
		return users;
	}
);

const userSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		isLogin: false,
		user: null,
		users: [],
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setLogin: (state, action) => {
			state.isLogin = action.payload;
		},
		logout: (state, action) => {
			state.isLogin = false;
			localStorage.removeItem("token");
			state.user = null;
		},
	},

	extraReducers: {
		// TODO: <-------------------- fetchUserProfile -------------------->
		[fetchUserProfile.pending]: (state, action) => {
			state.isLoading = false;
		},

		[fetchUserProfile.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.isLogin = true;
			state.user = action.payload;
		},

		[fetchUserProfile.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// TODO: <-------------------- fetchListUsers -------------------->
		[fetchListUsers.pending]: (state, action) => {
			state.isLoading = false;
		},

		[fetchListUsers.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.users = action.payload;
		},

		[fetchListUsers.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = userSlice;
export const { setLoading, setLogin, logout } = actions;
export default reducer;
