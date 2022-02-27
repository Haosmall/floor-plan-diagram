import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import groupApi from "api/groupApi";
import GroupModal from "components/Modal/GroupModal";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "redux/groupSlice";
import { fetchListProjectByBuilding } from "redux/projectSlice";
import { fetchListShapeByGroup } from "redux/shapeSlice";
import commonUtils from "utils/commonUtils";
import { INITIAL_GROUP } from "utils/constants";
import "./style.scss";

const GroupSubMenu = (props) => {
	const { building, isAdmin, isBuildingAdmin } = props;
	const { floor } = useSelector((state) => state.floor);

	const { groups } = useSelector((state) => state.group);

	// state
	const [isAddGroup, setIsAddGroup] = useState(true);
	const [selectedGroup, setSelectedGroup] = useState(INITIAL_GROUP);
	const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);

	// Hooks
	const dispatch = useDispatch();
	const { SubMenu } = Menu;

	const handleDelete = async (e, id) => {
		e.stopPropagation();

		commonUtils.confirmModal(async () => {
			await groupApi.deleteGroup(id);
			dispatch(deleteGroup({ _id: id }));
			dispatch(fetchListProjectByBuilding({ id: building._id }));

			message.success("Delete successfully");
		});
	};

	const showAddGroupModal = () => {
		setIsAddGroup(true);
		setIsGroupModalVisible(true);
		setSelectedGroup(INITIAL_GROUP);
	};

	const showUpdateGroupModal = (e, id) => {
		e.stopPropagation();
		const group = groups.find((ele) => ele._id === id);
		setIsAddGroup(false);
		setIsGroupModalVisible(true);
		setSelectedGroup(group);
	};

	const handleSelectGroup = (groupId) => {
		if (!floor?._id) return;
		dispatch(fetchListShapeByGroup({ groupId }));
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
				<SubMenu key="sub2" icon={<TeamOutlined />} title="Group">
					{isBuildingAdmin && (
						<Menu.ItemGroup className="menu-item-group">
							<Menu.Item key="-1" disabled className="item-group">
								<Button
									className="menu-item-btn btn-add"
									icon={<PlusCircleOutlined />}
									shape="round"
									onClick={showAddGroupModal}
								>
									Add
								</Button>
							</Menu.Item>
						</Menu.ItemGroup>
					)}
					{groups?.map((group) => (
						<Menu.Item
							key={group._id}
							onClick={() => handleSelectGroup(group._id)}
						>
							<div className="menu-item">
								<div className="menu-item-name">{group.title}</div>
								{isBuildingAdmin && (
									<div className="menu-item-btn">
										<Button
											shape="circle"
											icon={<EditOutlined />}
											onClick={(e) => showUpdateGroupModal(e, group._id)}
										/>
										<Button
											shape="circle"
											danger
											icon={<DeleteOutlined />}
											onClick={(e) => handleDelete(e, group._id)}
										/>
									</div>
								)}
							</div>
						</Menu.Item>
					))}
					{groups?.length <= 0 && (
						<Menu.ItemGroup title="No data"></Menu.ItemGroup>
					)}
				</SubMenu>
			</Menu>
			<GroupModal
				visible={isGroupModalVisible}
				onCancel={() => setIsGroupModalVisible(false)}
				isAddMode={isAddGroup}
				buildingId={building?._id}
				initialValues={selectedGroup}
			/>
		</>
	);
};

GroupSubMenu.propTypes = {
	groups: PropTypes.array,
	building: PropTypes.object,
};

GroupSubMenu.defaultProps = {
	groups: [],
	building: null,
};
export default React.memo(GroupSubMenu);
