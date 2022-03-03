import axiosClient from "./axiosClient";

const API_URL = "/groups";

const groupApi = {
	addGroup: (groupInfo) => {
		return axiosClient.post(`${API_URL}/`, groupInfo);
	},

	updateGroup: (groupId, groupInfo) => {
		return axiosClient.put(`${API_URL}/${groupId}/`, groupInfo);
	},

	deleteGroup: (groupId) => {
		return axiosClient.delete(`${API_URL}/${groupId}/`);
	},

	fetchListGroups: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchGroupById: (groupId) => {
		return axiosClient.get(`${API_URL}/${groupId}/`);
	},

	fetchListTeamsByGroup: (groupId) => {
		return axiosClient.get(`${API_URL}/${groupId}/teams/`);
	},

	fetchListProjectsByGroup: (groupId) => {
		return axiosClient.get(`${API_URL}/${groupId}/projects/`);
	},

	fetchListEmployeesByGroup: (groupId) => {
		return axiosClient.get(`${API_URL}/${groupId}/employees/`);
	},

	fetchListShapesByGroup: (groupId) => {
		return axiosClient.get(`${API_URL}/${groupId}/shapes/`);
	},
};

export default groupApi;
