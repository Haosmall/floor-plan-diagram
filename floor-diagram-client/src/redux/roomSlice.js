import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import floorApi from "api/floorApi";

const PREFIX = "room";

export const fetchListRoomsByFloor = createAsyncThunk(
	`${PREFIX}/fetchListRoomsByFloor`,
	async (params, thunkApi) => {
		const { id } = params;
		const rooms = await floorApi.fetchListRoomsByFloor(id);
		return rooms;
	}
);

const roomSlice = createSlice({
	name: PREFIX,
	initialState: {
		isLoading: false,
		rooms: [],
		room: null,
		isError: false,
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		addNewRoom: (state, action) => {
			const { room } = action.payload;
			state.rooms.push(room);
		},
		updateRoom: (state, action) => {
			const { room } = action.payload;

			const index = state.rooms.findIndex((ele) => ele._id === room._id);
			state.rooms[index] = room;
		},
		deleteRoom: (state, action) => {
			const { _id } = action.payload;
			const currentRoom = state.room;
			const newRooms = state.rooms.filter((ele) => ele._id !== _id);

			state.rooms = newRooms;
			if (currentRoom?._id === _id) state.room = null;
		},
		setRoom: (state, action) => {
			const { roomId } = action.payload;

			if (roomId === null) {
				state.room = null;
				return;
			}

			const selectedRoom = state.rooms.find((ele) => ele._id === roomId);
			state.room = selectedRoom;
		},
	},

	extraReducers: {
		// ==================== fetchListRoomsByFloor  ===================
		[fetchListRoomsByFloor.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListRoomsByFloor.fulfilled]: (state, action) => {
			state.isLoading = true;
			state.rooms = action.payload.rooms;
		},

		[fetchListRoomsByFloor.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = roomSlice;
export const {
	setLoading,
	setLogin,
	addNewRoom,
	updateRoom,
	deleteRoom,
	setRoom,
} = actions;
export default reducer;
