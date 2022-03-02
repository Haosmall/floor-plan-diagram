import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import UserTable from "components/Table/UserTable";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchListEmployees } from "redux/employeeSlice";

const UserPane = (props) => {
	const { users, onAdd, onEdit, onSelect } = props;

	const dispatch = useDispatch();

	const inputRef = useRef();

	const handleOnChangeText = async (e) => {
		const value = e.target.value;

		if (inputRef.current) {
			clearTimeout(inputRef.current);
		}

		inputRef.current = setTimeout(() => {
			dispatch(fetchListEmployees());
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
				{/* <Col xs={24} sm={24} md={24} lg={20} xl={20}>
					<Input
						placeholder="Search"
						ref={inputRef}
						onChange={handleOnChangeText}
					/>
				</Col> */}
			</Row>

			<UserTable data={users} onSelect={onSelect} />
		</>
	);
};

UserPane.propTypes = { users: PropTypes.array, onSelect: PropTypes.func };
UserPane.defaultProps = { users: [], onSelect: null };

export default UserPane;
