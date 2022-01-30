const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userWorkSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		groupId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			required: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
	},
	{ timestamps: true }
);

const UserWork = mongoose.model("UserWork", userWorkSchema);
module.exports = UserWork;
