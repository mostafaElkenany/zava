
module.exports = (sequelize, DataTypes) => {
    const Truck = sequelize.define('Truck', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNul: true
        },
    }, {
        timestamps: true,
    });

    return Truck;
}

