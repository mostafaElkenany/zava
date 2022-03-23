const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/dbConfig')[environment];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
})()

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Truck = require("./Truck")(sequelize, DataTypes);
db.Parcel = require("./Parcel")(sequelize, DataTypes);

(async () => {
  try {
    await sequelize.sync({ force: false });
    // console.log("Sync Successful");
  } catch (error) {
    console.log("Sync Failed", error);
  }
})()

module.exports = db;
