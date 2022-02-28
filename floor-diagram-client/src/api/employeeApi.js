import axiosClient from "./axiosClient";

const API_URL = "/employees";

const employeeApi = {
	fetchListEmployees: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	addEmployee: (name, username) => {
		return axiosClient.post(`${API_URL}`, { name, username });
	},

	updateEmployee: (employeeId, name, username) => {
		return axiosClient.put(`${API_URL}/${employeeId}/`, { name, username });
	},

	deleteEmployee: (employeeId) => {
		return axiosClient.delete(`${API_URL}/${employeeId}/`);
	},

	promoteEmployee: (employeeId) => {
		return axiosClient.put(`${API_URL}/promote/${employeeId}/`);
	},
};

export default employeeApi;
