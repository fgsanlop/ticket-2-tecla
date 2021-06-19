const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');
const EntornoProfesional = require('../tecla/entorno.profesional');

const UsuarioEntornoProfesional = sequelize.define('usuario_entornos_profesionales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
}, { createdAt: false });

let relacion1 = {
    foreignKey: {
        name: 'id_usuario',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    onDelete: 'CASCADE'
}

let relacion2 = {
    foreignKey: {
        name: 'id_entorno_profesional',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(UsuarioEntornoProfesional, relacion1);
UsuarioEntornoProfesional.belongsTo(Usuario, relacion1);

EntornoProfesional.hasMany(UsuarioEntornoProfesional, relacion2);
UsuarioEntornoProfesional.belongsTo(EntornoProfesional, relacion2);

module.exports = UsuarioEntornoProfesional;