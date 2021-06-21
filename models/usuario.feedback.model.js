const Feedback = require('../db/usuarios/usuario.feedback');

module.exports = class FeedbackModel {
    constructor(idUsuarioEmisor, idUsuarioReceptor, comentario) {
        this.idUsuarioEmisor = idUsuarioEmisor;
        this.idUsuarioReceptor = idUsuarioReceptor;
        this.comentario = comentario;
    }

    comprobarFeedback = async () => {
        let existeFeedback = await Feedback.findOne({
            where: {
                id_usuario_emisor: this.idUsuarioEmisor,
                id_usuario_receptor: this.idUsuarioReceptor
            }
        });
        if(existeFeedback != null)
            return existeFeedback;
        else
            return false;            
    }

    registrarFeedback = async () => {
        try {
            let existeFeedback = await this.comprobarFeedback(); 
            if(!existeFeedback){
                await Feedback.create({
                    id_usuario_emisor: this.idUsuarioEmisor,
                    id_usuario_receptor: this.idUsuarioReceptor,
                    comentario: this.comentario
                });
                return 'Feedback creado'
            }           
            else
                throw new Error('Ya has dado feedback a este usuario');
        } catch (error) {
            throw error;
        }
    }

    modificarFeedback = async () => {
        try {
            let feedbackAModificar = await this.comprobarFeedback(); 
            if(!feedbackAModificar)
                throw new Error('Error al modificar feedback');    
            else{
                feedbackAModificar.comentario = this.comentario;
                await feedbackAModificar.save();
                return 'Feedback modificado';
            }
        } catch (error) {
            throw error;
        }
    }

    eliminarFeedback = async () => {
        try {
            let feedbackAEliminar = await this.comprobarFeedback(); 
            if(!feedbackAEliminar)
                throw new Error('Error al eliminar feedback');    
            else{                
                await feedbackAEliminar.destroy();
                return 'Feedback eliminado';
            }
        } catch (error) {
            throw error;
        }
    }
}