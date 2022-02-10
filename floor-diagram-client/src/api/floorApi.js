import axiosClient from "./axiosClient";

const API_URL = "/floor";

const floorApi = {
	fetchListShapeByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/shapes/`, {
			params: { floorId },
		});
	},

	fetchFloorById: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/`, {
			params: { floorId },
		});
	},

	addFloor: (name, buildingId, admin, users) => {
		return axiosClient.post(
			`${API_URL}/`,
			{ name, buildingId, admin, users },
			{
				params: { buildingId },
			}
		);
	},

	updateFloor: (floorId, buildingId, name, admin, users) => {
		return axiosClient.put(
			`${API_URL}/${floorId}/`,
			{
				name,
				buildingId,
				admin,
				users,
			},
			{
				params: { floorId },
			}
		);
	},

	deleteFloor: (floorId) => {
		return axiosClient.delete(`${API_URL}/${floorId}/`, {
			params: { floorId },
		});
	},
};

export default floorApi;
