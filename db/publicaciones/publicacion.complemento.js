const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Publicacion = require('./publicacion');
const Usuario = require('../usuarios/usuario');

const PublicacionComplemento = sequelize.define('publicacion_complementos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING(50),
        allowNull: true,
    }
});

let relacion = {
    foreignKey: {
        name: 'id_publicacion',
        type: Sequelize.INTEGER,
        allowNull: false,
        constraints: false,
        targetKey: 'id'
    },
    onDelete: 'CASCADE'
}

Publicacion.hasMany(PublicacionComplemento, relacion);
PublicacionComplemento.belongsTo(Publicacion, relacion);

module.exports = PublicacionComplemento;