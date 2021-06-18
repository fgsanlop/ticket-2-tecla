const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const Desempeño = sequelize.define('desempeños', {
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

Desempeño.findOrCreate({ where: { nombre: 'Calidad del código' } });
Desempeño.findOrCreate({ where: { nombre: 'Velocidad de entrega' } });
Desempeño.findOrCreate({ where: { nombre: 'Performance del código' } });

module.exports = Desempeño;