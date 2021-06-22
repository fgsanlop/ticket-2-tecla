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
        type: DataTypes.STRING(10), //Use DATEONLY pero por alguna razon me guardaba las fechas con un dia anterior, cuando consultaba los datos eran 2 dias anteriores a lo registrado
        allowNull: false, //Validare la fecha con JOI para que no haya dias 32 o mes 13 
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