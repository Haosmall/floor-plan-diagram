import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const UserBar = (props) => {
	const { name } = props;
	const dispatch = useDispatch();
	return (
		<div id="user-bar">
			<div> {name}</div>
			<Button onClick={() => dispatch(logout())}>Logout</Button>
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
