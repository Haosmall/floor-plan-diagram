import axiosClient from "./axiosClient";

const authApi = {
	login: (username, password) => {
		return axiosClient.post("admin/login", { username, password });
	},
};

export default authApi;
