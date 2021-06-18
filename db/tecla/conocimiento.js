const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const Conocimiento = sequelize.define('conocimientos', {
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

Conocimiento.findOrCreate({ where: { nombre: 'Base de datos' } });
Conocimiento.findOrCreate({ where: { nombre: 'APIS' } });
Conocimiento.findOrCreate({ where: { nombre: 'Testing' } });
Conocimiento.findOrCreate({ where: { nombre: 'Seguridad' } });
Conocimiento.findOrCreate({ where: { nombre: 'Teoría de objetos' } });

module.exports = Conocimiento;