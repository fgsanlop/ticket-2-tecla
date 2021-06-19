//Usuario
const Usuario = require('./usuarios/usuario');
const Amistad = require('./usuarios/amistad');
const UsuarioConocimiento = require('./usuarios/usuario.conocimiento');
const UsuarioConocimientoExtra = require('./usuarios/usuario.conocimiento.extra');
const UsuarioDesempeno = require('./usuarios/usuario.desempeno');
const UsuarioEntornoProfesional = require('./usuarios/usuario.entorno.profesional');
const UsuarioEstudio = require('./usuarios/usuario.estudio');
const UsuarioFeedback = require('./usuarios/usuario.feedback');
const UsuarioHabilidadBlanda = require('./usuarios/usuario.habilidad.blanda');
const UsuarioIdioma = require('./usuarios/usuario.idioma');
const UsuarioTecnologia = require('./usuarios/usuario.tecnologia');
//Tecla
const Conocimiento = require('./tecla/conocimiento');
const Desempeno = require('./tecla/desempeno');
const EntornoProfesional = require('./tecla/entorno.profesional');
const HabilidadBlanda = require('./tecla/habilidad.blanda');
const Tecnologia = require('./tecla/tecnologia');
//Publicaciones
const Publicacion = require('./publicaciones/publicacion');
const PublicacionComentario = require('./publicaciones/publicacion.comentario');
const Reaccion = require('./publicaciones/reaccion');
const PublicacionReaccion = require('./publicaciones/publicacion.reaccion');
//Chats
const Chat = require('./chats/chat');
const Mensaje = require('./chats/mensaje');

module.exports = sincronizarTablas = async () => {
    let opciones = {
        alter: true
    }
    // //Usuarios
    // await Usuario.sync(opciones);
    // await Amistad.sync(opciones);
    // await UsuarioConocimiento.sync(opciones);
    // await UsuarioConocimientoExtra.sync(opciones);
    // await UsuarioDesempeno.sync(opciones);
    // await UsuarioEntornoProfesional.sync(opciones);
    // await UsuarioEstudio.sync(opciones);
    // await UsuarioFeedback.sync(opciones);
    // await UsuarioHabilidadBlanda.sync(opciones);
    // await UsuarioIdioma.sync(opciones);
    // await UsuarioTecnologia.sync(opciones);
    // //Tecla
    // await Conocimiento.sync(opciones);
    // await Desempeno.sync(opciones);
    // await EntornoProfesional.sync(opciones);
    // await HabilidadBlanda.sync(opciones);
    // await Tecnologia.sync(opciones);
    // //Publicaciones
    // await Publicacion.sync(opciones);
    // await Reaccion.sync(opciones);
    // await PublicacionReaccion.sync(opciones);
    // await PublicacionComentario.sync(opciones);
    // //Chats
    // await Chat.sync(opciones);
    // await Mensaje.sync(opciones);
}