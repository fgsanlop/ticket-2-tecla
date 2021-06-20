const Conocimiento = require('../db/tecla/conocimiento');
const UsuarioConocimiento = require('../db/usuarios/usuario.conocimiento');
const Tecnologia = require('../db/tecla/tecnologia');
const UsuarioTecnologia = require('../db/usuarios/usuario.tecnologia');
const Desempeno = require('../db/tecla/desempeno');
const UsuarioDesempeno = require('../db/usuarios/usuario.desempeno');
const HabilidadBlanda = require('../db/tecla/habilidad.blanda');
const UsuarioHabilidadBlanda = require('../db/usuarios/usuario.habilidad.blanda');
const EntornoProfesional = require('../db/tecla/entorno.profesional');
const UsuarioEntornoProfesional = require('../db/usuarios/usuario.entorno.profesional');

//const UsuarioModel = require('./usuario.model');

module.exports = class TutorModel{ //extends UsuarioModel {
    constructor(idUsuario, puntuaciones) {
        this.idUsuario = idUsuario;
        this.puntuaciones = puntuaciones;    
    }

    calificarConocimientos = async () => {
        try {
            let puntuacionesRegistradas = await UsuarioConocimiento.findAll({ where: { id_usuario: this.idUsuario } });
            if(puntuacionesRegistradas.length == 0)
                throw new Error('No existe usuario');    
            let conocimientos = await Conocimiento.findAll();
            if(this.puntuaciones.length != conocimientos.length)
                throw new Error(`Faltan o sobran datos ( ${conocimientos.length} puntuacion(es) )`);
            for (let i = 0; i < conocimientos.length; i++) {              
                puntuacionesRegistradas[i].puntuacion = this.puntuaciones[i];
                await puntuacionesRegistradas[i].save();
            }
            return 'Puntuaciones sobre conocimientos actualizadas';
        } catch (error) {
            console.log(error)
            throw error;
        }            
    }

    calificarTecnologias = async () => {
        try {
            let puntuacionesRegistradas = await UsuarioTecnologia.findAll({ where: { id_usuario: this.idUsuario } });
            if(puntuacionesRegistradas.length == 0)
                throw new Error('No existe usuario');    
            let tecnologias = await Tecnologia.findAll();
            if(this.puntuaciones.length != tecnologias.length)
                throw new Error(`Faltan o sobran datos ( ${tecnologias.length} puntuacion(es) )`);
            for (let i = 0; i < tecnologias.length; i++) {              
                puntuacionesRegistradas[i].puntuacion = this.puntuaciones[i];
                await puntuacionesRegistradas[i].save();
            }
            return 'Puntuaciones sobre tecnologias actualizadas';
        } catch (error) {
            console.log(error)
            throw error;
        }            
    }

    calificarDesempeños = async () => {
        try {
            let puntuacionesRegistradas = await UsuarioDesempeno.findAll({ where: { id_usuario: this.idUsuario } });
            if(puntuacionesRegistradas.length == 0)
                throw new Error('No existe usuario');    
            let desempenos = await Desempeno.findAll();
            if(this.puntuaciones.length != desempenos.length)
                throw new Error(`Faltan o sobran datos ( ${desempenos.length} puntuacion(es) )`);
            for (let i = 0; i < desempenos.length; i++) {              
                puntuacionesRegistradas[i].puntuacion = this.puntuaciones[i];
                await puntuacionesRegistradas[i].save();
            }
            return 'Puntuaciones sobre desempeños actualizadas';
        } catch (error) {
            console.log(error)
            throw error;
        }      
    }

    calificarHabilidadesBlandas = async () => {
        try {
            let puntuacionesRegistradas = await UsuarioHabilidadBlanda.findAll({ where: { id_usuario: this.idUsuario } });
            if(puntuacionesRegistradas.length == 0)
                throw new Error('No existe usuario');    
            let habilidadesBlandas = await HabilidadBlanda.findAll();
            if(this.puntuaciones.length != habilidadesBlandas.length)
                throw new Error(`Faltan o sobran datos ( ${habilidadesBlandas.length} puntuacion(es) )`);
            for (let i = 0; i < habilidadesBlandas.length; i++) {              
                puntuacionesRegistradas[i].puntuacion = this.puntuaciones[i];
                await puntuacionesRegistradas[i].save();
            }
            return 'Puntuaciones sobre habilidades blandas actualizadas';
        } catch (error) {
            console.log(error)
            throw error;
        }          
    }
}