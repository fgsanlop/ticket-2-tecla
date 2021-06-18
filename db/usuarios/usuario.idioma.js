const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');

const Idioma = sequelize.define('usuario_idiomas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idioma: {
        type: DataTypes.STRING(40),
        allowNull: false,        
    },
    porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        }
    },
}, { createdAt: false });

let relacion = {
    foreignKey: {
        name: 'id_usuario',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Idioma, relacion);
Idioma.belongsTo(Usuario, relacion);

module.exports = Idioma;