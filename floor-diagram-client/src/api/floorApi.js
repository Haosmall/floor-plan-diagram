import axiosClient from "./axiosClient";

const API_URL = "/floor";

const floorApi = {
	fetchListShapeByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/shapes`);
	},

	fetchFloorById: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}`);
	},

	addFloor: (name, buildingId, admin, users) => {
		return axiosClient.post(`${API_URL}`, { name, buildingId, admin, users });
	},

	updateFloor: (floorId, buildingId, name, admin, users) => {
		return axiosClient.put(`${API_URL}/${floorId}`, {
			name,
			buildingId,
			admin,
			users,
		});
	},

	deleteFloor: (floorId) => {
		return axiosClient.delete(`${API_URL}/${floorId}`);
	},
};

export default floorApi;
