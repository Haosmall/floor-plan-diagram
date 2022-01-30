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
import projectApi from "../../api/projectApi";
import { ACTION_TYPE, INITIAL_PROJECT } from "../../constants";
import { deleteProject } from "../../redux/projectSlice";
import commonUtils from "../../utils/commonUtils";
import ProjectModal from "../ProjectModal";
import "./style.scss";

const ProjectSubMenu = (props) => {
	const { building } = props;

	const { projects } = useSelector((state) => state.project);

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
					<Menu.ItemGroup className="menu-item-group">
						<div>
							<Button
								className="menu-item-btn btn-add"
								icon={<PlusCircleOutlined />}
								shape="round"
								onClick={showAddProjectModal}
							>
								Add
							</Button>
						</div>
					</Menu.ItemGroup>
					{projects?.map((project) => (
						<Menu.Item key={project._id}>
							<div className="menu-item">
								<div className="menu-item-name">{project.title}</div>
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
export default ProjectSubMenu;
