import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { INITIAL_BUILDING } from "../../utils/constants";

const BuildingModal = (props) => {
	const { visible, onCancel, onSubmit, initialValues, isAddMode, title } =
		props;
	const { users } = useSelector((state) => state.user);
	const { Option } = Select;
	const [form] = Form.useForm();

	useEffect(() => form.resetFields(), [initialValues]);

	const handleSubmit = async () => {
		if (onSubmit) {
			const values = await form.validateFields();
			onSubmit(values);
			handleCancel();
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			form.resetFields();
			onCancel();
		}
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
					span: 6,
				}}
				wrapperCol={{
					span: 18,
				}}
				form={form}
				initialValues={initialValues}
			>
				<Form.Item
					label="Building name"
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

				{/* <Form.Item label="Users" name="users">
					<Select mode="multiple" allowClear>
						{users?.map((user) => (
							<>
								<Option key={user._id} value={user._id}>
									{user.name}
								</Option>
							</>
						))}
					</Select>
				</Form.Item> */}
			</Form>
		</Modal>
	);
};

BuildingModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
};

BuildingModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_BUILDING,
	title: "Modal",
};
export default BuildingModal;
