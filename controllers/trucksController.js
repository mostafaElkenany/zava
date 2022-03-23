const db = require("../models/index");

const { Truck, Parcel } = db;

const getTrucks = async (req, res) => {
    try {
        const trucks = await Truck.findAll();
        res.status(200).send(trucks);
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

const createTruck = async (req, res) => {
    try {
        const newTruck = await Truck.create(req.body);
        res.status(201).json({ newTruck });
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

const loadTruck = async (req, res) => {
    try {
        const { truckId } = req.params;
        const { parcelIds = [] } = req.body;

        const truck = await Truck.findOne({ where: { id: truckId } });

        if (!truck) return res.status(400).json({ message: "Bad Request", error: "truck not found" });

        const result = await Parcel.update({ truckId: truckId }, {
            where: {
                id: parcelIds,
                truckId: null
            },
        });

        if (!result[0]) return res.status(400).json({ message: "Bad Request", error: "parcels not found or loaded in another truck" });

        res.status(200).json({ message: "Truck loaded successfully", NoOfParcelsLoaded: result[0] });

    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

const unloadTruck = async (req, res) => {
    try {
        const { truckId } = req.params;
        const { parcelIds = [] } = req.body;

        const truck = await Truck.findOne({ where: { id: truckId } });

        if (!truck) return res.status(400).json({ message: "Bad Request", error: "truck not found" });

        const result = await Parcel.update({ truckId: null }, {
            where: {
                id: parcelIds,
                truckId
            },
        });

        if (!result[0]) return res.status(400).json({ message: "Bad Request", error: "parcels not found in truck" });

        res.status(200).json({ message: "Truck unloaded successfully", NoOfParcelsUnloaded: result[0] });

    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

const getTruckParcels = async (req, res) => {
    try {
        const { truckId } = req.params;
        const truck = await Truck.findOne({ where: { id: truckId } });

        if (!truck) return res.status(400).json({ message: "Bad Request", error: "truck not found" });

        let truckWeight = 0;

        const truckParcels = await Parcel.findAll({ where: { truckId } });
        truckParcels.forEach(parcel => truckWeight += parcel.weight);

        res.status(200).json({ parcelsNumber: truckParcels.length, truckWeight });
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

module.exports = {
    getTrucks,
    createTruck,
    loadTruck,
    unloadTruck,
    getTruckParcels
};