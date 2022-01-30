import axiosClient from "./axiosClient";

const API_URL = "/users";

const userApi = {
	fetchUserProfile: () => {
		return axiosClient.get(`${API_URL}/me`);
	},
	fetchListUsers: () => {
		return axiosClient.get(`${API_URL}/`);
	},
};

export default userApi;
