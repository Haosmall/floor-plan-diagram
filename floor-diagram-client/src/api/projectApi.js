import axiosClient from "./axiosClient";

const API_URL = "/projects";

const projectApi = {
	addProject: (title, groupId) => {
		return axiosClient.post(`${API_URL}`, { title, groupId });
	},

	updateProject: (projectId, title, groupId) => {
		return axiosClient.put(`${API_URL}/${projectId}`, { title, groupId });
	},

	deleteProject: (projectId) => {
		return axiosClient.delete(`${API_URL}/${projectId}`);
	},
};

export default projectApi;
