const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');
const Conocimiento = require('../tecla/conocimiento');

const UsuarioConocimiento = sequelize.define('usuario_conocimientos', {
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
        allowNull: false
    },
    onDelete: 'CASCADE'
}

let relacion2 = {
    foreignKey: {
        name: 'id_conocimiento',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(UsuarioConocimiento, relacion1);
UsuarioConocimiento.belongsTo(Usuario, relacion1);

Conocimiento.hasMany(UsuarioConocimiento, relacion2);
UsuarioConocimiento.belongsTo(Conocimiento, relacion2);

module.exports = UsuarioConocimiento;