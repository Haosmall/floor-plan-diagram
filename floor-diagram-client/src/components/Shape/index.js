import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import {
	Circle,
	Ellipse,
	Group,
	Image,
	Rect,
	Text,
	Transformer,
} from "react-konva";
import useImage from "use-image";
import { DEFAULT_SHAPE, SHAPE_TYPE } from "../../utils/constants";

const Shape = (props) => {
	const { shape, onClick, isSelected, onChange, onDragEnd, isLockBackGround } =
		props;

	const {
		_id,
		type,
		width,
		height,
		fill,
		rotation,
		x,
		y,
		radius,
		src,
		staff,
		text,
	} = shape;

	const shapeRef = useRef(null);

	const trRef = useRef();

	// useEffect
	useEffect(() => {
		if (isSelected) {
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	// Text position
	const textPosition = ((shapeType) => {
		let [x, y] = [null, null];

		if (shapeType === SHAPE_TYPE.rect) {
			x = width / 2;
			y = height / 2;
		}

		return { x, y };
	})(type);

	const handleTransform = async (e) => {
		const node = shapeRef.current;

		const scaleX = node.scaleX();
		const scaleY = node.scaleY();

		shape.width = width * scaleX;
		shape.height = height * scaleY;
		shape.rotation = node.rotation();

		onChange(shape);

		node.scaleX(1);
		node.scaleY(1);
	};

	const handleDragEnd = (e) => {
		const { x, y } = e.target.attrs;
		console.log("gr: ", e.target.attrs);
		onDragEnd(x, y);
	};

	const [image] = useImage(src);

	return (
		<>
			{type !== SHAPE_TYPE.image ? (
				<Group
					draggable
					x={x}
					y={y}
					onDragStart={onClick}
					onDragEnd={handleDragEnd}
					onClick={onClick}
					onTransformEnd={handleTransform}
					rotation={rotation}
					ref={shapeRef}
				>
					{type === SHAPE_TYPE.rect && (
						<Rect stroke="black" width={width} height={height} fill="#fff" />
					)}
					{console.log({ width, height })}

					{type === SHAPE_TYPE.circle && (
						<Circle
							stroke="black"
							radius={radius}
							width={width}
							height={height}
							fill="#fff"
						/>
					)}

					{type === SHAPE_TYPE.ellipse && (
						<Ellipse
							stroke="black"
							radius={[radius, radius]}
							width={width}
							height={height}
							fill="#fff"
						/>
					)}

					<Text
						text={text}
						align="center"
						x={textPosition.x - 16}
						y={textPosition.y - 4}
						fontSize={16}
					/>
				</Group>
			) : (
				<Image
					x={x}
					y={y}
					width={width}
					height={height}
					image={image}
					draggable={!isLockBackGround}
					ref={shapeRef}
					onDragStart={() => {
						!isLockBackGround && onClick();
					}}
					onDragEnd={handleDragEnd}
					onClick={() => {
						!isLockBackGround && onClick();
					}}
					onTransformEnd={handleTransform}
					rotation={rotation}
				/>
			)}
			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
};

Shape.propTypes = {
	shape: PropTypes.object,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	onDragEnd: PropTypes.func,
};

Shape.defaultProps = {
	shape: DEFAULT_SHAPE,
	onClick: null,
	onChange: null,
	onDragEnd: null,
};

export default Shape;
