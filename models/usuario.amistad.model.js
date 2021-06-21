const Amistad = require('../db/usuarios/amistad');
const { Op } = require("sequelize");
const Usuario = require('../db/usuarios/usuario');

module.exports = class AmistadModel {
    constructor(idUsuarioEmisor, idUsuarioReceptor) {
        this.idUsuarioEmisor = idUsuarioEmisor;
        this.idUsuarioReceptor = idUsuarioReceptor;
    }

    comprobarSolicitudAmistadEnviada = async () => {
        let existeSolicitudAmistad = await Amistad.findOne({
            where: {              
                id_usuario_emisor: {
                    [Op.or]: [this.idUsuarioEmisor, this.idUsuarioReceptor],
                },
                id_usuario_receptor: {
                    [Op.or]: [this.idUsuarioEmisor, this.idUsuarioReceptor],
                }
            }
        });
        if(existeSolicitudAmistad != null)
            return existeSolicitudAmistad;
        else
            return false;            
    }

    solicitarAmistad = async () => {
        try {
            let existeSolicitudAmistad = await this.comprobarSolicitudAmistadEnviada(); 
            if(!existeSolicitudAmistad){
                await Amistad.create({                    
                    son_amigos: false,
                    id_usuario_emisor: this.idUsuarioEmisor,
                    id_usuario_receptor: this.idUsuarioReceptor
                });
                return 'Solicitud enviada';
            }           
            else
                throw new Error();
        } catch (error) {
            throw new Error('Puede que ya exista una solicitud pendiente/aceptada o que no exista el usuario');
        }
    }

    aceptarAmistad = async () => {
        try {
            let solicitudAaceptar = await Amistad.findOne({
                where: {
                    id_usuario_emisor: this.idUsuarioEmisor,
                    id_usuario_receptor: this.idUsuarioReceptor,
                    son_amigos: false
                }
            }); 
            if(solicitudAaceptar == null)
                throw new Error('Solicitud pendiente o no realizada');    
            else{
                solicitudAaceptar.son_amigos = true;
                await solicitudAaceptar.save();
                return 'Solicitud aceptada';
            }
        } catch (error) {
            throw error;
        }
    }

    listarSolicitudesEnviadas = async () => {
        try {
            let solicitudesEnviadas = await Amistad.findAll({
                where: { 
                    id_usuario_emisor: this.idUsuarioEmisor 
                },
                include: {
                    model: Usuario,
                    as: 'receptor',
                    attributes: ['id', 'nombre_usuario', 'nombres', 'apellidos']
                } 
            });
            if(solicitudesEnviadas.length == 0)
                throw new Error('No hay solicitudes hechas');
            return solicitudesEnviadas;            
        } catch (error) {
            throw error;
        }
    }

    listarSolicitudesRecibidas = async () => {
        try {
            let solicitudesRecibidas = await Amistad.findAll({
                where: { 
                    id_usuario_receptor: this.idUsuarioReceptor,                     
                },
                include: {
                    model: Usuario,
                    as: 'emisor',
                    attributes: ['id', 'nombre_usuario', 'nombres', 'apellidos']
                } 
            });
            if(solicitudesRecibidas.length == 0)
                throw new Error('No hay solicitudes pendientes');
            return solicitudesRecibidas;            
        } catch(error) {
            throw error
        }
    } 

    listarAmigos = async () => {
        try {
            let amigosAceptados = await Amistad.findAll({
                where: {
                    son_amigos: true,
                    id_usuario_receptor: this.idUsuarioEmisor,
                    //[Op.or]: [{ id_usuario_emisor: this.idUsuarioEmisor }, { id_usuario_receptor: this.idUsuarioEmisor }],                                    
                },  
                include: {
                    model: Usuario,                    
                    as: 'emisor',
                    attributes: ['id', 'nombre_usuario', 'nombres', 'apellidos']
                },                  
            });
            let amigosSolicitados = await Amistad.findAll({
                where: {
                    son_amigos: true,
                    id_usuario_emisor: this.idUsuarioEmisor,
                    //[Op.or]: [{ id_usuario_emisor: this.idUsuarioEmisor }, { id_usuario_receptor: this.idUsuarioEmisor }],                                    
                },  
                include: {
                    model: Usuario,                    
                    as: 'receptor',
                    attributes: ['id', 'nombre_usuario', 'nombres', 'apellidos']
                },                  
            });
            if(amigosSolicitados.length == 0 && amigosAceptados == 0)
                throw new Error('Aún no agregas amigos');
            let amigos = {
                solicitud_enviada: amigosSolicitados,
                solicitud_recibida: amigosAceptados
            }            
            return amigos;            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}