import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Avatar, Button, message, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateEmployee, updateProfile } from "redux/employeeSlice";
import { FormOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import UserModal from "components/Modal/UserModal";
import employeeApi from "api/employeeApi";

const UserBar = (props) => {
	const { name } = props;

	const { user } = useSelector((state) => state.employee);

	const dispatch = useDispatch();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleSubmitModal = async (profile) => {
		try {
			await employeeApi.updateEmployee(user._id, profile);
			dispatch(
				updateProfile({
					...user,
					...profile,
				})
			);

			message.success("Update successfully");
		} catch (error) {
			console.error(error);
			message.error("An error has occurred");
		}
	};

	return (
		<>
			<Popover
				content={
					<div>
						{!user?.isAdmin && (
							<div style={{ marginBottom: "10px" }}>
								<Button
									icon={<FormOutlined />}
									onClick={() => setIsModalVisible(true)}
								>
									Profile&nbsp;
								</Button>
							</div>
						)}
						<div>
							<Button
								danger
								icon={<LogoutOutlined />}
								onClick={() => dispatch(logout())}
							>
								Logout
							</Button>
						</div>
					</div>
				}
				trigger="hover"
			>
				<div className="user-info">
					<div className="user-name">{name}</div>
					<Avatar icon={<UserOutlined />} />
				</div>
			</Popover>

			<UserModal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onSubmit={handleSubmitModal}
				initialValues={user}
				title="Update profile"
				isAddMode={false}
			/>
		</>
	);
};

UserBar.propTypes = {
	name: PropTypes.string,
};

UserBar.defaultProps = {
	name: PropTypes.string,
};
export default React.memo(UserBar);
