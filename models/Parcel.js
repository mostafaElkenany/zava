
module.exports = (sequelize, DataTypes) => {
    const Parcel = sequelize.define('Parcel', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNul: false
        },
        truckId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Trucks",
                key: 'id',
            }
        }
    }, {
        timestamps: true,
    });

    return Parcel;
}

