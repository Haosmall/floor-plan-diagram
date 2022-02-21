import { Table } from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

const UserTable = (props) => {
	const { data, onSelect } = props;

	const { Column } = Table;

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
			{/* <Column
				title="Admin"
				dataIndex="admin"
				render={(_, { admin }) => <span>{admin.name}</span>}
			/> */}
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
