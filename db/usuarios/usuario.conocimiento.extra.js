const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');

const ConocimientoExtra = sequelize.define('usuario_conocimientos_extras', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
}, { createdAt: false });

let relacion = {
    foreignKey: {
        name: 'id_usuario',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(ConocimientoExtra, relacion);
ConocimientoExtra.belongsTo(Usuario, relacion);

module.exports = ConocimientoExtra;