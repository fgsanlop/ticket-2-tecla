const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const Tecnologia = sequelize.define('tecnologias', {
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

module.exports = Tecnologia;