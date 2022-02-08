import { Button, Checkbox, message } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shapeApi from "../../api/shapeApi";
import { SHAPE_TYPE, DEFAULT_SHAPE } from "../../utils/constants";
import { addNewShape } from "../../redux/shapeSlice";
import UploadImageModal from "../UploadImageModal";
import "./style.scss";

const ToolBar = (props) => {
	const { onDragEnd, onLockBackGround, isLockBackGround } = props;

	const { floor } = useSelector((state) => state.floor);
	const { shapes } = useSelector((state) => state.shape);

	const dispatch = useDispatch();

	// state
	// const [isAddMode, setIsAddMode] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleAddShape = async (e, type) => {
		if (!floor?._id) {
			message.warning(
				"Please selectPlease select the floor before adding shapes"
			);
			return;
		}

		const x = e.nativeEvent.x - 255;
		const y = e.nativeEvent.y - 64;

		if (x < 0 || y < 0) return;

		const shape = {
			...DEFAULT_SHAPE,
			type,
			x: type !== SHAPE_TYPE.rect ? x : x - 75,
			y: type !== SHAPE_TYPE.rect ? y : y - 50,
			floorId: floor._id,
		};

		const response = await shapeApi.addShape(shape);
		dispatch(addNewShape({ shape: response }));
	};

	const handleOpenModal = () => {
		if (floor) {
			setIsModalVisible(true);
		} else {
			message.warn(
				"Please selectPlease select the floor before adding background"
			);
		}
	};

	const isAddMode = (() => {
		if (shapes?.length <= 0) {
			return true;
		}

		return shapes?.[0]?.src === "";
	})();

	return (
		<div id="tool-bar-container">
			<div
				className="shape rectangle"
				draggable="true"
				onDragEnd={(e) => {
					handleAddShape(e, SHAPE_TYPE.rect);
				}}
			></div>

			<div
				className="shape circle"
				draggable="true"
				onDragEnd={(e) => {
					handleAddShape(e, SHAPE_TYPE.circle);
				}}
			></div>

			<div
				className="shape ellipse"
				draggable="true"
				onDragEnd={(e) => {
					handleAddShape(e, SHAPE_TYPE.ellipse);
				}}
			></div>

			<Button onClick={handleOpenModal}>Background</Button>
			<Checkbox onChange={() => onLockBackGround(!isLockBackGround)}>
				Lock background
			</Checkbox>

			<UploadImageModal
				isAddMode={isAddMode}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
			/>
		</div>
	);
};

ToolBar.propTypes = {
	onDragEnd: PropTypes.func,
};

ToolBar.defaultProps = {
	onDragEnd: null,
};
export default ToolBar;
