const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');
const Desempeno = require('../tecla/desempeno');

const UsuarioDesempeno = sequelize.define('usuario_desempeños', {
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
        name: 'id_desempeño',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(UsuarioDesempeno, relacion1);
UsuarioDesempeno.belongsTo(Usuario, relacion1);

Desempeno.hasMany(UsuarioDesempeno, relacion2);
UsuarioDesempeno.belongsTo(Desempeno, relacion2);

module.exports = UsuarioDesempeno;