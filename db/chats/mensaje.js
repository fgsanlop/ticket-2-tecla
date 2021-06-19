const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('../usuarios/usuario');
const Chat = require('./chat');

const Mensaje = sequelize.define('chat_mensajes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mensaje: {
        type: DataTypes.STRING(300),
        allowNull: false
    }
}, { updatedAt: false });

let relacion1 = {
    foreignKey: {
        name: 'id_usuario_chat',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'NO ACTION'
}

let relacion2 = {
    foreignKey: {
        name: 'id_chat',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Mensaje, relacion1);
Mensaje.belongsTo(Usuario, relacion1);

Chat.hasMany(Mensaje, relacion2);
Mensaje.belongsTo(Chat, relacion2);

module.exports = Mensaje;