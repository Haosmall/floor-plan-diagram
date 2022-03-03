import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeApi from "api/employeeApi";
import userApi from "../api/userApi";

const PREFIX = "employee";

export const fetchUserProfile = createAsyncThunk(
	`${PREFIX}/fetchUserProfile`,
	async (params, thunkApi) => {
		const user = await userApi.fetchUserProfile();
		return user;
	}
);

export const fetchListEmployees = createAsyncThunk(
	`${PREFIX}/fetchListEmployees`,
	async (params, thunkApi) => {
		const employees = await employeeApi.fetchListEmployees();
		return employees;
	}
);

const employeeSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		isLogin: false,
		user: null,
		employees: [],
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

		setUser: (state, action) => {
			state.user = action.payload;
		},

		addNewEmployee: (state, action) => {
			state.employees.push(action.payload);
		},

		updateEmployee: (state, action) => {
			const employee = action.payload;
			const listEmployee = state.employees;

			const index = listEmployee.findIndex((ele) => ele._id === employee._id);

			state.employees[index] = employee;
		},

		deleteEmployee: (state, action) => {
			const employeeId = action.payload;
			const currentEmployees = state.employees;

			const newListEmployees = currentEmployees.filter(
				(ele) => ele._id !== employeeId
			);

			state.employees = newListEmployees;
		},

		updateProfile: (state, action) => {
			const newProfile = action.payload;

			const index = state.employees.findIndex(
				(ele) => ele._id === newProfile._id
			);

			if (index >= 0) {
				state.employees[index] = newProfile;
			}
			state.user = newProfile;
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

			if (!("isBuildingAdmin" in action.payload)) state.user.isAdmin = true;
		},

		[fetchUserProfile.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// TODO: <-------------------- fetchListEmployees -------------------->
		[fetchListEmployees.pending]: (state, action) => {
			state.isLoading = false;
		},

		[fetchListEmployees.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.employees = action.payload;
		},

		[fetchListEmployees.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = employeeSlice;
export const {
	setLoading,
	setLogin,
	logout,
	setUser,
	addNewEmployee,
	updateEmployee,
	deleteEmployee,
	updateProfile,
} = actions;
export default reducer;
