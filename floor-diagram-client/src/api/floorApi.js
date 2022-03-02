import axiosClient from "./axiosClient";

const API_URL = "/floors";

const floorApi = {
	fetchListFloors: (floorId) => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchFloorById: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/`);
	},

	fetchListRoomsByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/rooms/`);
	},

	fetchListGroupsByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/groups/`);
	},

	fetchListTeamsByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/teams/`);
	},

	fetchListProjectsByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/projects/`);
	},

	fetchListEmployeesByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/employees/`);
	},

	fetchShapeByFloor: (floorId) => {
		return axiosClient.get(`${API_URL}/${floorId}/shape/`);
	},

	addFloor: (floorInfo) => {
		return axiosClient.post(`${API_URL}/`, floorInfo);
	},

	updateFloor: (floorId, floorInfo) => {
		return axiosClient.put(`${API_URL}/${floorId}/`, floorInfo);
	},

	deleteFloor: (floorId) => {
		return axiosClient.delete(`${API_URL}/${floorId}/`, {
			params: { floorId },
		});
	},
};

export default floorApi;
