import { configureStore } from "@reduxjs/toolkit";
import user from "../redux/userSlice";
import building from "../redux/buildingSlice";
import floor from "../redux/floorSlice";
import group from "../redux/groupSlice";
import project from "../redux/projectSlice";
import shape from "../redux/shapeSlice";

const rootReducer = {
	user,
	building,
	floor,
	group,
	project,
	shape,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
