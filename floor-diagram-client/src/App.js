import "antd/dist/antd.css";
import { useEffect, useState } from "react";
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
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { fetchUserProfile } from "./redux/userSlice";

function App() {
	const dispatch = useDispatch();
	const [isFetch, setIsFetch] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");
			console.log("App: " + token);

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

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
