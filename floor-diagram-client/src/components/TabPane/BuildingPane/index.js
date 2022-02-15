import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import BuildingTable from "components/Table/BuildingTable";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchListBuildings } from "redux/buildingSlice";

const BuildingPane = (props) => {
	const { buildings, onAdd, onEdit, onDelete, onSelect } = props;

	const dispatch = useDispatch();

	const inputRef = useRef();

	const handleOnChangeText = async (e) => {
		const value = e.target.value;

		if (inputRef.current) {
			clearTimeout(inputRef.current);
		}

		inputRef.current = setTimeout(() => {
			dispatch(fetchListBuildings({ name: value }));
		}, 400);
	};

	return (
		<>
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={4} xl={4}>
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={onAdd}
						shape="round"
					>
						Add
					</Button>
				</Col>
				<Col xs={24} sm={24} md={24} lg={20} xl={20}>
					<Input
						placeholder="Search"
						ref={inputRef}
						onChange={handleOnChangeText}
					/>
				</Col>
			</Row>

			<BuildingTable
				data={buildings}
				onEdit={onEdit}
				onDelete={onDelete}
				onSelect={onSelect}
			/>
		</>
	);
};

BuildingPane.propTypes = { buildings: PropTypes.array };
BuildingPane.defaultProps = { buildings: [] };

export default BuildingPane;
