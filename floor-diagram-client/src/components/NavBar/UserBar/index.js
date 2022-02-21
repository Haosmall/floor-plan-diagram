import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Avatar, Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import { UserOutlined } from "@ant-design/icons";

const UserBar = (props) => {
	const { name } = props;
	const dispatch = useDispatch();
	return (
		<div id="user-bar">
			<div className="user-info">
				<Avatar icon={<UserOutlined />} />
				<div className="user-name">{name}</div>
			</div>
			<Button danger shape="round" onClick={() => dispatch(logout())}>
				Logout
			</Button>
		</div>
	);
};

UserBar.propTypes = {
	name: PropTypes.string,
};

UserBar.defaultProps = {
	name: PropTypes.string,
};
export default React.memo(UserBar);
