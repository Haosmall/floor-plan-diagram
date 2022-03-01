import axiosClient from "./axiosClient";

const API_URL = "/employee";

const userApi = {
	fetchUserProfile: () => {
		return axiosClient.get(`${API_URL}/me`);
	},
	fetchListUsers: (name) => {
		return axiosClient.get(`${API_URL}/`, {
			params: { name },
		});
	},
};

export default userApi;
