import { Form, Input, message, Modal, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectApi from "../../api/projectApi";
import { INITIAL_PROJECT } from "../../constants";
import { addNewProject, updateProject } from "../../redux/projectSlice";

const ProjectModal = (props) => {
	const { visible, onCancel, initialValues, isAddMode, title, buildingId } =
		props;
	const { groups } = useSelector((state) => state.group);
	const { Option } = Select;
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	useEffect(() => form.resetFields(), [initialValues]);

	const handleSubmit = async () => {
		const values = await form.validateFields();
		const { title, groupId } = values;
		try {
			if (isAddMode) {
				const response = await projectApi.addProject(title, groupId);

				dispatch(addNewProject({ project: response }));
			} else {
				const response = await projectApi.updateProject(
					initialValues._id,
					title,
					groupId
				);

				dispatch(updateProject({ project: response }));
			}
			message.success(`${isAddMode ? "Add" : "Update"} project successfully`);
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

				<Form.Item
					label="Group"
					name="groupId"
					rules={[
						{
							required: true,
							message: "Select group!",
						},
					]}
				>
					<Select>
						{groups?.map((group) => (
							<Option key={group._id} value={group._id}>
								{group.title}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

ProjectModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
	isAddMode: PropTypes.bool,
};

ProjectModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_PROJECT,
	title: "Modal",
	isAddMode: true,
};
export default ProjectModal;
