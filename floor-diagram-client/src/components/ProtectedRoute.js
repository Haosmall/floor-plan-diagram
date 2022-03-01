import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { user, isLogin } = useSelector((state) => state.employee);

	return user && isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
