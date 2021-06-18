const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');

const Feedback = sequelize.define('usuario_feedback', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comentario: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
}, { freezeTableName: true });

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

Usuario.hasMany(Feedback, relacion1);
Feedback.belongsTo(Usuario, relacion1);

Usuario.hasMany(Feedback, relacion2);
Feedback.belongsTo(Usuario, relacion2);


module.exports = Feedback;