const AmistadModel = require('../models/usuario.amistad.model');

const solicitarAmistad = async (idUsuarioEmisor, idUsuarioReceptor) => {
    try {
        let nuevaSolicitud = new AmistadModel(idUsuarioEmisor, idUsuarioReceptor);
        return await nuevaSolicitud.solicitarAmistad();
    } catch (error) {
        throw error;
    }
}

const aceptarAmistad = async (idUsuarioEmisor, idUsuarioReceptor) => {
    try {
        let solicitudAaceptar = new AmistadModel(idUsuarioEmisor, idUsuarioReceptor);
        return await solicitudAaceptar.aceptarAmistad();
    } catch (error) {
        throw error;
    }
}

const listarSolicitudesEnviadas = async (idUsuarioEmisor) => {
    try {
        let solicitudesEnviadas = new AmistadModel(idUsuarioEmisor);
        return await solicitudesEnviadas.listarSolicitudesEnviadas();
    } catch (error) {
        throw error;
    }
}

const listarSolicitudesRecibidas = async (idUsuarioReceptor) => {
    try {
        let solicitudesRecibidas = new AmistadModel(0, idUsuarioReceptor);
        return await solicitudesRecibidas.listarSolicitudesRecibidas();
    } catch (error) {
        throw error;
    }
}

const listarAmigos = async (idUsuario) => {
    try {
        let amigos = new AmistadModel(idUsuario);
        return await amigos.listarAmigos();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    solicitarAmistad,
    aceptarAmistad,
    listarSolicitudesEnviadas,
    listarSolicitudesRecibidas,
    listarAmigos
}