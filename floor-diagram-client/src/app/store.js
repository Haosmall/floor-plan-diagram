import { configureStore } from "@reduxjs/toolkit";
import building from "../redux/buildingSlice";
import employee from "../redux/employeeSlice";
import floor from "../redux/floorSlice";
import group from "../redux/groupSlice";
import project from "../redux/projectSlice";
import room from "../redux/roomSlice";
import shape from "../redux/shapeSlice";

const rootReducer = {
	employee,
	building,
	floor,
	group,
	project,
	shape,
	room,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
