import {
	AppstoreOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import roomApi from "api/roomApi";
import shapeApi from "api/shapeApi";
import RoomModal from "components/Modal/RoomModal";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRoom, setRoom } from "redux/roomSlice";
import {
	fetchListShapesByRoom,
	resetShapeState,
	resetTempShapeState,
} from "redux/shapeSlice";
import commonUtils from "utils/commonUtils";
import { INITIAL_ROOM } from "utils/constants";
import "./style.scss";

const RoomSubMenu = (props) => {
	const { floor, isBuildingAdmin } = props;

	const { rooms, room } = useSelector((state) => state.room);

	const { listNewShapes } = useSelector((state) => state.shape);

	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isAddRoom, setIsAddRoom] = useState(true);
	const [selectedRoom, setSelectedRoom] = useState(INITIAL_ROOM);
	const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);

	const { SubMenu } = Menu;

	const handleDelete = async (e, id) => {
		e.stopPropagation();

		commonUtils.confirmModal(async () => {
			await roomApi.deleteRoom(id);
			dispatch(deleteRoom({ _id: id }));

			if (room._id === id) {
				dispatch(resetShapeState());
			}

			message.success("Delete successfully");
		});
	};

	const showAddRoomModal = () => {
		setIsAddRoom(true);
		setIsRoomModalVisible(true);
		setSelectedRoom(INITIAL_ROOM);
	};

	const showUpdateRoomModal = (e, id) => {
		e.stopPropagation();
		const room = rooms.find((ele) => ele._id === id);

		setIsAddRoom(false);
		setIsRoomModalVisible(true);
		setSelectedRoom(room);
	};

	const handleSelectRoom = async (roomId) => {
		// if (room?._id === roomId) return;

		dispatch(setRoom({ roomId }));
		dispatch(fetchListShapesByRoom({ roomId }));

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
				<SubMenu key="sub1" icon={<AppstoreOutlined />} title="Room">
					{isBuildingAdmin && (
						<Menu.ItemGroup className="menu-item-group">
							<Menu.Item key="-1" disabled className="item-group">
								<Button
									className="menu-item-btn btn-add"
									icon={<PlusCircleOutlined />}
									shape="round"
									onClick={showAddRoomModal}
								>
									Add
								</Button>
							</Menu.Item>
						</Menu.ItemGroup>
					)}
					{rooms?.map((floor) => (
						<Menu.Item
							eventKey={floor?._id}
							key={floor?._id}
							onClick={() => handleSelectRoom(floor?._id)}
						>
							<div className="menu-item">
								<div className="menu-item-name">{floor?.name}</div>
								{isBuildingAdmin && (
									<div className="menu-item-btn">
										<Button
											shape="circle"
											icon={<EditOutlined />}
											onClick={(e) => showUpdateRoomModal(e, floor?._id)}
										/>
										<Button
											shape="circle"
											danger
											icon={<DeleteOutlined />}
											onClick={(e) => handleDelete(e, floor?._id)}
										/>
									</div>
								)}
							</div>
						</Menu.Item>
					))}
					{rooms?.length <= 0 && (
						<Menu.ItemGroup title="No data"></Menu.ItemGroup>
					)}
				</SubMenu>
			</Menu>

			<RoomModal
				visible={isRoomModalVisible}
				onCancel={() => setIsRoomModalVisible(false)}
				isAddMode={isAddRoom}
				floorId={floor?._id}
				initialValues={selectedRoom}
			/>
		</>
	);
};

RoomSubMenu.propTypes = {
	onAddFloor: PropTypes.func,
	onEditFloor: PropTypes.func,
	onAddGroup: PropTypes.func,
	onEditGroup: PropTypes.func,
	onAddProject: PropTypes.func,
	onEditProject: PropTypes.func,
};

RoomSubMenu.defaultProps = {
	onAddFloor: null,
	onEditFloor: null,
	onAddGroup: null,
	onEditGroup: null,
	onAddProject: null,
	onEditProject: null,
};
export default React.memo(RoomSubMenu);
