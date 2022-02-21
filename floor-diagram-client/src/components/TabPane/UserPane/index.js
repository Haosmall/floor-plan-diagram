import { Col, Input, Row } from "antd";
import UserTable from "components/Table/UserTable";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchListUsers } from "redux/userSlice";

const UserPane = (props) => {
	const { users, onSelect } = props;

	const dispatch = useDispatch();

	const inputRef = useRef();

	const handleOnChangeText = async (e) => {
		const value = e.target.value;

		if (inputRef.current) {
			clearTimeout(inputRef.current);
		}

		inputRef.current = setTimeout(() => {
			dispatch(fetchListUsers({ name: value }));
		}, 400);
	};

	return (
		<>
			<Row justify="space-between" gutter={[8, 8]}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Input
						placeholder="Search"
						ref={inputRef}
						onChange={handleOnChangeText}
					/>
				</Col>
			</Row>

			<UserTable data={users} onSelect={onSelect} />
		</>
	);
};

UserPane.propTypes = { users: PropTypes.array, onSelect: PropTypes.func };
UserPane.defaultProps = { users: [], onSelect: null };

export default UserPane;
