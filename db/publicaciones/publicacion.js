const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('../usuarios/usuario');

const Publicacion = sequelize.define('publicaciones', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    texto: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
});

let relacion = {
    foreignKey: {
        name: 'id_usuario',
        type: Sequelize.INTEGER,
        allowNull: false,
        constraints: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Publicacion, relacion);
Publicacion.belongsTo(Usuario, relacion);

module.exports = Publicacion;