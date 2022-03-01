import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import authApi from "api/authApi";
import { fetchUserProfile, setLogin, setUser } from "redux/employeeSlice";

const LoginForm = (props) => {
	const { isRegister } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (value) => {
		const { username, password } = value;
		try {
			const { token, ...userInfo } = await authApi.login(username, password);
			localStorage.setItem("token", token);
			// await dispatch(fetchUserProfile());
			dispatch(setUser(userInfo));
			dispatch(setLogin(true));
			navigate("/");
		} catch (error) {
			const { response } = error;
			message.error(response.data.message);
		}
	};

	const handleRegister = async (value) => {
		const { name, username, password } = value;
		const { token } = await authApi.registry(name, username, password);
		localStorage.setItem("token", token);
		await dispatch(fetchUserProfile());
		dispatch(setLogin(true));

		navigate("/");
	};

	return (
		<div className="form-container">
			<div className="form-title">{isRegister ? "Register" : "Login"}</div>

			<Form
				name="basic"
				labelCol={{
					span: 5,
				}}
				wrapperCol={{
					span: 18,
				}}
				onFinish={isRegister ? handleRegister : handleLogin}
				// onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				{isRegister && (
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input your name!",
							},
						]}
					>
						<Input />
					</Form.Item>
				)}
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 5,
						span: 20,
					}}
				>
					<Button
						type="primary"
						htmlType="submit"
						style={{ marginBottom: "8px" }}
					>
						{isRegister ? "Submit" : "Login"}
					</Button>
					{/* <br />
					<Link to={isRegister ? "/login" : "/register"}>
						{isRegister ? "Already have an account?" : "Don't have an account?"}
					</Link> */}
				</Form.Item>
			</Form>
		</div>
	);
};

LoginForm.propTypes = {
	isRegister: PropTypes.bool,
};

LoginForm.defaultProps = {
	isRegister: false,
};
export default LoginForm;
