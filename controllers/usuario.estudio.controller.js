const EstudioModel = require('../models/usuario.estudio.model');

const registrarEstudio = async (idUsuario, datos) => {    
    const { tipo, titulo, descripcion, año } = datos;
    let nuevoEstudio = new EstudioModel(idUsuario, tipo, titulo, descripcion, año);    
    try {
        return await nuevoEstudio.registrarEstudio();
    } catch (error) {
        throw error;
    }
} 

const modificarEstudio = async (idEstudio, idUsuario, datos) => {
    const { tipo, titulo, descripcion, año } = datos;
    let modEstudio = new EstudioModel(idUsuario, tipo, titulo, descripcion, año);    
    try {
        return await modEstudio.modificarEstudio(idEstudio);
    } catch (error) {
        throw error;
    }
}

const eliminarEstudio = async (idEstudio, idUsuario) => {
    let estudio = new EstudioModel(idUsuario);    
    try {
        return await estudio.eliminarEstudio(idEstudio);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registrarEstudio,
    modificarEstudio,
    eliminarEstudio
}
