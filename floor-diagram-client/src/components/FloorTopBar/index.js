import { Button, Select } from "antd";
import { Header } from "antd/lib/layout/layout";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import shapeApi from "../../api/shapeApi";
import { useDisable } from "../../hooks";
import { setFloor } from "../../redux/floorSlice";
import {
	deleteShape,
	resetShape,
	resetShapeState,
	resetTempShapeState,
	setListOriginalShapes,
} from "../../redux/shapeSlice";
import "./style.scss";

const FloorTopBar = (props) => {
	const { buildings, selectedShape } = props;

	const { shape, listShapesDelete, listShapesUpdate, listNewShapes } =
		useSelector((state) => state.shape);
	const { building } = useSelector((state) => state.building);

	const { Option } = Select;

	const navigate = useNavigate();
	const { id } = useParams();

	const dispatch = useDispatch();

	const handleSave = async () => {
		listShapesDelete.length > 0 &&
			(await shapeApi.deleteManyShape(listShapesDelete));

		listShapesUpdate.length > 0 &&
			(await shapeApi.updateManyShape(listShapesUpdate));

		dispatch(setListOriginalShapes());
		dispatch(resetTempShapeState());
	};
	const handleDelete = () => {
		dispatch(deleteShape({ _id: shape._id }));
	};

	const handleReset = () => {
		dispatch(resetShape());
	};

	const handleOnChangeBuilding = (value) => {
		if (building?._id === value) return;
		dispatch(setFloor({ floorId: null }));
		dispatch(resetShapeState());
		navigate(`/buildings/${value}`);
	};

	const handleBack = (value) => {
		dispatch(resetShapeState());
		navigate("/buildings");
	};

	const isDisable = useDisable(
		listShapesDelete,
		listShapesUpdate,
		listNewShapes
	);

	return (
		<Header style={{ backgroundColor: "#f1f2f6" }}>
			<Button disabled={isDisable} onClick={handleSave}>
				Save
			</Button>
			<Button disabled={!shape ? true : false} onClick={handleDelete}>
				Delete
			</Button>
			<Button disabled={isDisable} onClick={handleReset}>
				Reset
			</Button>
			<Button onClick={handleBack}>Back</Button>

			<Select defaultValue={id} onChange={handleOnChangeBuilding}>
				{buildings?.map((building) => (
					<Option key={building._id} value={building._id}>
						{building.name}
					</Option>
				))}
			</Select>
		</Header>
	);
};

FloorTopBar.propTypes = {
	floors: PropTypes.array,
};

FloorTopBar.defaultProps = {
	floors: [],
};
export default React.memo(FloorTopBar);
