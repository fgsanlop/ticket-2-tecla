const TutorModel = require('../models/tutor.model');

const calificarConocimientos = async (idUsuario, puntuaciones) => {  
    try {                
        let tutor = new TutorModel(idUsuario, puntuaciones);
        let resultado = await tutor.calificarConocimientos();
        return resultado;
    } catch (error) {
        throw error;
    }
}

const calificarTecnologias = async (idUsuario, puntuaciones) => {  
    try {                
        let tutor = new TutorModel(idUsuario, puntuaciones);
        let resultado = await tutor.calificarTecnologias();
        return resultado;
    } catch (error) {
        throw error;
    }
}

const calificarDesempe├▒os = async (idUsuario, puntuaciones) => {  
    try {                
        let tutor = new TutorModel(idUsuario, puntuaciones);
        let resultado = await tutor.calificarDesempe├▒os();
        return resultado;
    } catch (error) {
        throw error;
    }
}

const calificarHabilidadesBlandas = async (idUsuario, puntuaciones) => {  
    try {                
        let tutor = new TutorModel(idUsuario, puntuaciones);
        let resultado = await tutor.calificarHabilidadesBlandas();
        return resultado;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    calificarConocimientos,
    calificarTecnologias,
    calificarDesempe├▒os,
    calificarHabilidadesBlandas
}