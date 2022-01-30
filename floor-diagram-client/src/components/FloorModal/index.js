import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import floorApi from "../../api/floorApi";
import { INITIAL_FLOOR, ROLE } from "../../constants";
import { addNewFloor, updateFloor } from "../../redux/floorSlice";
import { fetchListUsers } from "../../redux/userSlice";

const FloorModal = (props) => {
	const { visible, onCancel, initialValues, isAddMode, title, buildingId } =
		props;
	const { users } = useSelector((state) => state.user);
	const { Option } = Select;
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	useEffect(() => form.resetFields(), [initialValues]);

	useEffect(() => {
		if (!users) {
			dispatch(fetchListUsers());
		}
	}, []);

	const handleSubmit = async () => {
		const values = await form.validateFields();
		console.log(values);
		const { name, admin, users } = values;
		try {
			if (isAddMode) {
				const response = await floorApi.addFloor(
					name,
					buildingId,
					admin,
					users
				);

				dispatch(addNewFloor({ floor: response }));
			} else {
				const response = await floorApi.updateFloor(
					initialValues._id,
					initialValues.buildingId,
					name,
					admin,
					users
				);

				dispatch(updateFloor({ floor: response }));
			}
			message.success(`${isAddMode ? "Add" : "Update"} floor successfully`);
		} catch (error) {
			console.log(error);
			message.error("An error has occurred");
		}
		handleCancel();
	};

	const handleCancel = () => {
		if (onCancel) {
			form.resetFields();
			onCancel();
		}
	};

	const formItemLayout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 18 },
	};
	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			span: 18,
			offset: 4,
		},
	};

	return (
		<Modal
			title={title}
			visible={visible}
			onOk={handleSubmit}
			onCancel={handleCancel}
			okText="Save"
		>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
				form={form}
				initialValues={initialValues}
			>
				<Form.Item
					label="Floor"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input name!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Admin"
					name="admin"
					rules={[
						{
							required: true,
							message: "Select admin!",
						},
					]}
				>
					<Select>
						{users?.map((user) => (
							<Option key={user._id} value={user._id}>
								{user.name}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.List name="users">
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map(({ key, name, ...field }, index) => {
								console.log({ name });
								return (
									<Form.Item
										{...(index === 0
											? formItemLayout
											: formItemLayoutWithOutLabel)}
										label={index === 0 ? "Users" : ""}
										required
										key={key}
									>
										<Form.Item
											validateTrigger={["onChange", "onBlur"]}
											{...field}
											noStyle
											name={[name, "userId"]}
											label="role"
											rules={[{ required: true, message: "Select user!" }]}
										>
											<Select style={{ width: "35%" }}>
												{users?.map((user) => {
													return (
														<Option key={user._id} value={user._id}>
															{user.name}
														</Option>
													);
												})}
											</Select>
										</Form.Item>
										<Form.Item
											validateTrigger={["onChange", "onBlur"]}
											{...field}
											noStyle
											name={[name, "role"]}
										>
											<Select
												style={{ width: "35%" }}
												defaultValue={ROLE[0]}
												disabled
											>
												{ROLE.map((role) => (
													<Option key={role} value={role}>
														{role}
													</Option>
												))}
											</Select>
										</Form.Item>
										{fields.length > 1 ? (
											<MinusCircleOutlined
												style={{ marginLeft: "8px" }}
												className="dynamic-delete-button"
												onClick={() => remove(name)}
											/>
										) : null}
									</Form.Item>
								);
							})}
							<Form.Item
								wrapperCol={{
									offset: 4,
									span: 20,
								}}
							>
								<Button
									type="dashed"
									onClick={() => add()}
									style={{ width: "50%" }}
									icon={<PlusOutlined />}
								>
									Add user
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</Modal>
	);
};

FloorModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
	isAddMode: PropTypes.bool,
};

FloorModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_FLOOR,
	title: "Modal",
	isAddMode: true,
};
export default FloorModal;
