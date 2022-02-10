import {
	ExclamationCircleOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, message, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import buildingApi from "../../api/buildingApi";
import BuildingModal from "../../components/Modal/BuildingModal";
import BuildingTable from "../../components/BuildingTable";
import UserBar from "../../components/NavBar/UserBar";
import { INITIAL_BUILDING } from "../../utils/constants";
import {
	fetchListBuildings,
	addNewBuilding,
	deleteBuilding,
} from "../../redux/buildingSlice";
import { fetchListUsers, logout } from "../../redux/userSlice";
import "./style.scss";

const HomePage = (props) => {
	const { user } = useSelector((state) => state.user);
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
		Modal.confirm({
			title: "Confirm",
			icon: <ExclamationCircleOutlined />,
			content: "Are you sure?",
			okText: "Ok",
			cancelText: "Cancel",
			onOk: async () => {
				try {
					await buildingApi.deleteBuilding(buildingId);

					dispatch(deleteBuilding({ _id: buildingId }));
					message.success("Delete successfully");
				} catch (error) {
					console.log(error);
					message.error("An error has occurred");
				}
			},
		});
	};

	const handleSelect = (buildingId) => {
		navigate(`/buildings/${buildingId}`);
	};

	return (
		<div id="home-container">
			<Layout>
				<Header>
					<UserBar name={user.name} />
				</Header>
				<Content id="home-content">
					<Row justify="space-between" gutter={[8, 8]}>
						<Col xs={24} sm={24} md={24} lg={4} xl={4}>
							<Button
								type="primary"
								icon={<PlusCircleOutlined />}
								onClick={handleOnClickAdd}
								shape="round"
							>
								Add
							</Button>
						</Col>
					</Row>

					<BuildingTable
						data={buildings}
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
