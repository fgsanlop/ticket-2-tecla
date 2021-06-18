const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const Usuario = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_usuario: {
        type: DataTypes.STRING(20),
        allowNull: false,        
        unique: {
            args: true,
            msg: 'Nombre de usuario ya registrado'
        }
    },
    pass: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    imagen_perfil: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    nombres: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ciudad: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    linkedin: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    github: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    es_tutor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Usuario;