import axiosClient from "./axiosClient";

const API_URL = "/projects";

const projectApi = {
	addProject: (projectInfo) => {
		return axiosClient.post(`${API_URL}/`, projectInfo);
	},

	updateProject: (projectId, projectInfo) => {
		return axiosClient.put(`${API_URL}/${projectId}/`, projectInfo);
	},

	deleteProject: (projectId) => {
		return axiosClient.delete(`${API_URL}/${projectId}/`);
	},

	fetchListProjects: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchProjectById: (projectId) => {
		return axiosClient.get(`${API_URL}/${projectId}/`);
	},

	fetchListTeamsByProject: (projectId) => {
		return axiosClient.get(`${API_URL}/${projectId}/teams/`);
	},

	fetchListEmployeesByProject: (projectId) => {
		return axiosClient.get(`${API_URL}/${projectId}/employees/`);
	},

	fetchListShapesByProject: (projectId) => {
		return axiosClient.get(`${API_URL}/${projectId}/shapes/`);
	},
};

export default projectApi;
