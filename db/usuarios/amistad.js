const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');

const Amistad = sequelize.define('amistades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    son_amigos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

let relacion1 = {
    foreignKey: {
        name: 'id_usuario_emisor',
        type: Sequelize.INTEGER,
        allowNull: false        
    },
    onDelete: 'CASCADE'
};

let relacion2 = {
    foreignKey: {
        name: 'id_usuario_receptor',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Amistad, relacion1);
Amistad.belongsTo(Usuario, relacion1);

Usuario.hasMany(Amistad, relacion2);
Amistad.belongsTo(Usuario, relacion2);


module.exports = Amistad;