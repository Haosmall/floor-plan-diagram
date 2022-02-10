const express = require("express");
const shapeController = require("../controllers/ShapeController");
// const uploadFile = require("../middlewares/uploadFile");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const shapeRouter = () => {
	router.post("", shapeController.addShape);
	router.delete("", shapeController.deleteManyShape);
	router.put("", shapeController.updateManyShape);
	router.put("/:id", shapeController.updateShape);
	router.delete("/:id", shapeController.deleteShape);
	router.patch(
		"/:id/back-ground",
		upload.single("file"),
		shapeController.updateShapeImage
	);
	router.post(
		"/back-ground",
		upload.single("file"),
		shapeController.addImageShape
	);
	return router;
};

module.exports = shapeRouter;
