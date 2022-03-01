import axiosClient from "./axiosClient";

const API_URL = "/buildings";

const buildingApi = {
	fetchListBuildings: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchBuildingById: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}`);
	},

	fetchListFloorsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/floors`);
	},

	fetchListRoomsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/rooms`);
	},

	fetchListGroupsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/groups`);
	},

	fetchListTeamsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/teams`);
	},

	fetchListProjectsByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/projects/`);
	},

	fetchListEmployeesByBuildingId: (buildingId) => {
		return axiosClient.get(`${API_URL}/${buildingId}/employees/`);
	},

	addBuilding: (buildingInfo) => {
		return axiosClient.post(`${API_URL}`, buildingInfo);
	},

	updateBuilding: (buildingId, buildingInfo) => {
		return axiosClient.put(`${API_URL}/${buildingId}/`, buildingInfo);
	},

	deleteBuilding: (buildingId) => {
		return axiosClient.delete(`${API_URL}/${buildingId}/`);
	},
};

export default buildingApi;
