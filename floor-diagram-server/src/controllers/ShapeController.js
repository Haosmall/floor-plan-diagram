const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const shapeService = require("../services/ShapeService");

class ShapeController {
  // [POST] /api/shape
  async addShape(req, res, next) {
    try {
      const response = await shapeService.addShape(req.body);

      console.log(response.file);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/shapes
  async getListShapes(req, res, next) {
    try {
      const response = await shapeService.getListShapes(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/shapes/:id
  async getShapeById(req, res, next) {
    try {
      const response = await shapeService.getShapeById(req.params.id);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/shapes/:id
  async updateShape(req, res, next) {
    try {
      const response = await shapeService.updateShape(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/shapes/:id
  async deleteShape(req, res, next) {
    try {
      const response = await shapeService.deleteShape(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/shapes/:id/employee
  async getShapeByEmployee(req, res, next) {
    try {
      const response = await shapeService.getShapeByEmployee(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/shapes/:id/floor
  async getShapeByFloor(req, res, next) {
    try {
      const response = await shapeService.getShapeByFloor(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/shapes/:id/room
  async getShapesByRoom(req, res, next) {
    try {
      const response = await shapeService.getShapesByRoom(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [POST] /api/shape/back-ground
  //   async addImageShape(req, res, next) {
  //     const { file } = req;
  //     try {
  //       const response = await shapeService.addImageShape(req.body.floorId, file);

  //       res.status(201).json(response);
  //       // res.send("Oke");
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  // [PUT] /api/shape
  //   async updateManyShape(req, res, next) {
  //     try {
  //       const { shapes } = req.body;

  //       for (const shape of shapes) {
  //         const { _id, createdAt, updatedAt, __v, ...shapeInfo } = shape;

  //         await shapeService.updateShape(_id, shapeInfo);
  //       }

  //       res.status(204).json();
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  // [DELETE] /api/shapes/:id
  //   async deleteShape(req, res, next) {
  //     try {
  //       const response = await shapeService.deleteShape(req.params.id);
  //       res.status(204).json(response);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  // [DELETE] /api/shapes
  //   async deleteManyShape(req, res, next) {
  //     try {
  //       const { shapeIds } = req.body;
  //       const response = await shapeService.deleteManyShape(shapeIds);
  //       res.status(201).json(response);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  // [PATCH] /api/shape/:id/back-ground
  //   async updateShapeImage(req, res, next) {
  //     const { file } = req;
  //     try {
  //       const response = await shapeService.uploadShapeImage(req.params.id, file);
  //       res.status(200).json(response);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
}

module.exports = new ShapeController();
