import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
	baseURL: "http://localhost:5000/api",
	// baseURL: `${process.env.REACT_APP_API_URL}/api`,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		console.error(error.response);
		throw error;
	}
);

export default axiosClient;
