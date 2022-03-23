const express = require("express");
const { getParcels, createParcel } = require("../controllers/parcelsController");

const router = express.Router();

router.get("/", getParcels);
router.post("/", createParcel);

module.exports = router;