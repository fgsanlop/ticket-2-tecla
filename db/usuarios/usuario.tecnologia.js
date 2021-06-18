const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');
const Tecnologia = require('../tecla/tecnologia');

const UsuarioTecnologia = sequelize.define('usuario_tecnologias', {
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
        name: 'id_tecnologia',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(UsuarioTecnologia, relacion1);
UsuarioTecnologia.belongsTo(Usuario, relacion1);

Tecnologia.hasMany(UsuarioTecnologia, relacion2);
UsuarioTecnologia.belongsTo(Tecnologia, relacion2);

module.exports = UsuarioTecnologia;