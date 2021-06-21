const FeedbackModel = require('../models/usuario.feedback.model');

const registrarFeedback = async (idUsuarioEmisor, idUsuarioReceptor, comentario) => {
    try {
        let nuevoFeedback = new FeedbackModel(idUsuarioEmisor, idUsuarioReceptor, comentario);
        return await nuevoFeedback.registrarFeedback();
    } catch (error) {
        throw error;
    }
}

const modificarFeedback = async (idUsuarioEmisor, idUsuarioReceptor, comentario) => {
    try {
        let modFeedback = new FeedbackModel(idUsuarioEmisor, idUsuarioReceptor, comentario);
        return await modFeedback.modificarFeedback();
    } catch (error) {
        throw error;
    }
}

const eliminarFeedback = async (idUsuarioEmisor, idUsuarioReceptor) => {
    try {
        let feedback = new FeedbackModel(idUsuarioEmisor, idUsuarioReceptor);
        return await feedback.eliminarFeedback();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registrarFeedback,
    modificarFeedback,
    eliminarFeedback
}