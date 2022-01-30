import { Form, Input, message, Modal, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectApi from "../../api/projectApi";
import shapeApi from "../../api/shapeApi";
import { INITIAL_PROJECT } from "../../constants";
import { addNewProject, updateProject } from "../../redux/projectSlice";
import {
	addNewShape,
	updateImageShape,
	updateShape,
} from "../../redux/shapeSlice";

const UploadImageModal = (props) => {
	const { visible, onCancel, isAddMode, title } = props;
	const { floor } = useSelector((state) => state.floor);
	const { shapes } = useSelector((state) => state.shape);
	const { Option } = Select;

	const dispatch = useDispatch();
	const [file, setFile] = useState(null);

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			if (isAddMode) {
				formData.append("floorId", floor._id);
				const response = await shapeApi.addImageShape(formData);

				dispatch(addNewShape({ shape: response }));
			} else {
				const response = await shapeApi.updateImageShape(
					shapes[0]._id,
					formData
				);

				const newShape = { ...shapes[0], src: response };

				dispatch(updateImageShape({ shape: newShape }));
			}
			message.success(
				`${isAddMode ? "Add" : "Update"} background successfully`
			);
		} catch (error) {
			console.log(error);
			message.error("An error has occurred");
		}
		handleCancel();
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
	};

	const handleOnChange = (e) => {
		const temp = e.target.files;
		if (temp) {
			setFile(temp[0]);
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
			<input type="file" onChange={handleOnChange} />
		</Modal>
	);
};

UploadImageModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	initialValues: PropTypes.object,
	title: PropTypes.string,
	isAddMode: PropTypes.bool,
};

UploadImageModal.defaultProps = {
	visible: false,
	onCancel: null,
	onSubmit: null,
	initialValues: INITIAL_PROJECT,
	title: "Modal",
	isAddMode: true,
};
export default UploadImageModal;
