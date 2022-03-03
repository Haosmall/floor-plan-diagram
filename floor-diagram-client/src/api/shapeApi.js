import axiosClient from "./axiosClient";

const API_URL = "/shapes";

const shapeApi = {
	addShape: (shape) => {
		return axiosClient.post(`${API_URL}/`, shape);
	},

	updateShape: (shapeId, shape) => {
		return axiosClient.put(`${API_URL}/${shapeId}`, shape);
	},

	deleteShape: (shapeId) => {
		return axiosClient.delete(`${API_URL}/${shapeId}`);
	},

	updateManyShape: (shapes) => {
		return axiosClient.put(`${API_URL}/`, { shapes });
	},

	deleteManyShape: (shapeIds) => {
		return axiosClient.delete(`${API_URL}/`, { data: { shapeIds } });
	},

	fetchListShapesByEmployee: (employeeId) => {
		return axiosClient.get(`${API_URL}/${employeeId}/employees/`);
	},

	fetchListShapesByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/floors/`);
	},

	fetchListShapesByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/rooms/`);
	},
};

export default shapeApi;
