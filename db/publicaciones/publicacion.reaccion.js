const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Publicacion = require('./publicacion');
const Usuario = require('../usuarios/usuario');
const Reaccion = require('./reaccion');

const PublicacionReaccion = sequelize.define('publicacion_reacciones', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

let relacion1 = {
    foreignKey: {
        name: 'id_usuario_que_reacciona',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'NO ACTION'
};

let relacion2 = {
    foreignKey: {
        name: 'id_publicacion',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

let relacion3 = {
    foreignKey: {
        name: 'id_reaccion',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

Usuario.hasOne(PublicacionReaccion, relacion1);
PublicacionReaccion.belongsTo(Usuario, relacion1);

Publicacion.hasMany(PublicacionReaccion, relacion2);
PublicacionReaccion.belongsTo(Publicacion, relacion2);

Reaccion.hasMany(PublicacionReaccion, relacion3);
PublicacionReaccion.belongsTo(Reaccion, relacion3);

module.exports = PublicacionReaccion;