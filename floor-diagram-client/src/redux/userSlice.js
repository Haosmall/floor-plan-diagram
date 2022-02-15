import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

const PREFIX = "user";

export const fetchUserProfile = createAsyncThunk(
	`${PREFIX}/fetchUser`,
	async (params, thunkApi) => {
		const user = await userApi.fetchUserProfile();
		return user;
	}
);

export const fetchListUsers = createAsyncThunk(
	`${PREFIX}/fetchListUsers`,
	async (params, thunkApi) => {
		const users = await userApi.fetchListUsers(params?.name);
		return users;
	}
);

const userSlice = createSlice({
	name: PREFIX,
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
