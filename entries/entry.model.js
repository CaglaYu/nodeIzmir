const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        animaltype: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: true },
        breed: { type: DataTypes.TINYINT, allowNull: false },
        sex: { type: DataTypes.TINYINT, allowNull: true },
        age: { type: DataTypes.TINYINT, allowNull: true },
        microchip: { type: DataTypes.BOOLEAN, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: false },
        castrated: { type: DataTypes.BOOLEAN, allowNull: true },
        color: { type: DataTypes.STRING, allowNull: false },
        height: { type: DataTypes.SMALLINT, allowNull: true },
        weight: { type: DataTypes.SMALLINT, allowNull: true },
        image1: { type: DataTypes.BLOB, allowNull: true },
        image2: { type: DataTypes.BLOB, allowNull: true },
        image3: { type: DataTypes.BLOB, allowNull: true },
        lastseen: { type: DataTypes.DATE, allowNull: true },
        described: { type: DataTypes.STRING, allowNull: true }
    };


    return sequelize.define('Entry', attributes);
}