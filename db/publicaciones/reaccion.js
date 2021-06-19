const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const Reaccion = sequelize.define('reacciones', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, { timestamps: false });

module.exports = Reaccion;