import { Form, Input, message, Modal } from "antd";
import groupApi from "api/groupApi";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewGroup, updateGroup } from "redux/groupSlice";
import { INITIAL_GROUP } from "utils/constants";

const GroupModal = (props) => {
	const { visible, onCancel, initialValues, isAddMode, title, buildingId } =
		props;
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	useEffect(() => form.resetFields(), [initialValues]);

	const handleSubmit = async () => {
		const values = await form.validateFields();
		const { title } = values;
		try {
			if (isAddMode) {
				const response = await groupApi.addGroup(title, buildingId);

				dispatch(addNewGroup({ group: response }));
			} else {
				const response = await groupApi.updateGroup(
					initialValues._id,
					title,
					initialValues.buildingId
				);

				dispatch(updateGroup({ group: response }));
			}
			message.success(`${isAddMode ? "Add" : "Update"} group successfully`);
		} catch (error) {
			console.error(error);
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
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
				form={form}
				initialValues={initialValues}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{
							required: true,
							message: "Please input title!",
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

GroupModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
	isAddMode: PropTypes.bool,
};

GroupModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_GROUP,
	title: "Modal",
	isAddMode: true,
};
export default GroupModal;
