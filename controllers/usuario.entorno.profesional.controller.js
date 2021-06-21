const EntornoProfesionalModel = require('../models/usuario.entorno.profesional.model');

const calificarEntornosProfesionales = async (idUsuario, puntuaciones) => { 
    try {                
        let entornosProfesionales = new EntornoProfesionalModel(idUsuario, puntuaciones);
        return entornosProfesionales.calificarEntornosProfesionales();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    calificarEntornosProfesionales
}