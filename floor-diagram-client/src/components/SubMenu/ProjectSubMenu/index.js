import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	ProjectOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { fetchListShapeByProject } from "redux/shapeSlice";
import { ACTION_TYPE, INITIAL_PROJECT } from "utils/constants";
import commonUtils from "utils/commonUtils";
import projectApi from "api/projectApi";
import { deleteProject } from "redux/projectSlice";
import ProjectModal from "components/Modal/ProjectModal";

const ProjectSubMenu = (props) => {
	const { building, isAdmin, isBuildingAdmin } = props;

	const { projects } = useSelector((state) => state.project);
	const { floor } = useSelector((state) => state.floor);

	const [isAddProject, setIsAddProject] = useState(true);
	const [selectedProject, setSelectedProject] = useState(INITIAL_PROJECT);
	const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);

	// Hooks
	const dispatch = useDispatch();

	const { SubMenu } = Menu;

	const handleDelete = async (e, id) => {
		e.stopPropagation();

		commonUtils.confirmModal(async () => {
			await projectApi.deleteProject(id);
			dispatch(deleteProject({ _id: id }));
			message.success("Delete successfully");
		});
	};

	const showAddProjectModal = () => {
		setIsAddProject(true);
		setIsProjectModalVisible(true);
		setSelectedProject(INITIAL_PROJECT);
	};

	const showUpdateProjectModal = (e, id) => {
		e.stopPropagation();
		const project = projects.find((ele) => ele._id === id);

		setIsAddProject(false);
		setIsProjectModalVisible(true);
		setSelectedProject(project);
	};

	const handleSelectProject = (projectId) => {
		if (!floor?._id) return;
		dispatch(fetchListShapeByProject({ projectId }));
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
				<SubMenu key="sub3" icon={<ProjectOutlined />} title="Project">
					{isBuildingAdmin && (
						<Menu.ItemGroup className="menu-item-group">
							<Menu.Item key="-1" disabled className="item-group">
								<Button
									className="menu-item-btn btn-add"
									icon={<PlusCircleOutlined />}
									shape="round"
									onClick={showAddProjectModal}
								>
									Add
								</Button>
							</Menu.Item>
						</Menu.ItemGroup>
					)}
					{projects?.map((project) => (
						<Menu.Item
							key={project._id}
							onClick={() => handleSelectProject(project._id)}
						>
							<div className="menu-item">
								<div className="menu-item-name">{project.title}</div>
								{isBuildingAdmin && (
									<div className="menu-item-btn">
										<Button
											shape="circle"
											icon={<EditOutlined />}
											onClick={(e) => showUpdateProjectModal(e, project._id)}
										/>
										<Button
											shape="circle"
											danger
											icon={<DeleteOutlined />}
											onClick={(e) =>
												handleDelete(e, project._id, ACTION_TYPE.project)
											}
										/>
									</div>
								)}
							</div>
						</Menu.Item>
					))}
					{projects?.length <= 0 && (
						<Menu.ItemGroup title="No data"></Menu.ItemGroup>
					)}
				</SubMenu>
			</Menu>

			<ProjectModal
				visible={isProjectModalVisible}
				onCancel={() => setIsProjectModalVisible(false)}
				isAddMode={isAddProject}
				buildingId={building?._id}
				initialValues={selectedProject}
			/>
		</>
	);
};

ProjectSubMenu.propTypes = {
	building: PropTypes.object,
	projects: PropTypes.array,
};

ProjectSubMenu.defaultProps = {
	building: null,
	projects: [],
};
export default React.memo(ProjectSubMenu);
