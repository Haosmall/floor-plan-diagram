import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import floorApi from "../api/floorApi";
import shapeApi from "../api/shapeApi";
import commonUtils from "../utils/commonUtils";

const KEY = "project";

const INITIAL_STATE = {
	isLoading: false,
	shapes: [],
	listOriginalShapes: [],
	listNewShapes: [],
	listShapesDelete: [],
	listShapesUpdate: [],
	shape: null,
	isError: false,
};

export const fetchListShapeByFloor = createAsyncThunk(
	`${KEY}/fetchListShapeByFloor`,
	async (params, thunkApi) => {
		const { floorId } = params;
		const projects = await floorApi.fetchListShapeByFloor(floorId);
		return projects;
	}
);

const shapeSlice = createSlice({
	name: KEY,
	initialState: INITIAL_STATE,

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},

		addNewShape: (state, action) => {
			const { shape } = action.payload;

			if (shape.src !== "") {
				const currentShapes = state.shapes;
				state.shapes = [shape, ...currentShapes];
			} else {
				state.shapes.push(shape);
			}
			state.listNewShapes.push(shape._id);
		},

		updateShape: (state, action) => {
			const { shape } = action.payload;
			const currentListShapesUpdate = state.listShapesUpdate;

			const updateIndex = currentListShapesUpdate.findIndex(
				(ele) => ele._id === shape._id
			);

			const index = state.shapes.findIndex((ele) => ele._id === shape._id);

			updateIndex < 0
				? state.listShapesUpdate.push(shape)
				: (state.listShapesUpdate[updateIndex] = shape);

			state.shapes[index] = shape;
		},

		updateImageShape: (state, action) => {
			const { shape } = action.payload;
			const currentListShapesUpdate = state.listShapesUpdate;

			const index = state.shapes.findIndex((ele) => ele._id === shape._id);

			state.listOriginalShapes[0] = shape;
			state.shapes[index] = shape;
			state.shape = shape;
		},

		deleteShape: (state, action) => {
			const { _id } = action.payload;
			const currentShapes = state.shapes;

			const newShapes = currentShapes.filter((ele) => ele._id !== _id);

			state.listShapesDelete.push(_id);
			state.shapes = newShapes;
			state.shape = null;
		},

		setShape: (state, action) => {
			const { _id } = action.payload;

			if (_id === null) {
				state.shape = null;
				return;
			}

			const shape = state.shapes.find((ele) => ele._id === _id);
			state.shape = shape;
		},

		resetShape: (state, action) => {
			const listAddedShape = state.listNewShapes;
			const listOriginalShapes = state.listOriginalShapes;

			listAddedShape.length > 0 && shapeApi.deleteManyShape(listAddedShape);

			state.listShapesDelete = [];
			// delete listNewShapes;
			state.listNewShapes = [];
			// delete listShapesBeforeUpdate;
			state.listShapesUpdate = [];
			state.shapes = listOriginalShapes;
			state.shape = null;
		},

		setListOriginalShapes: (state, action) => {
			const currentListShapes = state.shapes;
			state.listOriginalShapes = currentListShapes;
		},

		resetShapeState: (state, action) => {
			Object.assign(state, INITIAL_STATE);
		},

		resetTempShapeState: (state, action) => {
			state.listNewShapes = [];
			state.listShapesDelete = [];
			state.listShapesUpdate = [];
		},

		updateShapeDetails: (state, action) => {
			const { id, details } = action.payload;
			const currentListShapesUpdate = state.listShapesUpdate;
			const currentShape = state.shape;

			const updateIndex = currentListShapesUpdate.findIndex(
				(ele) => ele._id === id
			);

			const index = state.shapes.findIndex((ele) => ele._id === id);

			const newShape = { ...currentShape, ...details };

			updateIndex < 0
				? state.listShapesUpdate.push(newShape)
				: (state.listShapesUpdate[updateIndex] = newShape);

			state.shapes[index] = newShape;
		},
	},

	extraReducers: {
		// ==================== fetchListShapeByFloor  ===================
		[fetchListShapeByFloor.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListShapeByFloor.fulfilled]: (state, action) => {
			const listShapes = action.payload;
			console.log("before ", listShapes);
			let backGroundIndex = -1;
			if (listShapes.length > 0) {
				backGroundIndex = listShapes.findIndex((ele) => ele?.src !== "");

				console.log({ backGroundIndex });
			}

			if (backGroundIndex >= 0) {
				const imageShape = listShapes[backGroundIndex];

				const newList = listShapes.filter((ele) => ele._id !== imageShape._id);
				state.shapes = [imageShape, ...newList];
				state.listOriginalShapes = [imageShape, ...newList];
			} else {
				state.shapes = action.payload;
				state.listOriginalShapes = action.payload;
			}

			state.isLoading = true;
			state.shape = null;
		},

		[fetchListShapeByFloor.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

const { reducer, actions } = shapeSlice;

export const {
	setLoading,
	setLogin,
	addNewShape,
	updateShape,
	deleteShape,
	setShape,
	resetShape,
	setListOriginalShapes,
	resetShapeState,
	resetTempShapeState,
	updateShapeDetails,
	updateImageShape,
} = actions;
export default reducer;
