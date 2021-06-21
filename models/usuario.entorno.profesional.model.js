const EntornoProfesional = require('../db/tecla/entorno.profesional');
const UsuarioEntornoProfesional = require('../db/usuarios/usuario.entorno.profesional');

module.exports = class EntornoProfesionalModel {  
    constructor(idUsuario, puntuaciones) {
        this.idUsuario = idUsuario;
        this.puntuaciones = puntuaciones;    
    }

    calificarEntornosProfesionales = async () => {
        try {
            let puntuacionesRegistradas = await UsuarioEntornoProfesional.findAll({ where: { id_usuario: this.idUsuario } });
            if(puntuacionesRegistradas.length == 0)
                throw new Error('No existe usuario');    
            let entornosProfesionales = await EntornoProfesional.findAll();
            if(this.puntuaciones.length != entornosProfesionales.length)
                throw new Error(`Faltan o sobran datos ( ${entornosProfesionales.length} puntuacion(es) )`);
            for (let i = 0; i < entornosProfesionales.length; i++) {              
                puntuacionesRegistradas[i].puntuacion = this.puntuaciones[i];
                await puntuacionesRegistradas[i].save();
            }
            return 'Puntuaciones sobre entornos profesionales actualizadas';
        } catch (error) {            
            console.log(error)
            throw error;
        }            
    }

}