const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const HabilidadBlanda = sequelize.define('habilidades_blandas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, { timestamps: false });

module.exports = HabilidadBlanda;