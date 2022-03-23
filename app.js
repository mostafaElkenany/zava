const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const trucksRouter = require("./routes/trucks");
const parcelsRouter = require("./routes/parcels");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(express.json());
app.use("/api/trucks", trucksRouter);
app.use("/api/parcels", parcelsRouter);


module.exports = app