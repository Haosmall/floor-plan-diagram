import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import buildingApi from "../api/buildingApi";

const PREFIX = "project";

export const fetchListProjectByBuilding = createAsyncThunk(
	`${PREFIX}/fetchListProjectByBuilding`,
	async (params, thunkApi) => {
		const { id } = params;
		const projects = await buildingApi.fetchListProjectsByBuildingId(id);
		return projects;
	}
);

const projectSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		projects: [],
		listProjectByGroup: [],
		isError: false,
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		addNewProject: (state, action) => {
			const { project } = action.payload;
			state.projects.push(project);
		},
		updateProject: (state, action) => {
			const { project } = action.payload;

			const index = state.projects.findIndex((ele) => ele._id === project._id);
			state.projects[index] = project;
		},
		deleteProject: (state, action) => {
			const { _id } = action.payload;
			const newProjects = state.projects.filter((ele) => ele._id !== _id);
			state.projects = newProjects;
		},

		getProjectsByGroup: (state, action) => {
			const { groupId } = action.payload;
			if (groupId) {
				const newProjects = state.projects.filter(
					(ele) => ele.groupId === groupId
				);
				state.listProjectByGroup = newProjects;
			} else {
				state.listProjectByGroup = [];
			}
		},
	},

	extraReducers: {
		// ==================== fetchListProjectByBuilding  ===================
		[fetchListProjectByBuilding.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListProjectByBuilding.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.projects = action.payload;
		},

		[fetchListProjectByBuilding.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = projectSlice;
export const {
	setLoading,
	setLogin,
	addNewProject,
	updateProject,
	deleteProject,
	getProjectsByGroup,
} = actions;
export default reducer;
