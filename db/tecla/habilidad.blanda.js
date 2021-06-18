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

HabilidadBlanda.findOrCreate({ where: { nombre: 'Enfocado' } });
HabilidadBlanda.findOrCreate({ where: { nombre: 'Trabajo en equipo' } });
HabilidadBlanda.findOrCreate({ where: { nombre: 'Comprometido' } });
HabilidadBlanda.findOrCreate({ where: { nombre: 'Comunicación' } });
HabilidadBlanda.findOrCreate({ where: { nombre: 'Capacidad de aprendizaje' } });
HabilidadBlanda.findOrCreate({ where: { nombre: 'Resolución de problemas' } });


module.exports = HabilidadBlanda;