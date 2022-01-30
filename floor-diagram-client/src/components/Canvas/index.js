import { Content } from "antd/lib/layout/layout";
import PropTypes from "prop-types";
import React from "react";
import { Image, Layer, Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_SHAPE, SHAPE_TYPE } from "../../constants";
import { setShape, updateShape } from "../../redux/shapeSlice";
import Shape from "../Shape";
import "./style.scss";

const Canvas = (props) => {
	const { stageRef, isLockBackGround } = props;

	const { shapes, shape } = useSelector((state) => state.shape);
	const { floor } = useSelector((state) => state.floor);
	const { users } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleDragEnd = (x, y) => {
		const newShape = { ...shape, x, y };
		console.log("handleDragEnd: ", newShape);
		dispatch(updateShape({ shape: newShape }));
	};

	const handleScaling = (values) => {
		const newShape = { ...shape, ...values };
		console.log("handleScaling: ", newShape);
		dispatch(updateShape({ shape: newShape }));
		dispatch(setShape({ _id: newShape._id }));
	};

	const handleSelectShape = (id) => {
		shape?._id !== id && dispatch(setShape({ _id: id }));
	};

	const onClickEmptyArea = (e) => {
		const emptySpace = e.target === e.target.getStage();
		if (emptySpace) {
			dispatch(setShape({ _id: null }));
		}
	};

	return (
		<Content style={{ backgroundColor: "#fff" }}>
			<Stage
				width={window.innerWidth - 455}
				height={window.innerHeight - 128}
				ref={stageRef}
				onClick={onClickEmptyArea}
			>
				<Layer>
					{floor &&
						shapes.map((ele, index) => {
							const staff = users.find((user) => user._id === ele.staff);

							const text = staff?.name || "[null]";
							return (
								<Shape
									key={ele._id}
									onClick={(e) => handleSelectShape(ele._id)}
									isSelected={shape?._id === ele._id}
									shape={{ ...ele, text }}
									onChange={handleScaling}
									onDragEnd={handleDragEnd}
									isLockBackGround={isLockBackGround}
								/>
							);
						})}
				</Layer>
			</Stage>
		</Content>
	);
};

Canvas.propTypes = {
	floors: PropTypes.array,
};

Canvas.defaultProps = {
	floors: [],
};
export default Canvas;
