import axiosClient from "./axiosClient";

const API_URL = "/groups";

const groupApi = {
	addGroup: (title, buildingId) => {
		return axiosClient.post(
			`${API_URL}/`,
			{ title, buildingId },
			{
				params: { buildingId },
			}
		);
	},

	updateGroup: (groupId, title, buildingId) => {
		return axiosClient.put(
			`${API_URL}/${groupId}/`,
			{ title, buildingId },
			{
				params: { buildingId },
			}
		);
	},

	deleteGroup: (groupId) => {
		return axiosClient.delete(`${API_URL}/${groupId}/`, {
			params: { groupId },
		});
	},
};

export default groupApi;
