import axiosClient from "./axiosClient";

const API_URL = "/buildings";

const buildingApi = {
	fetchListBuildings: () => {
		return axiosClient.get(`${API_URL}`);
	},

	fetchBuildingById: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}`);
	},

	fetchListFloorsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/floors`);
	},

	fetchListGroupsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/groups`);
	},

	fetchListProjectsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/projects`);
	},

	addBuilding: (name, users, admin) => {
		return axiosClient.post(`${API_URL}`, { name, users, admin });
	},

	updateBuilding: (buildingId, name, users, admin) => {
		return axiosClient.put(`${API_URL}/${buildingId}`, { name, users, admin });
	},

	deleteBuilding: (buildingId) => {
		return axiosClient.delete(`${API_URL}/${buildingId}`);
	},
};

export default buildingApi;
