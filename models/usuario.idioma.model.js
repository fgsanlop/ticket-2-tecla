const Idioma = require('../db/usuarios/usuario.idioma');

module.exports = class IdiomaModel {
    constructor(idUsuario, idioma, porcentaje) {
        this.idUsuario = idUsuario;
        this.idioma = idioma;
        this.porcentaje = porcentaje;
    }

    registrarIdioma = async () => {
        try {
            await Idioma.create({
                idioma: this.idioma,
                porcentaje: this.porcentaje,
                id_usuario: this.idUsuario
            });
            return 'Idioma creado';
        } catch (error) {
            throw new Error('Error al registrar idioma');
        }
    }
    
    modificarIdioma = async (idIdioma) => {
        try {
            let idiomaAModificar = await Idioma.findOne({
                where: {
                    id: idIdioma,
                    id_usuario: this.idUsuario
                }
            });
            if(idiomaAModificar == null)
                throw new Error();
            idiomaAModificar.idioma = this.idioma;
            idiomaAModificar.porcentaje = this.porcentaje;
            await idiomaAModificar.save();
            return 'Idioma modificado';
        } catch (error) {
            throw new Error('Error al modificar idioma');
        }
    }

    eliminarIdioma = async (idIdioma) => {
        try {
            let idiomaAEliminar = await Idioma.findOne({
                where: {
                    id: idIdioma,
                    id_usuario: this.idUsuario
                }
            });
            if(idiomaAEliminar == null)
                throw new Error();
            await idiomaAEliminar.destroy();
            return 'Idioma eliminado';
        } catch (error) {
            throw new Error('Error al eliminar idioma');
        }
    }
}