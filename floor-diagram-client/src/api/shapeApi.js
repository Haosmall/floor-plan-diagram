import axiosClient from "./axiosClient";

const API_URL = "/shape";

const shapeApi = {
	addShape: (shape) => {
		return axiosClient.post(`${API_URL}/`, shape);
	},

	updateShape: (shape) => {
		return axiosClient.put(`${API_URL}/${shape._id}`, shape);
	},

	updateManyShape: (shapes) => {
		return axiosClient.put(`${API_URL}/`, { shapes });
	},

	deleteShape: (shapeId) => {
		return axiosClient.delete(`${API_URL}/${shapeId}`);
	},

	deleteManyShape: (shapeIds) => {
		return axiosClient.delete(`${API_URL}/`, { data: { shapeIds } });
	},

	addImageShape: (body) => {
		return axiosClient.post(`${API_URL}/back-ground/`, body);
	},

	updateImageShape: (shapeId, file) => {
		return axiosClient.patch(`${API_URL}/${shapeId}/back-ground/`, file);
	},
};

export default shapeApi;
