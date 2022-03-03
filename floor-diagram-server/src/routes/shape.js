const express = require("express");
const shapeController = require("../controllers/ShapeController");
const upload = require("../middleware/imageUpload");
const router = express.Router();

const shapeRouter = () => {
  router.post("", upload.single("file"), shapeController.addShape);
  router.get("", shapeController.getListShapes);
  router.get("/:id", shapeController.getShapeById);
  router.put("/:id", upload.single("file"), shapeController.updateShape);
  router.delete("/:id", shapeController.deleteShape);
  router.get("/:id/employee", shapeController.getShapeByEmployee);
  router.get("/:id/floor", shapeController.getShapeByFloor);
  router.get("/:id/room", shapeController.getShapesByRoom);
  router.put("", shapeController.updateManyShape);
  router.delete("", shapeController.deleteManyShape);

  return router;

  // router.post("", shapeController.addShape);
  // router.delete("", shapeController.deleteManyShape);
  // router.put("", shapeController.updateManyShape);
  // router.put("/:id", shapeController.updateShape);
  // router.delete("/:id", shapeController.deleteShape);
  // router.patch(
  // 	"/:id/back-ground",
  // 	upload.single("file"),
  // 	shapeController.updateShapeImage
  // );
  // router.post(
  // 	"/back-ground",
  // 	upload.single("file"),
  // 	shapeController.addImageShape
  // );
  //   return router;
};

module.exports = shapeRouter;
