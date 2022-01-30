const mongoose = require("mongoose");
const Shape = require("../models/Shape");
const Project = require("../models/Project");
const ObjectId = mongoose.Types.ObjectId;
const awsS3Service = require("./AwsS3Service");

class ShapeService {
	async getListShapeByFloor(floorId) {
		const listShapes = await Shape.find({ floorId });
		const listProjects = await Project.find({});

		const result = [];

		for (const shape of listShapes) {
			if (shape.projectId) {
				for (const project of listProjects) {
					if (project._id.toString() == shape.projectId.toString()) {
						result.push({ ...shape._doc, groupId: project.groupId });
					}
				}
			} else {
				result.push({ ...shape._doc, groupId: null });
			}
		}

		return result;
	}

	async addShape(shapeIfo) {
		const shape = new Shape(shapeIfo);
		const newShape = shape.save(shape);
		return newShape;
	}

	async addImageShape(floorId, file) {
		const shape = new Shape({
			floorId,
			type: "image",
			width: 500,
			height: 500,
		});
		const { _doc } = await shape.save(shape);

		const src = await this.uploadShapeImage(_doc._id, file);

		await Shape.updateOne({ _id: ObjectId(_doc._id) }, { src });

		return { ..._doc, src };
	}

	async uploadShapeImage(id, file) {
		this.checkImage(file);

		const shape = await Shape.findById(id);

		if (shape?.src) await awsS3Service.deleteFile(shape?.src);

		const newImageUrl = await awsS3Service.uploadFile(file);
		await Shape.updateOne(
			{ _id: ObjectId(id) },
			{
				$set: {
					src: newImageUrl,
				},
			}
		);

		return newImageUrl;
	}

	async updateShape(_id, shapeInfo) {
		await Shape.updateOne({ _id: ObjectId(_id) }, shapeInfo);
	}

	async deleteShape(_id) {
		await Shape.deleteOne({ _id: ObjectId(_id) });
	}

	async deleteManyShape(shapeIds) {
		const listObjectId = shapeIds.map((id) => ObjectId(id));

		await Shape.deleteMany({ _id: { $in: listObjectId } });
	}

	checkImage(file) {
		const { mimetype } = file;

		if (mimetype !== "image/jpeg" && mimetype !== "image/png")
			throw new Error("Image invalid");
	}
}

module.exports = new ShapeService();
