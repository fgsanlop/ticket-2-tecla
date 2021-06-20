const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');
const Usuario = require('./usuario');

const Estudio = sequelize.define('usuario_estudios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    año: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1900,
            max: new Date().getFullYear()
        }
    }
}, { createdAt: false });

let relacion = {
    foreignKey: {
        name: 'id_usuario',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
}

Usuario.hasMany(Estudio, relacion);
Estudio.belongsTo(Usuario, relacion);

module.exports = Estudio;