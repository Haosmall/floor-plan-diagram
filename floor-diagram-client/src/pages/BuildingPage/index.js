import { Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import Canvas from "../../components/Canvas";
import DetailsSubMenu from "../../components/DetailsSubMenu";
import FloorBottomBar from "../../components/FloorBottomBar";
import FloorSubMenu from "../../components/FloorSubMenu";
import FloorTopBar from "../../components/FloorTopBar";
import GroupSubMenu from "../../components/GroupSubMenu";
import ProjectSubMenu from "../../components/ProjectSubMenu";
import ToolBar from "../../components/ToolBar";
import UserBar from "../../components/UserBar";
import { INITIAL_SHAPE, SHAPE_TYPE } from "../../constants";
import {
	fetchBuildingById,
	fetchListBuildings,
} from "../../redux/buildingSlice";
import { fetchListFloorsByBuildingId } from "../../redux/floorSlice";
import { fetchListGroupByBuilding } from "../../redux/groupSlice";
import { fetchListProjectByBuilding } from "../../redux/projectSlice";
import { fetchListUsers } from "../../redux/userSlice";
import "./style.scss";

const BuildingPage = (props) => {
	const { user } = useSelector((state) => state.user);
	const { building, buildings, isError } = useSelector(
		(state) => state.building
	);

	const { Sider } = Layout;

	// Hooks
	const dispatch = useDispatch();
	const { id } = useParams();

	// State
	const [listShapes, setListShapes] = useState(INITIAL_SHAPE);
	const [selectedShape, setSelectedShape] = useState(null);
	const [isLockBackGround, setIsLockBackGround] = useState(false);

	const stageRef = useRef(null);

	const deleteShape = () => {
		if (selectedShape !== null) {
			console.log(selectedShape);
			const newList = listShapes.filter((_, index) => index !== selectedShape);

			console.log(newList);
			setListShapes(newList);
			setSelectedShape(null);
		}
	};

	useEffect(() => {
		if (buildings.length <= 0) {
			dispatch(fetchListBuildings());
		}
		dispatch(fetchListUsers());
		dispatch(fetchBuildingById({ id }));
		dispatch(fetchListFloorsByBuildingId({ id }));
		dispatch(fetchListGroupByBuilding({ id }));
		dispatch(fetchListProjectByBuilding({ id }));
	}, [id]);

	if (isError) return <Navigate to="/error" />;
	return (
		<>
			<Layout>
				<Sider className="left-sider" width={255} theme="light">
					<div className="building-title">{building?.name}</div>
					<FloorSubMenu building={building} />
					<GroupSubMenu building={building} />
					<ProjectSubMenu building={building} />
					<DetailsSubMenu />
				</Sider>

				<Layout>
					<FloorTopBar
						buildings={buildings}
						selectedShape={selectedShape}
						deleteShape={deleteShape}
						setListShapes={setListShapes}
					/>

					<Canvas
						listShapes={listShapes}
						setSelectedShape={setSelectedShape}
						selectedShape={selectedShape}
						// handleScaling={handleScaling}
						// handleDragEnd={handleDragEnd}
						isLockBackGround={isLockBackGround}
						stageRef={stageRef}
					/>

					<FloorBottomBar floors={buildings?.floors} />
				</Layout>

				<Sider theme="light">
					<div style={{ height: "64px", paddingInline: "20px" }}>
						<UserBar name={user.name} />
					</div>
					<ToolBar
						onLockBackGround={setIsLockBackGround}
						isLockBackGround={isLockBackGround}
					/>
				</Sider>
			</Layout>
		</>
	);
};

BuildingPage.propTypes = {};

export default BuildingPage;
