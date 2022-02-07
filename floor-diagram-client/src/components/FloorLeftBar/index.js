import { Menu, message, Select } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import floorApi from "../../api/floorApi";
import groupApi from "../../api/groupApi";
import projectApi from "../../api/projectApi";
import { ACTION_TYPE } from "../../utils/constants";
import { deleteFloor } from "../../redux/floorSlice";
import { deleteGroup } from "../../redux/groupSlice";
import {
	deleteProject,
	fetchListProjectByBuilding,
} from "../../redux/projectSlice";
import commonUtils from "../../utils/commonUtils";
import DetailsSubMenu from "../DetailsSubMenu";
import FloorSubMenu from "../FloorSubMenu";
import GroupSubMenu from "../GroupSubMenu";
import ProjectSubMenu from "../ProjectSubMenu";
import "./style.scss";

const FloorLeftBar = (props) => {
	const { onEditFloor, onEditGroup, onEditProject } = props;
	const { building } = useSelector((state) => state.building);
	const { floors } = useSelector((state) => state.floor);
	const { groups } = useSelector((state) => state.group);
	const { projects } = useSelector((state) => state.project);

	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { Option } = Select;
	const { SubMenu } = Menu;

	const handleUpdate = (e, id, type) => {
		e.stopPropagation();

		switch (type) {
			case ACTION_TYPE.floor:
				const floor = floors.find((ele) => ele._id === id);
				onEditFloor(floor);
				break;

			case ACTION_TYPE.group:
				const group = groups.find((ele) => ele._id === id);
				console.log("ACTION_TYPE.group ", group);
				onEditGroup(group);
				break;

			case ACTION_TYPE.project:
				const project = projects.find((ele) => ele._id === id);
				onEditProject(project);
				break;

			default:
				break;
		}
	};

	const handleDelete = async (e, id, type) => {
		e.stopPropagation();

		commonUtils.confirmModal(async () => {
			switch (type) {
				case ACTION_TYPE.floor:
					await floorApi.deleteFloor(id);
					dispatch(deleteFloor({ _id: id }));
					break;

				case ACTION_TYPE.group:
					await groupApi.deleteGroup(id);
					dispatch(deleteGroup({ _id: id }));
					dispatch(fetchListProjectByBuilding({ id: building._id }));
					break;

				case ACTION_TYPE.project:
					await projectApi.deleteProject(id);
					dispatch(deleteProject({ _id: id }));
					break;

				default:
					break;
			}
			message.success("Delete successfully");
		});
	};

	return (
		<>
			<div className="building-title">{building?.name}</div>
			<FloorSubMenu building={building} floors={floors} />
			<GroupSubMenu />
			<ProjectSubMenu />
			<DetailsSubMenu />
		</>
	);
};

FloorLeftBar.propTypes = {
	onAddFloor: PropTypes.func,
	onEditFloor: PropTypes.func,
	onAddGroup: PropTypes.func,
	onEditGroup: PropTypes.func,
	onAddProject: PropTypes.func,
	onEditProject: PropTypes.func,
};

FloorLeftBar.defaultProps = {
	onAddFloor: null,
	onEditFloor: null,
	onAddGroup: null,
	onEditGroup: null,
	onAddProject: null,
	onEditProject: null,
};
export default FloorLeftBar;
