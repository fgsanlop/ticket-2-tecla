const ConocimientoExtra = require('../db/usuarios/usuario.conocimiento.extra');

module.exports = class ConocimientoExtraModel {
    constructor(idUsuario, nombre, descripcion) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    registrarConocimientoExtra = async () => {
        try {
            await ConocimientoExtra.create({
                nombre: this.nombre,
                descripcion: this.descripcion,                
                id_usuario: this.idUsuario
            });
            return 'Conocimiento extra creado';
        } catch (error) {
            throw new Error('Error al registrar conocimiento extra');
        }
    }
    
    modificarConocimientoExtra = async (idConocimientoExtra) => {
        try {
            let conocimientoExtraAModificar = await ConocimientoExtra.findOne({
                where: {
                    id: idConocimientoExtra,
                    id_usuario: this.idUsuario
                }
            });
            if(conocimientoExtraAModificar == null)
                throw new Error();                        
            conocimientoExtraAModificar.nombre = this.nombre;
            conocimientoExtraAModificar.descripcion = this.descripcion;
            await conocimientoExtraAModificar.save();
            return 'Conocimiento extra modificado';
        } catch (error) {
            throw new Error('Error al modificar conocimiento extra');
        }
    }

    eliminarConocimientoExtra = async (idConocimientoExtra) => {
        try {
            let conocimientoExtraAEliminar = await ConocimientoExtra.findOne({
                where: {
                    id: idConocimientoExtra,
                    id_usuario: this.idUsuario
                }
            });
            if(conocimientoExtraAEliminar == null)
                throw new Error();
            await conocimientoExtraAEliminar.destroy();
            return 'Conocimiento extra eliminado';
        } catch (error) {
            throw new Error('Error al eliminar conocimiento extra');
        }
    }
}