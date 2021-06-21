const ConocimientoExtraModel = require('../models/usuario.conocimiento.extra.model');

const registrarConocimientoExtra = async (idUsuario, datos) => {    
    const { nombre, descripcion } = datos;
    let nuevoConocimientoExtra = new ConocimientoExtraModel(idUsuario, nombre, descripcion);    
    try {
        return await nuevoConocimientoExtra.registrarConocimientoExtra();
    } catch (error) {
        throw error;
    }
} 

const modificarConocimientoExtra = async (idConocimientoExtra, idUsuario, datos) => {
    const { nombre, descripcion } = datos;
    let modConocimientoExtra = new ConocimientoExtraModel(idUsuario, nombre, descripcion);    
    try {
        return await modConocimientoExtra.modificarConocimientoExtra(idConocimientoExtra);
    } catch (error) {
        throw error;
    }
}

const eliminarConocimientoExtra = async (idConocimientoExtra, idUsuario) => {
    let conocimientoExtra = new ConocimientoExtraModel(idUsuario);    
    try {
        return await conocimientoExtra.eliminarConocimientoExtra(idConocimientoExtra);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registrarConocimientoExtra,
    modificarConocimientoExtra,
    eliminarConocimientoExtra
}
