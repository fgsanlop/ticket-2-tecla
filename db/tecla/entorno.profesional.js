const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const EntornoProfesional = sequelize.define('entornos_profesionales', {
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

module.exports = EntornoProfesional;