const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../conn');

const EntornoProfesional = sequelize.define('entornos_profesionales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, { timestamps: false });

EntornoProfesional.findOrCreate({ where: { nombre: 'Versionado - Git/GitHub' } });
EntornoProfesional.findOrCreate({ where: { nombre: 'Trello - Jira' } });
EntornoProfesional.findOrCreate({ where: { nombre: 'Slack' } });
EntornoProfesional.findOrCreate({ where: { nombre: 'Metodologías Ágiles' } });

module.exports = EntornoProfesional;