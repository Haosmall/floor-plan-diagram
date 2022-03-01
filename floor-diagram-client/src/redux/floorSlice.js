import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import buildingApi from "../api/buildingApi";

const PREFIX = "floor";

export const fetchListFloorsByBuildingId = createAsyncThunk(
	`${PREFIX}/fetchListFloorsByBuildingId`,
	async (params, thunkApi) => {
		const { id } = params;
		const buildings = await buildingApi.fetchListFloorsByBuildingId(id);
		return buildings;
	}
);

const floorSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		floors: [],
		floor: null,
		isError: false,
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		addNewFloor: (state, action) => {
			const { floor } = action.payload;
			state.floors.push(floor);
		},
		updateFloor: (state, action) => {
			const { floor } = action.payload;

			const index = state.floors.findIndex((ele) => ele._id === floor._id);
			state.floors[index] = floor;
		},
		deleteFloor: (state, action) => {
			const { _id } = action.payload;
			const currentFloor = state.floor;
			const newFloors = state.floors.filter((ele) => ele._id !== _id);

			state.floors = newFloors;
			if (currentFloor?._id === _id) state.floor = null;
		},
		setFloor: (state, action) => {
			const { floorId } = action.payload;
			const selectedFloor = state.floors.find((ele) => ele._id === floorId);
			state.floor = selectedFloor;
		},
	},

	extraReducers: {
		// ==================== fetchListFloorsByBuildingId  ===================
		[fetchListFloorsByBuildingId.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListFloorsByBuildingId.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.floors = action.payload.floors;
		},

		[fetchListFloorsByBuildingId.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = floorSlice;
export const {
	setLoading,
	setLogin,
	addNewFloor,
	updateFloor,
	deleteFloor,
	setFloor,
} = actions;
export default reducer;
