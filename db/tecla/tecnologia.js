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

Tecnologia.findOrCreate({ where: { nombre: 'Node.js' } });
Tecnologia.findOrCreate({ where: { nombre: 'Frontend' } });
Tecnologia.findOrCreate({ where: { nombre: 'Swagger' } });
Tecnologia.findOrCreate({ where: { nombre: 'Javascript' } });

module.exports = Tecnologia;