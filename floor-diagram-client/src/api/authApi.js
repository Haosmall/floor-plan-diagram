import axiosClient from "./axiosClient";

const API_URL = "/auth";

const authApi = {
	login: (username, password) => {
		return axiosClient.post(`${API_URL}/login`, { username, password });
	},
	registry: (name, username, password) => {
		return axiosClient.post(`${API_URL}/registry`, {
			name,
			username,
			password,
		});
	},
};

export default authApi;
