import axiosClient from "./axiosClient";

const API_URL = "/rooms";

const roomApi = {
	fetchListRoom: () => {
		return axiosClient.get(`${API_URL}/`);
	},

	fetchRoomById: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/`);
	},

	fetchListGroupsByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/groups/`);
	},

	fetchListTeamsByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/teams/`);
	},

	fetchListProjectsByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/projects/`);
	},

	fetchListEmployeesByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/employees/`);
	},

	fetchListShapesByRoom: (roomId) => {
		return axiosClient.get(`${API_URL}/${roomId}/shapes/`);
	},

	addRoom: (roomInfo) => {
		return axiosClient.post(`${API_URL}/`, roomInfo);
	},

	updateRoom: (roomId, roomInfo) => {
		return axiosClient.put(`${API_URL}/${roomId}/`, roomInfo);
	},

	deleteRoom: (roomId) => {
		return axiosClient.delete(`${API_URL}/${roomId}/`);
	},
};

export default roomApi;
