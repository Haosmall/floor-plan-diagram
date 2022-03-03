import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const UserTable = (props) => {
	const { data, onSelect, onEdit, onDelete } = props;
	const { user } = useSelector((state) => state.employee);

	const { Column } = Table;

	const handleOnEdit = (e, employee) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit(employee);
		}
	};

	const handleOnDelete = (e, employeeId) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(employeeId);
		}
	};

	const handleOnSelect = (userId) => {
		if (onSelect) {
			onSelect(userId);
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

			<Column title="Name" dataIndex="name" key="name" />
			<Column title="Username" dataIndex="username" key="username" />
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

UserTable.propTypes = {
	data: PropTypes.array,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func,
	onSelect: PropTypes.func,
};
UserTable.defaultProps = {
	data: [],
	onDelete: null,
	onEdit: null,
	onSelect: null,
};

export default React.memo(UserTable);
