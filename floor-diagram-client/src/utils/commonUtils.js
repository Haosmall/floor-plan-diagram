import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Modal, message } = require("antd");

const commonUtils = {
	confirmModal: (callback) => {
		Modal.confirm({
			title: "Confirm",
			icon: <ExclamationCircleOutlined />,
			content: "Are you sure?",
			okText: "Ok",
			cancelText: "Cancel",
			onOk: () => {
				try {
					callback();
				} catch (error) {
					console.log(error);
					message.error("An error has occurred");
				}
			},
		});
	},

	mergeArray: (currentArray, subArray) => {
		let newArray = [];
		if (subArray.length <= 0) {
			newArray = currentArray;
		} else {
			for (const element of currentArray) {
				const index = subArray.findIndex((ele) => ele._id === element._id);
				index >= 0 ? newArray.push(element) : newArray.push(subArray[index]);
			}
		}

		console.log("newArray: ", newArray);
		return newArray;
	},
};

export default commonUtils;
