const Estudio = require('../db/usuarios/usuario.estudio');

module.exports = class EstudioModel {
    constructor(idUsuario, tipo, titulo, descripcion, año) {
        this.idUsuario = idUsuario;
        this.tipo = tipo;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.año = año;
    }

    registrarEstudio = async () => {
        try {
            await Estudio.create({
                tipo: this.tipo,
                titulo: this.titulo,
                descripcion: this.descripcion,
                año: this.año,
                id_usuario: this.idUsuario
            });
            return 'Estudio creado';
        } catch (error) {
            throw new Error('Error al registrar estudio');
        }
    }
    
    modificarEstudio = async (idEstudio) => {
        try {
            let estudioAModificar = await Estudio.findOne({
                where: {
                    id: idEstudio,
                    id_usuario: this.idUsuario
                }
            });
            if(estudioAModificar == null)
                throw new Error();                        
            estudioAModificar.tipo = this.tipo;
            estudioAModificar.titulo = this.titulo;
            estudioAModificar.descripcion = this.descripcion;
            estudioAModificar.año = this.año;
            await estudioAModificar.save();
            return 'Estudio modificado';
        } catch (error) {
            throw new Error('Error al modificar estudio');
        }
    }

    eliminarEstudio = async (idEstudio) => {
        try {
            let estudioAEliminar = await Estudio.findOne({
                where: {
                    id: idEstudio,
                    id_usuario: this.idUsuario
                }
            });
            if(estudioAEliminar == null)
                throw new Error();
            await estudioAEliminar.destroy();
            return 'Estudio eliminado';
        } catch (error) {
            throw new Error('Error al eliminar estudio');
        }
    }
}