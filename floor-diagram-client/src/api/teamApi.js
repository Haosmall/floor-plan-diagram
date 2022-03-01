import axiosClient from "./axiosClient";

const API_URL = "/teams";

const teamApi = {
	addTeam: (teamInfo) => {
		return axiosClient.post(`${API_URL}/`, teamInfo);
	},

	updateTeam: (teamId, teamInfo) => {
		return axiosClient.put(`${API_URL}/${teamId}/`, teamInfo);
	},

	deleteTeam: (teamId) => {
		return axiosClient.delete(`${API_URL}/${teamId}/`);
	},

	fetchListTeams: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchTeamById: (teamId) => {
		return axiosClient.get(`${API_URL}/${teamId}/`);
	},

	fetchListProjectsByTeam: (teamId) => {
		return axiosClient.get(`${API_URL}/${teamId}/projects/`);
	},

	fetchListEmployeesByTeam: (teamId) => {
		return axiosClient.get(`${API_URL}/${teamId}/employees/`);
	},

	fetchListShapesByTeam: (teamId) => {
		return axiosClient.get(`${API_URL}/${teamId}/shapes/`);
	},
};

export default teamApi;
