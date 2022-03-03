import { Layout, message, Table, Tabs } from "antd";
import buildingApi from "api/buildingApi";
import employeeApi from "api/employeeApi";
import BuildingModal from "components/Modal/BuildingModal";
import UserModal from "components/Modal/UserModal";
import UserBar from "components/NavBar/UserBar";
import BuildingPane from "components/TabPane/BuildingPane";
import UserPane from "components/TabPane/UserPane";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
	deleteBuilding,
	fetchListBuildings,
	updateBuilding,
} from "redux/buildingSlice";
import {
	addNewEmployee,
	deleteEmployee,
	fetchListEmployees,
	updateEmployee,
} from "redux/employeeSlice";
import commonUtils from "utils/commonUtils";
import { INITIAL_BUILDING, INITIAL_USER } from "utils/constants";
import "./style.scss";

const HomePage = (props) => {
	const { user, employees, isLogin } = useSelector((state) => state.employee);
	const { buildings } = useSelector((state) => state.building);

	const [isAddMode, setIsAddMode] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState(INITIAL_BUILDING);

	const [isAddUser, setIsAddUser] = useState(true);
	const [isUserModalVisible, setIsUserModalVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(INITIAL_USER);

	const { Column } = Table;

	const { Header, Footer, Content } = Layout;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchListBuildings());
		dispatch(fetchListEmployees());
	}, []);

	const handleOnClickAdd = () => {
		setIsAddMode(true);
		setIsModalVisible(true);
		setSelectedBuilding(INITIAL_BUILDING);
	};

	const handleOnClickAddUser = () => {
		setIsAddUser(true);
		setIsUserModalVisible(true);
		setSelectedUser(INITIAL_USER);
	};

	const handleSubmit = async (building) => {
		try {
			if (isAddMode) {
				const response = await buildingApi.addBuilding(building);
				dispatch(fetchListBuildings({ building: response }));
			} else {
				await buildingApi.updateBuilding(selectedBuilding._id, building);
				dispatch(
					updateBuilding({
						building: { _id: selectedBuilding._id, ...building },
					})
				);
			}

			message.success(`${isAddMode ? "Add" : "Update"} building successfully`);
		} catch (error) {
			console.error(error);
			message.error("An error has occurred");
		}
	};

	const handleSubmitUserModal = async (user) => {
		try {
			if (isAddUser) {
				const response = await employeeApi.addEmployee(user);
				dispatch(addNewEmployee(response));
			} else {
				await employeeApi.updateEmployee(selectedUser._id, user);
				dispatch(updateEmployee({ _id: selectedUser._id, ...user }));
			}

			message.success(`${isAddMode ? "Add" : "Update"} user successfully`);
		} catch (error) {
			console.error(error);
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

	const handleSelectBuilding = (buildingId) => {
		if (user?.isAdmin || user?.isBuildingAdmin)
			navigate(`/buildings/${buildingId}`);
		else message.error("You do not have permission to access this page");
	};

	const handleEditUser = (user) => {
		setIsUserModalVisible(true);
		setIsAddUser(false);
		setSelectedUser(user);
	};

	const handleDeleteUser = (userId) => {
		commonUtils.confirmModal(async () => {
			await employeeApi.deleteEmployee(userId);

			dispatch(deleteEmployee(userId));
			message.success("Delete successfully");
		});
	};

	const handleSelectUser = (userId) => {
		// console.log({ userId });
	};

	const { TabPane } = Tabs;

	return (
		<div id="home-container">
			<Layout>
				<Header>
					<UserBar name={user.name} />
				</Header>
				<Content id="home-content">
					{user.isAdmin ? (
						<Tabs defaultActiveKey="1">
							<TabPane tab="Buildings" key="1">
								<BuildingPane
									buildings={buildings}
									onAdd={handleOnClickAdd}
									onEdit={handleEdit}
									onDelete={handleDelete}
									onSelect={handleSelectBuilding}
								/>
							</TabPane>
							<TabPane tab="Users" key="2">
								<UserPane
									users={employees}
									onAdd={handleOnClickAddUser}
									onEdit={handleEditUser}
									onDelete={handleDeleteUser}
									onSelect={handleSelectUser}
								/>
							</TabPane>
						</Tabs>
					) : (
						<BuildingPane
							buildings={buildings}
							onAdd={handleOnClickAdd}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onSelect={handleSelectBuilding}
						/>
					)}
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

			<UserModal
				visible={isUserModalVisible}
				onCancel={() => setIsUserModalVisible(false)}
				onSubmit={handleSubmitUserModal}
				initialValues={selectedUser}
				title={isAddUser ? "Add new user" : "Edit user"}
				isAddMode={isAddUser}
			/>
		</div>
	);
};

HomePage.propTypes = {};

export default HomePage;
