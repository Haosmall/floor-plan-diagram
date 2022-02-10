import {
	MinusCircleOutlined,
	PlusOutlined,
	ProfileOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Menu, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProjectsByGroup } from "../../../redux/projectSlice";
import { updateShapeDetails } from "../../../redux/shapeSlice";
import "./style.scss";

const DetailsSubMenu = (props) => {
	const { floor } = useSelector((state) => state.floor);
	const { projects, listProjectByGroup } = useSelector(
		(state) => state.project
	);
	const { groups } = useSelector((state) => state.group);
	const { shape } = useSelector((state) => state.shape);
	const { users } = useSelector((state) => state.user);

	// Hooks
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { id } = useParams();

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
	}, [shape]);

	const handleChange = (_, values) => {
		const { groupId, ...changeValues } = values;
		console.log({ changeValues });

		dispatch(updateShapeDetails({ id: shape._id, details: values }));
	};

	const handleSelectGroup = (groupId) => {
		dispatch(getProjectsByGroup({ groupId }));
	};

	return (
		<Menu
			style={{ width: 256 }}
			defaultSelectedKeys={["1"]}
			defaultOpenKeys={["sub1"]}
			mode="inline"
		>
			<SubMenu key="sub4" icon={<ProfileOutlined />} title="Details">
				<Menu.ItemGroup>
					<div className="details-form">
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
							<Form.Item label="Staff" name="staff">
								<Select disabled={isDisable}>
									{floor?.users.map((user) => {
										const userName = users.find(
											(ele) => ele._id === user.userId
										)?.name;
										console.log("staff detai", { user, userName });
										return (
											<Option key={user.userId} value={user.userId}>
												{userName}
											</Option>
										);
									})}
								</Select>
							</Form.Item>

							<Form.Item label="Group" name="groupId">
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
							</Form.Item>

							<Form.List name="items">
								{(fields, { add, remove }, { errors }) => (
									<>
										{fields.map((field, index) => (
											<Form.Item
												{...(index === 0
													? formItemLayout
													: formItemLayoutWithOutLabel)}
												label={index === 0 ? "Items" : ""}
												key={field.key}
											>
												<Form.Item
													{...field}
													validateTrigger={["onChange", "onBlur"]}
													noStyle
												>
													<Input placeholder="Item" style={{ width: "80%" }} />
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
							>
								{/* <Button
									type="primary"
									htmlType="Save"
									style={{ marginBottom: "8px" }}
								>
									Submit
								</Button> */}
							</Form.Item>
						</Form>
					</div>
				</Menu.ItemGroup>
			</SubMenu>
		</Menu>
	);
};

DetailsSubMenu.propTypes = {};

DetailsSubMenu.defaultProps = {};
export default React.memo(DetailsSubMenu);
