import {
	MinusCircleOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Menu, message, Select } from "antd";
import employeeApi from "api/employeeApi";
import floorApi from "api/floorApi";
import UserModal from "components/Modal/UserModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addNewEmployee } from "redux/employeeSlice";
import { updateFloor } from "redux/floorSlice";
import { getProjectsByGroup } from "redux/projectSlice";
import { updateShapeDetails } from "redux/shapeSlice";
import { INITIAL_USER, SHAPE_TYPE } from "utils/constants";
import "./style.scss";

const DetailsSubMenu = (props) => {
	const { floor } = useSelector((state) => state.floor);
	const { listProjectByGroup } = useSelector((state) => state.project);
	const { groups } = useSelector((state) => state.group);
	const { shape } = useSelector((state) => state.shape);
	const { employees } = useSelector((state) => state.employee);

	// Hooks
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { id } = useParams();

	const [isUserModalVisible, setIsUserModalVisible] = useState(false);

	const { Option } = Select;
	const { SubMenu } = Menu;

	const isDisable = (() => {
		if (shape) {
			if (shape?.src) {
				return true;
			}
			return false;
		} else {
			return true;
		}
	})();

	const formItemLayout = {
		labelCol: { span: 7 },
		wrapperCol: { span: 16 },
	};
	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			span: 16,
			offset: 7,
		},
	};

	// Reset form
	useEffect(() => {
		form.resetFields();
		dispatch(getProjectsByGroup({ groupId: shape?.groupId }));
	}, [shape?._id]);

	const handleChange = (_, values) => {
		const { groupId, ...changeValues } = values;
		console.log({ changeValues });

		dispatch(updateShapeDetails({ id: shape._id, details: values }));
	};

	const handleSelectGroup = (groupId) => {
		dispatch(getProjectsByGroup({ groupId }));
	};

	const handleSubmitUserModal = async (user) => {
		try {
			const newEmployee = await employeeApi.addEmployee(user);
			dispatch(addNewEmployee(newEmployee));

			const response = await floorApi.updateFloor(floor._id, {
				employees: [...floor.employees, newEmployee._id],
			});

			dispatch(updateFloor({ floor: response }));

			message.success("Add user successfully");
		} catch (error) {
			console.error(error);
			message.error("An error has occurred");
		}
	};

	return (
		<div id="details-sub-menu">
			<Menu
				style={{ width: 256 }}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
			>
				<SubMenu key="sub4" icon={<ProfileOutlined />} title="Details">
					{shape && shape.type !== SHAPE_TYPE.image && (
						<Menu.ItemGroup className="menu-item-group">
							<Menu.Item key="-1" disabled className="item-group">
								<Button
									className="menu-item-btn btn-add"
									icon={<PlusCircleOutlined />}
									shape="round"
									onClick={() => setIsUserModalVisible(true)}
								>
									Add new staff
								</Button>
							</Menu.Item>
						</Menu.ItemGroup>
					)}
					<Menu.ItemGroup>
						<Menu.Item
							key="-1"
							disabled
							style={{ cursor: "default !important" }}
							className="details-form"
						>
							<Form
								name="basic"
								labelCol={{
									span: 7,
								}}
								wrapperCol={{
									span: 16,
								}}
								autoComplete="off"
								initialValues={shape}
								form={form}
								onValuesChange={handleChange}
							>
								<Form.Item label="Staff" name="employee">
									<Select disabled={isDisable}>
										{employees.map((user) => {
											return (
												floor?.employees.includes(user._id) && (
													<Option key={user._id} value={user._id}>
														{user.name}
													</Option>
												)
											);
										})}
									</Select>
								</Form.Item>

								<Form.Item label="Number" name="chairNumber">
									<Input
										disabled={isDisable}
										placeholder="Chair number"
										type="number"
									/>
								</Form.Item>

								{/* <Form.Item label="Group" name="groupId">
									<Select disabled={isDisable} onSelect={handleSelectGroup}>
										{groups.map((group) => (
											<Option key={group._id} value={group._id}>
												{group.title}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item label="Project" name="projectId">
									<Select disabled={isDisable}>
										{listProjectByGroup.map((project) => (
											<Option key={project._id} value={project._id}>
												{project.title}
											</Option>
										))}
									</Select>
								</Form.Item> */}

								<Form.List name="pcInfo">
									{(fields, { add, remove }, { errors }) => (
										<>
											{fields.map((field, index) => (
												<Form.Item
													{...(index === 0
														? formItemLayout
														: formItemLayoutWithOutLabel)}
													label={index === 0 ? "PC info" : ""}
													key={field.key}
												>
													<Form.Item
														{...field}
														validateTrigger={["onChange", "onBlur"]}
														noStyle
													>
														<Input
															placeholder="Item"
															style={{ width: "80%" }}
														/>
													</Form.Item>

													<MinusCircleOutlined
														style={{ marginLeft: "8px" }}
														className="dynamic-delete-button"
														onClick={() => remove(field.name)}
													/>
												</Form.Item>
											))}
											<Form.Item
												wrapperCol={{
													offset: 7,
													span: 20,
												}}
											>
												<Button
													type="dashed"
													onClick={() => add()}
													style={{ width: "50%" }}
													icon={<PlusOutlined />}
													disabled={isDisable}
												>
													Add
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>

								<Form.Item
									wrapperCol={{
										offset: 7,
										span: 20,
									}}
								></Form.Item>
							</Form>
						</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
			</Menu>

			<UserModal
				visible={isUserModalVisible}
				onCancel={() => setIsUserModalVisible(false)}
				onSubmit={handleSubmitUserModal}
				// initialValues={selectedBuilding}
				title={"Add new user"}
			/>
		</div>
	);
};

DetailsSubMenu.propTypes = {};

DetailsSubMenu.defaultProps = {};
export default React.memo(DetailsSubMenu);
