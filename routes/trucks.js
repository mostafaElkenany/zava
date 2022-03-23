const express = require("express");
const { getTrucks, createTruck, loadTruck, unloadTruck, getTruckParcels } = require("../controllers/trucksController");
const router = express.Router();

router.get("/", getTrucks);
router.post("/", createTruck);
router.post("/:truckId/load", loadTruck);
router.post("/:truckId/unload", unloadTruck);
router.get("/:truckId", getTruckParcels);

module.exports = router;