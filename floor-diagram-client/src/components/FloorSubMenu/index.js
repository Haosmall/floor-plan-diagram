import {
	AppstoreOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import floorApi from "../../api/floorApi";
import shapeApi from "../../api/shapeApi";
import { deleteFloor, setFloor } from "../../redux/floorSlice";
import {
	fetchListShapeByFloor,
	resetShapeState,
	resetTempShapeState,
} from "../../redux/shapeSlice";
import commonUtils from "../../utils/commonUtils";
import { INITIAL_FLOOR } from "../../utils/constants";
import FloorModal from "../FloorModal";
import "./style.scss";

const FloorSubMenu = (props) => {
	const { building, isBuildingAdmin } = props;

	const { floors, floor } = useSelector((state) => state.floor);
	const { listNewShapes } = useSelector((state) => state.shape);

	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isAddFloor, setIsAddFloor] = useState(true);
	const [selectedFloor, setSelectedFloor] = useState(INITIAL_FLOOR);
	const [isFloorModalVisible, setIsFloorModalVisible] = useState(false);

	const { SubMenu } = Menu;

	const handleDelete = async (e, id) => {
		e.stopPropagation();

		commonUtils.confirmModal(async () => {
			await floorApi.deleteFloor(id);
			dispatch(deleteFloor({ _id: id }));

			if (floor._id === id) {
				dispatch(resetShapeState());
			}

			message.success("Delete successfully");
		});
	};

	const showAddFloorModal = () => {
		setIsAddFloor(true);
		setIsFloorModalVisible(true);
		setSelectedFloor(INITIAL_FLOOR);
	};

	const showUpdateFloorModal = (e, id) => {
		e.stopPropagation();
		const floor = floors.find((ele) => ele._id === id);
		setIsAddFloor(false);
		setIsFloorModalVisible(true);
		setSelectedFloor(floor);

		// console.log({ floor });
	};

	const handleSelectFloor = async (floorId) => {
		if (floor?._id === floorId) return;

		dispatch(setFloor({ floorId }));
		dispatch(fetchListShapeByFloor({ floorId }));

		if (listNewShapes.length > 0) await shapeApi.deleteManyShape(listNewShapes);

		dispatch(resetTempShapeState());
	};

	return (
		<>
			<Menu
				// onClick={this.handleClick}
				style={{ width: 256 }}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
			>
				<SubMenu key="sub1" icon={<AppstoreOutlined />} title="Floor">
					{isBuildingAdmin && (
						<Menu.ItemGroup className="menu-item-group">
							<div>
								<Button
									className="menu-item-btn btn-add"
									icon={<PlusCircleOutlined />}
									shape="round"
									onClick={showAddFloorModal}
								>
									Add
								</Button>
							</div>
						</Menu.ItemGroup>
					)}
					{floors?.map((floor) => (
						<Menu.Item
							key={floor._id}
							onClick={() => handleSelectFloor(floor._id)}
						>
							<div className="menu-item">
								<div className="menu-item-name">{floor.name}</div>
								{isBuildingAdmin && (
									<div className="menu-item-btn">
										<Button
											shape="circle"
											icon={<EditOutlined />}
											onClick={(e) => showUpdateFloorModal(e, floor._id)}
										/>
										<Button
											shape="circle"
											danger
											icon={<DeleteOutlined />}
											onClick={(e) => handleDelete(e, floor._id)}
										/>
									</div>
								)}
							</div>
						</Menu.Item>
					))}
					{floors?.length <= 0 && (
						<Menu.ItemGroup title="No data"></Menu.ItemGroup>
					)}
				</SubMenu>
			</Menu>

			<FloorModal
				visible={isFloorModalVisible}
				onCancel={() => setIsFloorModalVisible(false)}
				isAddMode={isAddFloor}
				buildingId={building?._id}
				initialValues={selectedFloor}
			/>
		</>
	);
};

FloorSubMenu.propTypes = {
	onAddFloor: PropTypes.func,
	onEditFloor: PropTypes.func,
	onAddGroup: PropTypes.func,
	onEditGroup: PropTypes.func,
	onAddProject: PropTypes.func,
	onEditProject: PropTypes.func,
};

FloorSubMenu.defaultProps = {
	onAddFloor: null,
	onEditFloor: null,
	onAddGroup: null,
	onEditGroup: null,
	onAddProject: null,
	onEditProject: null,
};
export default React.memo(FloorSubMenu);
