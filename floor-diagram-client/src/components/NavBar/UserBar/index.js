import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Avatar, Button, Popover } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "redux/employeeSlice";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const UserBar = (props) => {
	const { name } = props;
	const dispatch = useDispatch();
	return (
		<Popover
			content={
				<Button
					danger
					shape="round"
					icon={<LogoutOutlined />}
					onClick={() => dispatch(logout())}
				>
					Logout
				</Button>
			}
			// title="Title"
			trigger="click"
		>
			<div className="user-info">
				<div className="user-name">{name}</div>
				<Avatar icon={<UserOutlined />} />
			</div>
			{/* <div id="user-bar">
			</div> */}
		</Popover>
	);
};

UserBar.propTypes = {
	name: PropTypes.string,
};

UserBar.defaultProps = {
	name: PropTypes.string,
};
export default React.memo(UserBar);
