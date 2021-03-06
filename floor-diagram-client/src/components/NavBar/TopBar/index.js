import {
	ArrowLeftOutlined,
	DeleteOutlined,
	SaveOutlined,
	SyncOutlined,
	UndoOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import { Header } from "antd/lib/layout/layout";
import shapeApi from "api/shapeApi";
import { useDisable } from "hooks";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setFloor } from "redux/floorSlice";
import {
	deleteShape,
	resetShape,
	resetShapeState,
	resetTempShapeState,
	setListOriginalShapes,
} from "redux/shapeSlice";
import "./style.scss";

const TopBar = (props) => {
	const { buildings } = props;

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
		dispatch(setFloor({ floorId: null }));
		navigate("/buildings");
	};

	const isDisable = useDisable(
		listShapesDelete,
		listShapesUpdate,
		listNewShapes
	);

	return (
		<div className="top-bar" style={{ paddingInline: "20px !important" }}>
			<div className="btn-container">
				<Button
					disabled={isDisable}
					onClick={handleSave}
					shape="round"
					icon={<SaveOutlined />}
				>
					Save
				</Button>

				<Button
					disabled={isDisable}
					onClick={handleReset}
					shape="round"
					icon={<UndoOutlined />}
				>
					Reset
				</Button>

				<Button
					disabled={!shape ? true : false}
					onClick={handleDelete}
					shape="round"
					danger
					icon={<DeleteOutlined />}
				>
					Delete
				</Button>

				<Button onClick={handleBack} shape="round" icon={<ArrowLeftOutlined />}>
					Back
				</Button>
			</div>

			<Select defaultValue={id} onChange={handleOnChangeBuilding}>
				{buildings?.map((building) => (
					<Option key={building._id} value={building._id}>
						{building.name}
					</Option>
				))}
			</Select>
		</div>
	);
};

TopBar.propTypes = {
	buildings: PropTypes.array,
};

TopBar.defaultProps = {
	buildings: [],
};
export default React.memo(TopBar);
