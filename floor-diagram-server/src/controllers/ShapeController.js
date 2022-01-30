const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const shapeService = require("../services/ShapeService");

class ShapeController {
	// [POST] /shape
	async addShape(req, res, next) {
		try {
			const response = await shapeService.addShape(req.body);

			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}
	// [POST] /shape/back-ground
	async addImageShape(req, res, next) {
		const { file } = req;
		try {
			const response = await shapeService.addImageShape(req.body.floorId, file);

			res.status(201).json(response);
			// res.send("Oke");
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /shape/:id
	async updateShape(req, res, next) {
		try {
			const response = await shapeService.updateShape(req.params.id, req.body);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /shape
	async updateManyShape(req, res, next) {
		try {
			const { shapes } = req.body;

			for (const shape of shapes) {
				const { _id, createdAt, updatedAt, __v, ...shapeInfo } = shape;

				await shapeService.updateShape(_id, shapeInfo);
			}

			res.status(204).json();
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /shapes/:id
	async deleteShape(req, res, next) {
		try {
			const response = await shapeService.deleteShape(req.params.id);
			res.status(204).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /shapes
	async deleteManyShape(req, res, next) {
		try {
			const { shapeIds } = req.body;
			const response = await shapeService.deleteManyShape(shapeIds);
			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PATCH] /shape/:id/back-ground
	async updateShapeImage(req, res, next) {
		const { file } = req;
		try {
			const response = await shapeService.uploadShapeImage(req.params.id, file);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ShapeController();
