const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Publicacion = require('./publicacion');
const Usuario = require('../usuarios/usuario');

const PublicacionComentario = sequelize.define('publicacion_comentarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comentario: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
});

let relacion1 = {
    foreignKey: {
        name: 'id_usuario_comentador',
        type: Sequelize.INTEGER,
        allowNull: false,
        constraints: false,
        targetKey: 'id'
    },
    onDelete: 'NO ACTION'
}

let relacion2 = {
    foreignKey: {
        name: 'id_publicacion',
        type: Sequelize.INTEGER,
        allowNull: false,
        constraints: false,
        targetKey: 'id'
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(PublicacionComentario, relacion1);
PublicacionComentario.belongsTo(Usuario, relacion1);

Publicacion.hasMany(PublicacionComentario, relacion2);
PublicacionComentario.belongsTo(Publicacion, relacion2);

module.exports = PublicacionComentario;