import { Layout } from "antd";
import Canvas from "components/Canvas";
import DetailsSubMenu from "components/SubMenu/DetailsSubMenu";
import FloorSubMenu from "components/SubMenu/FloorSubMenu";
import FloorTopBar from "components/NavBar/TopBar";
import GroupSubMenu from "components/SubMenu/GroupSubMenu";
import ProjectSubMenu from "components/SubMenu/ProjectSubMenu";
import ToolBar from "components/NavBar/ToolBar";
import UserBar from "components/NavBar/UserBar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { fetchBuildingById, fetchListBuildings } from "redux/buildingSlice";
import { fetchListFloorsByBuildingId } from "redux/floorSlice";
import { fetchListGroupByBuilding } from "redux/groupSlice";
import { fetchListProjectByBuilding } from "redux/projectSlice";
import { setShape } from "redux/shapeSlice";
import { INITIAL_SHAPE, SHAPE_TYPE } from "utils/constants";
import "./style.scss";
import { Header } from "antd/lib/layout/layout";
import { fetchListEmployees } from "redux/employeeSlice";
import RoomSubMenu from "components/SubMenu/RoomSubMenu";

const BuildingPage = (props) => {
	const { user } = useSelector((state) => state.employee);
	const { floor } = useSelector((state) => state.floor);

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

	useEffect(() => {
		dispatch(fetchListBuildings());
		dispatch(fetchListEmployees());
		dispatch(fetchBuildingById({ id }));
		dispatch(fetchListFloorsByBuildingId({ id }));
		dispatch(fetchListGroupByBuilding({ id }));
		dispatch(fetchListProjectByBuilding({ id }));
	}, [id]);

	const isBuildingAdmin = () => {
		if (!building) return;
		if (building.admin === user._id) return true;
		return false;
	};

	const handleLockBackground = (isLock) => {
		if (shape?.type === SHAPE_TYPE.image) {
			dispatch(setShape({ _id: null }));
		}
		setIsLockBackGround(isLock);
	};

	if (isError) return <Navigate to="/error" />;
	return (
		<>
			{/* <Layout>
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
					<FloorTopBar buildings={buildings} />

					<Canvas isLockBackGround={isLockBackGround} />
				</Layout>

				<Sider theme="light">
					<div style={{ height: "64px", paddingInline: "20px" }}>
						<UserBar name={user.name} />
					</div>
					<ToolBar
						userName={user.name}
						onLockBackGround={handleLockBackground}
						isLockBackGround={isLockBackGround}
					/>
				</Sider>
			</Layout> */}
			<Layout>
				<Header>
					<div className="building-title">{building?.name}</div>
					<FloorTopBar buildings={buildings} />
					<div style={{ height: "64px", paddingInline: "20px" }}>
						<UserBar name={user.name} />
					</div>
				</Header>

				<Layout>
					<Sider className="left-sider" width={255} theme="light">
						<FloorSubMenu
							building={building}
							isBuildingAdmin={isBuildingAdmin || user.isAdmin}
						/>
						{floor && (
							<RoomSubMenu
								floor={floor}
								isBuildingAdmin={isBuildingAdmin || user.isAdmin}
							/>
						)}

						{/* <GroupSubMenu
							building={building}
							isBuildingAdmin={isBuildingAdmin || user.isAdmin}
						/>
						<ProjectSubMenu
							building={building}
							isBuildingAdmin={isBuildingAdmin || user.isAdmin}
						/> */}
						<DetailsSubMenu />
					</Sider>

					<Canvas isLockBackGround={isLockBackGround} />

					<Sider theme="light">
						<ToolBar
							userName={user.name}
							onLockBackGround={handleLockBackground}
							isLockBackGround={isLockBackGround}
						/>
					</Sider>
				</Layout>
			</Layout>
		</>
	);
};

BuildingPage.propTypes = {};

export default BuildingPage;
