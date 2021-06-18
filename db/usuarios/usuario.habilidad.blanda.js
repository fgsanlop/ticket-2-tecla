const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');
const HabilidadBlanda = require('../tecla/habilidad.blanda');

const UsuarioHabilidadBlanda = sequelize.define('usuario_habilidades_blandas', {
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
        name: 'id_habilidad_blanda',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(UsuarioHabilidadBlanda, relacion1);
UsuarioHabilidadBlanda.belongsTo(Usuario, relacion1);

HabilidadBlanda.hasMany(UsuarioHabilidadBlanda, relacion2);
UsuarioHabilidadBlanda.belongsTo(HabilidadBlanda, relacion2);

module.exports = UsuarioHabilidadBlanda;