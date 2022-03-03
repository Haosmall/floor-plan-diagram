import axiosClient from "./axiosClient";

const API_URL = "/employees";

const employeeApi = {
	fetchListEmployees: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	addEmployee: (employeeInfo) => {
		return axiosClient.post(`${API_URL}`, employeeInfo);
	},

	updateEmployee: (employeeId, employeeInfo) => {
		return axiosClient.put(`${API_URL}/${employeeId}/`, employeeInfo);
	},

	deleteEmployee: (employeeId) => {
		return axiosClient.delete(`${API_URL}/${employeeId}/`);
	},

	promoteEmployee: (employeeId) => {
		return axiosClient.put(`${API_URL}/promote/${employeeId}/`);
	},
};

export default employeeApi;
