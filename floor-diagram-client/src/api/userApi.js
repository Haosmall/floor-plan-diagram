import axiosClient from "./axiosClient";

const API_URL = "/users";

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
