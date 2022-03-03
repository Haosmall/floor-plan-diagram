import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { INITIAL_USER } from "utils/constants";

const UserModal = (props) => {
	const { visible, onCancel, onSubmit, initialValues, isAddMode, title } =
		props;
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
			forceRender
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
					label="Name"
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
				{isAddMode && (
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: "Please input username!",
							},
							{
								pattern: /^[a-z0-9]+$/,
								message: "Only lowercase letters and numbers",
							},
						]}
					>
						<Input />
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
};

UserModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
	isAddMode: PropTypes.bool,
};

UserModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_USER,
	title: "Modal",
	isAddMode: true,
};
export default UserModal;
