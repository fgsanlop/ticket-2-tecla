const { Sequelize } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('../usuarios/usuario');

const Chat = sequelize.define('chats', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, { updatedAt: false });

let relacion1 = {
    foreignKey: {
        name: 'id_usuario_1',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

let relacion2 = {
    foreignKey: {
        name: 'id_usuario_2',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Chat, relacion1);
Chat.belongsTo(Usuario, relacion1);

Usuario.hasMany(Chat, relacion2);
Chat.belongsTo(Usuario, relacion2);

module.exports = Chat;