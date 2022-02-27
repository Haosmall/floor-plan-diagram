import { message, Modal } from "antd";
import shapeApi from "api/shapeApi";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewShape, updateImageShape } from "redux/shapeSlice";
import { INITIAL_PROJECT, SHAPE_TYPE } from "utils/constants";
import "./style.scss";

const UploadImageModal = (props) => {
	const { visible, onCancel, isAddMode, title } = props;
	const { floor } = useSelector((state) => state.floor);
	const { shapes } = useSelector((state) => state.shape);

	const dispatch = useDispatch();
	const [file, setFile] = useState(null);
	const [url, setUrl] = useState(null);

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
			console.error(error);
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

			const reader = new FileReader();
			reader.readAsDataURL(temp[0]);

			reader.onloadend = function (e) {
				setUrl(reader.result);
			}.bind(this);
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
			<input type="file" onChange={handleOnChange} />
			<div className="fill">
				<img
					src={shapes?.[0]?.type !== SHAPE_TYPE.image ? url : shapes?.[0]?.src}
					alt=""
				/>
			</div>
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
