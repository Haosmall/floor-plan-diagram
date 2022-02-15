import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import buildingApi from "../api/buildingApi";

const PREFIX = "building";

export const fetchListBuildings = createAsyncThunk(
	`${PREFIX}/fetchListBuildings`,
	async (params, thunkApi) => {
		const buildings = await buildingApi.fetchListBuildings(params?.name);
		return buildings;
	}
);

export const fetchBuildingById = createAsyncThunk(
	`${PREFIX}/fetchBuildingById`,
	async (params, thunkApi) => {
		const { id } = params;
		const buildings = await buildingApi.fetchBuildingById(id);
		return buildings;
	}
);

const buildingSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		building: null,
		buildings: [],
		isError: false,
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		addNewBuilding: (state, action) => {
			const { building } = action.payload;
			state.buildings.push(building);
		},
		updateBuilding: (state, action) => {
			const { building } = action.payload;

			const index = state.buildings.findIndex(
				(ele) => ele._id === building._id
			);
			state.buildings[index] = building;
		},
		deleteBuilding: (state, action) => {
			const { _id } = action.payload;
			const newBuildings = state.buildings.filter((ele) => ele._id !== _id);
			state.buildings = newBuildings;
		},
	},

	extraReducers: {
		// ==================== fetchListBuildings  ===================
		[fetchListBuildings.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListBuildings.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.buildings = action.payload;
		},

		[fetchListBuildings.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},

		// ==================== fetchBuildingById  ===================
		[fetchBuildingById.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchBuildingById.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.building = action.payload;
		},

		[fetchBuildingById.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = buildingSlice;
export const {
	setLoading,
	setLogin,
	addNewBuilding,
	updateBuilding,
	deleteBuilding,
} = actions;
export default reducer;
