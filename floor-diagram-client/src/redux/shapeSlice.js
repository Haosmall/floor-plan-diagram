import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "api/groupApi";
import projectApi from "api/projectApi";
import floorApi from "../api/floorApi";
import shapeApi from "../api/shapeApi";

const PREFIX = "project";

const INITIAL_STATE = {
	isLoading: false,
	shapes: [],
	listOriginalShapes: [],
	listNewShapes: [],
	listShapesDelete: [],
	listShapesUpdate: [],
	shape: null,
	isError: false,
	selectedShapes: [],
};

export const fetchListShapeByFloor = createAsyncThunk(
	`${PREFIX}/fetchListShapeByFloor`,
	async (params, thunkApi) => {
		const { floorId } = params;
		const projects = await floorApi.fetchListShapeByFloor(floorId);
		return projects;
	}
);

export const fetchListShapeByProject = createAsyncThunk(
	`${PREFIX}/fetchListShapeByProject`,
	async (params, thunkApi) => {
		const { projectId } = params;
		const selectedShapes = await projectApi.fetchListShapeByProject(projectId);
		return selectedShapes;
	}
);

export const fetchListShapeByGroup = createAsyncThunk(
	`${PREFIX}/fetchListShapeByGroup`,
	async (params, thunkApi) => {
		const { groupId } = params;
		const selectedShapes = await groupApi.fetchListShapeByGroup(groupId);
		return selectedShapes;
	}
);

const shapeSlice = createSlice({
	name: PREFIX,
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

			if (state.selectedShapes.length > 0) state.selectedShapes = [];

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
			state.shape = newShape;
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
			state.selectedShapes = [];
		},

		[fetchListShapeByFloor.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},

		// ==================== fetchListShapeByProject  ===================
		[fetchListShapeByProject.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListShapeByProject.fulfilled]: (state, action) => {
			state.selectedShapes = action.payload;
			state.shape = null;
		},

		[fetchListShapeByProject.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},

		// ==================== fetchListShapeByGroup  ===================
		[fetchListShapeByGroup.pending]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
		},

		[fetchListShapeByGroup.fulfilled]: (state, action) => {
			state.selectedShapes = action.payload;
			state.shape = null;
		},

		[fetchListShapeByGroup.rejected]: (state, action) => {
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
