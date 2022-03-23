const db = require("../models/index");

const Parcel = db.Parcel;

const getParcels = async (req, res) => {
    try {
        const parcels = await Parcel.findAll();
        res.status(200).json(parcels);
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

const createParcel = async (req, res) => {
    try {
        const newParcel = await Parcel.create(req.body);
        res.status(200).json(newParcel);
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

module.exports = { getParcels, createParcel };