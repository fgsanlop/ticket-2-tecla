const IdiomaModel = require('../models/usuario.idioma.model');

const registrarIdioma = async (idUsuario, datos) => {    
    const { idioma, porcentaje } = datos;
    let nuevoIdioma = new IdiomaModel(idUsuario, idioma, porcentaje);    
    try {
        return await nuevoIdioma.registrarIdioma();
    } catch (error) {
        throw error;
    }
} 

const modificarIdioma = async (idIdioma, idUsuario, datos) => {
    const { idioma, porcentaje } = datos;
    let modIdioma = new IdiomaModel(idUsuario, idioma, porcentaje);    
    try {
        return await modIdioma.modificarIdioma(idIdioma);
    } catch (error) {
        throw error;
    }
}

const eliminarIdioma = async (idIdioma, idUsuario) => {
    let idioma = new IdiomaModel(idUsuario);    
    try {
        return await idioma.eliminarIdioma(idIdioma);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registrarIdioma,
    modificarIdioma,
    eliminarIdioma
}
