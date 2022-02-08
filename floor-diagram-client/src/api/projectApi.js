import axiosClient from "./axiosClient";

const API_URL = "/projects";

const projectApi = {
	addProject: (title, groupId) => {
		return axiosClient.post(
			`${API_URL}/`,
			{ title, groupId },
			{
				params: { groupId },
			}
		);
	},

	updateProject: (projectId, title, groupId) => {
		return axiosClient.put(
			`${API_URL}/${projectId}/`,
			{ title, groupId },
			{
				params: { projectId },
			}
		);
	},

	deleteProject: (projectId) => {
		return axiosClient.delete(`${API_URL}/${projectId}/`, {
			params: { projectId },
		});
	},

	fetchListShapeByProject: (projectId) => {
		return axiosClient.get(`${API_URL}/${projectId}/shapes/`);
	},
};

export default projectApi;
