const db = require("../models/index");

const Parcel = db.Parcel;

const getParcels = async (req, res) => {
    try {
        const parcels = await Parcel.findAll();
        res.status(200).send(parcels);
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

const createParcel = async (req, res) => {
    try {
        const { weight } = req.body;
        if (!weight) return res.status(400).json({ message: "Bad Request", error: "Weight is required" });
        const newParcel = await Parcel.create({ weight });
        res.status(201).json({ newParcel });
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

module.exports = { getParcels, createParcel };