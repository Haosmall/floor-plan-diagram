import { Layout, message, Table, Tabs } from "antd";
import buildingApi from "api/buildingApi";
import BuildingModal from "components/Modal/BuildingModal";
import UserBar from "components/NavBar/UserBar";
import BuildingPane from "components/TabPane/BuildingPane";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteBuilding, fetchListBuildings } from "redux/buildingSlice";
import { fetchListUsers } from "redux/userSlice";
import commonUtils from "utils/commonUtils";
import { INITIAL_BUILDING } from "utils/constants";
import "./style.scss";

const HomePage = (props) => {
	const { user, users } = useSelector((state) => state.user);
	const { buildings } = useSelector((state) => state.building);

	const [isAddMode, setIsAddMode] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState(INITIAL_BUILDING);

	const { Column } = Table;

	const { Header, Footer, Content } = Layout;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchListBuildings());
		dispatch(fetchListUsers());
	}, []);

	const handleOnClickAdd = () => {
		setIsAddMode(true);
		setIsModalVisible(true);
		setSelectedBuilding(INITIAL_BUILDING);
	};

	const handleSubmit = async (building) => {
		try {
			const { name, admin, users } = building;
			if (isAddMode) {
				const response = await buildingApi.addBuilding(name, users, admin);
				dispatch(fetchListBuildings({ building: response }));
			} else {
				await buildingApi.updateBuilding(selectedBuilding._id, name, admin);
				dispatch(
					fetchListBuildings({
						building: { _id: selectedBuilding._id, name, admin },
					})
				);
			}

			message.success(`${isAddMode ? "Add" : "Update"} building successfully`);
		} catch (error) {
			console.log(error);
			message.error("An error has occurred");
		}
	};

	const handleEdit = (building) => {
		setIsModalVisible(true);
		setIsAddMode(false);
		setSelectedBuilding(building);
	};

	const handleDelete = (buildingId) => {
		commonUtils.confirmModal(async () => {
			await buildingApi.deleteBuilding(buildingId);

			dispatch(deleteBuilding({ _id: buildingId }));
			message.success("Delete successfully");
		});
	};

	const handleSelect = (buildingId) => {
		navigate(`/buildings/${buildingId}`);
	};

	const { TabPane } = Tabs;

	return (
		<div id="home-container">
			<Layout>
				<Header>
					<UserBar name={user.name} />
				</Header>
				<Content id="home-content">
					<BuildingPane
						buildings={buildings}
						onAdd={handleOnClickAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onSelect={handleSelect}
					/>
				</Content>
				<Footer style={{ backgroundColor: "#1890ff" }}>Footer</Footer>
			</Layout>

			<BuildingModal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onSubmit={handleSubmit}
				initialValues={selectedBuilding}
				title={isAddMode ? "Add new building" : "Edit building"}
			/>
		</div>
	);
};

HomePage.propTypes = {};

export default HomePage;
