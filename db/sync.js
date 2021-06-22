//Usuario
const sequelize = require('./conn');
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
    await sequelize.authenticate();
    let opciones = {
        alter: true
    }
    //Usuarios
    await Usuario.sync(opciones);    
    await Amistad.sync(opciones);
    await UsuarioConocimiento.sync(opciones);
    await UsuarioConocimientoExtra.sync(opciones);
    await UsuarioDesempeno.sync(opciones);
    await UsuarioEntornoProfesional.sync(opciones);
    await UsuarioEstudio.sync(opciones);
    await UsuarioFeedback.sync(opciones);
    await UsuarioHabilidadBlanda.sync(opciones);
    await UsuarioIdioma.sync(opciones);
    await UsuarioTecnologia.sync(opciones);
    //Tecla
    await Conocimiento.sync(opciones);
    await Desempeno.sync(opciones);
    await EntornoProfesional.sync(opciones);
    await HabilidadBlanda.sync(opciones);
    await Tecnologia.sync(opciones);
    //Publicaciones
    await Publicacion.sync(opciones);
    await Reaccion.sync(opciones);
    await PublicacionReaccion.sync(opciones);
    await PublicacionComentario.sync(opciones);
    //Chats
    await Chat.sync(opciones);
    await Mensaje.sync(opciones);

    await Conocimiento.findOrCreate({ where: { nombre: 'Base de datos' } });
    await Conocimiento.findOrCreate({ where: { nombre: 'APIS' } });
    await Conocimiento.findOrCreate({ where: { nombre: 'Testing' } });
    await Conocimiento.findOrCreate({ where: { nombre: 'Seguridad' } });
    await Conocimiento.findOrCreate({ where: { nombre: 'Teoría de objetos' } });

    await Desempeno.findOrCreate({ where: { nombre: 'Calidad del código' } });
    await Desempeno.findOrCreate({ where: { nombre: 'Velocidad de entrega' } });
    await Desempeno.findOrCreate({ where: { nombre: 'Performance del código' } });

    await EntornoProfesional.findOrCreate({ where: { nombre: 'Versionado - Git/GitHub' } });
    await EntornoProfesional.findOrCreate({ where: { nombre: 'Trello - Jira' } });
    await EntornoProfesional.findOrCreate({ where: { nombre: 'Slack' } });
    await EntornoProfesional.findOrCreate({ where: { nombre: 'Metodologías Ágiles' } });

    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Enfocado' } });
    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Trabajo en equipo' } });
    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Comprometido' } });
    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Comunicación' } });
    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Capacidad de aprendizaje' } });
    await HabilidadBlanda.findOrCreate({ where: { nombre: 'Resolución de problemas' } });

    await Tecnologia.findOrCreate({ where: { nombre: 'Node.js' } });
    await Tecnologia.findOrCreate({ where: { nombre: 'Frontend' } });
    await Tecnologia.findOrCreate({ where: { nombre: 'Swagger' } });
    await Tecnologia.findOrCreate({ where: { nombre: 'Javascript' } });

    await Usuario.findOrCreate({
        where: {
            nombre_usuario: 'aeolguin',
            pass: 'pirulo',
            imagen_perfil: 'aeolguin.png',
            nombres: 'Ariel',
            apellidos: 'Olguin',
            pais: 'Argentina',
            ciudad: 'Buenos Aires',
            fecha_nacimiento: '1980-01-01',
            linkedin: 'https://www.linkedin.com/in/ariel-olguin-83093316/',
            github: 'https://github.com/aeolguin',
            es_tutor: true   
        }
    });

    await Usuario.findOrCreate({
        where: {
            nombre_usuario: 'chrossi',
            pass: 'holis',
            imagen_perfil: 'chiross.png',
            nombres: 'Chiara',
            apellidos: 'Rossi',
            pais: 'Argentina',
            ciudad: 'Ciudad en Argentina',
            fecha_nacimiento: '1991-01-01',
            linkedin: 'https://www.linkedin.com/',
            github: 'https://github.com/',
            es_tutor: true   
        }
    });

    console.log('***Base de datos lista***');

}

try {
    sincronizarTablas();
} catch (error) {
    console.log(error);   
}