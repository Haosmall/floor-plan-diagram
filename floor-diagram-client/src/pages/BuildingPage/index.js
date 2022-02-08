import { Layout } from "antd";
import Canvas from "components/Canvas";
import DetailsSubMenu from "components/DetailsSubMenu";
import FloorSubMenu from "components/FloorSubMenu";
import FloorTopBar from "components/FloorTopBar";
import GroupSubMenu from "components/GroupSubMenu";
import ProjectSubMenu from "components/ProjectSubMenu";
import ToolBar from "components/ToolBar";
import UserBar from "components/UserBar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { fetchBuildingById, fetchListBuildings } from "redux/buildingSlice";
import { fetchListFloorsByBuildingId } from "redux/floorSlice";
import { fetchListGroupByBuilding } from "redux/groupSlice";
import { fetchListProjectByBuilding } from "redux/projectSlice";
import { setShape } from "redux/shapeSlice";
import { fetchListUsers } from "redux/userSlice";
import { INITIAL_SHAPE, SHAPE_TYPE } from "utils/constants";
import "./style.scss";

const BuildingPage = (props) => {
	const { user } = useSelector((state) => state.user);
	const { building, buildings, isError } = useSelector(
		(state) => state.building
	);
	const { shape } = useSelector((state) => state.shape);

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

	const isBuildingAdmin = useMemo(() => {
		if (!building) return;
		if (building.admin === user._id) return true;
		return false;
	}, [building]);

	const handleLockBackground = (isLock) => {
		if (shape?.type === SHAPE_TYPE.image) {
			dispatch(setShape({ _id: null }));
		}
		setIsLockBackGround(isLock);
	};

	if (isError) return <Navigate to="/error" />;
	return (
		<>
			<Layout>
				<Sider className="left-sider" width={255} theme="light">
					<div className="building-title">{building?.name}</div>
					<FloorSubMenu
						building={building}
						isBuildingAdmin={isBuildingAdmin || user.isAdmin}
					/>
					<GroupSubMenu
						building={building}
						isBuildingAdmin={isBuildingAdmin || user.isAdmin}
					/>
					<ProjectSubMenu
						building={building}
						isBuildingAdmin={isBuildingAdmin || user.isAdmin}
					/>
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
						isLockBackGround={isLockBackGround}
						stageRef={stageRef}
					/>
				</Layout>

				<Sider theme="light">
					<div style={{ height: "64px", paddingInline: "20px" }}>
						<UserBar name={user.name} />
					</div>
					<ToolBar
						onLockBackGround={handleLockBackground}
						isLockBackGround={isLockBackGround}
					/>
				</Sider>
			</Layout>
		</>
	);
};

BuildingPage.propTypes = {};

export default BuildingPage;
