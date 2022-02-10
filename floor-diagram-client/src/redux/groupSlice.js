import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import buildingApi from "../api/buildingApi";

const PREFIX = "group";

export const fetchListGroupByBuilding = createAsyncThunk(
	`${PREFIX}/fetchListGroupByBuilding`,
	async (params, thunkApi) => {
		const { id } = params;
		const groups = await buildingApi.fetchListGroupsByBuildingId(id);
		return groups;
	}
);

const groupSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		groups: [],
		isError: false,
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		addNewGroup: (state, action) => {
			const { group } = action.payload;
			state.groups.push(group);
		},
		updateGroup: (state, action) => {
			const { group } = action.payload;

			const index = state.groups.findIndex((ele) => ele._id === group._id);
			state.groups[index] = group;
		},
		deleteGroup: (state, action) => {
			const { _id } = action.payload;
			const newGroups = state.groups.filter((ele) => ele._id !== _id);
			state.groups = newGroups;
		},
	},

	extraReducers: {
		// ==================== fetchListGroupByBuilding  ===================
		[fetchListGroupByBuilding.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListGroupByBuilding.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.groups = action.payload;
		},

		[fetchListGroupByBuilding.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = groupSlice;
export const { setLoading, setLogin, addNewGroup, updateGroup, deleteGroup } =
	actions;
export default reducer;
