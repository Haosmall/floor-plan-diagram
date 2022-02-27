import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import BuildingPage from "./pages/BuildingPage";
import ExceptionPage from "./pages/ExceptionPage";
import HomePage from "./pages/HomePage";
import { fetchUserProfile } from "./redux/userSlice";

function App() {
	const dispatch = useDispatch();
	const [isFetch, setIsFetch] = useState(false);

	// if (process.env.NODE_ENV !== "production") {
	// 	const { whyDidYouUpdate } = require("why-did-you-update");
	// 	whyDidYouUpdate(React);
	// }

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");

			if (token) await dispatch(fetchUserProfile());

			setIsFetch(true);
		};

		fetchProfile();
	}, []);

	if (!isFetch) return "";

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<Navigate to="/buildings" />} />

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Login isRegister={true} />} />

					<Route exact path="/buildings" element={<ProtectedRoute />}>
						<Route exact path="/buildings" element={<HomePage />} />
					</Route>

					<Route path="/buildings/:id" element={<ProtectedRoute />}>
						<Route path="/buildings/:id" element={<BuildingPage />} />
					</Route>

					<Route path="*" element={<ExceptionPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
