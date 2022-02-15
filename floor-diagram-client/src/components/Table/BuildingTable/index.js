import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const BuildingTable = (props) => {
	const { data, onEdit, onDelete, onSelect } = props;

	const { user } = useSelector((state) => state.user);

	const { Column } = Table;

	const handleOnEdit = (e, building) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit({ ...building, admin: building.admin._id });
		}
	};

	const handleOnDelete = (e, buildingId) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(buildingId);
		}
	};

	const handleOnSelect = (buildingId) => {
		if (onSelect) {
			onSelect(buildingId);
		}
	};

	return (
		<Table
			className="building-table"
			dataSource={data}
			pagination={false}
			rowKey={(record) => record._id}
			scroll={{ y: 600 }}
			onRow={(record, rowIndex) => {
				return {
					onClick: () => handleOnSelect(record._id),
				};
			}}
		>
			<Column
				width={80}
				align="center"
				title="No."
				render={(_, __, index) => <span>{index + 1}</span>}
			/>

			<Column title="Building name" dataIndex="name" key="name" />
			<Column
				title="Admin"
				dataIndex="admin"
				render={(_, { admin }) => <span>{admin.name}</span>}
			/>
			{user.isAdmin && (
				<Column
					align="left"
					width={120}
					render={(record) => {
						return (
							<div className="btn-group">
								<Button
									shape="circle"
									icon={<EditOutlined />}
									onClick={(e) => handleOnEdit(e, record)}
								/>
								<Button
									shape="circle"
									danger
									icon={<DeleteOutlined />}
									onClick={(e) => handleOnDelete(e, record._id)}
								/>
							</div>
						);
					}}
				/>
			)}
		</Table>
	);
};

BuildingTable.propTypes = {
	data: PropTypes.array,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func,
	onSelect: PropTypes.func,
};
BuildingTable.defaultProps = {
	data: [],
	onDelete: null,
	onEdit: null,
	onSelect: null,
};

export default React.memo(BuildingTable);
