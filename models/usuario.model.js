const Usuario = require('../db/usuarios/usuario');

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
const UsuarioFeedback = require('../db/usuarios/usuario.feedback');

const Estudio = require('../db/usuarios/usuario.estudio');
const Idioma = require('../db/usuarios/usuario.idioma');

module.exports = class UsuarioModel {
    constructor(nombreUsuario, pass, nombres, apellidos, pais, ciudad, fechaNacimiento, linkedin, github) {        
        this.nombreUsuario = nombreUsuario;
        this.pass = pass;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.pais = pais;
        this.ciudad = ciudad;
        this.fechaNacimiento = fechaNacimiento;
        this.linkedin = linkedin;
        this.github = github;
    }
    //C
    registrarUsuario = async () => {
        let existeUsuario = await this.checarExistenciaNombreUsuario();
        if(existeUsuario)
            throw new Error('Usuario ya ha sido registrado');
        else {
            try {
                let nuevoUsuario = await Usuario.create({                      
                    nombre_usuario: this.nombreUsuario, 
                    pass: this.pass, 
                    nombres: this.nombres, 
                    apellidos: this.apellidos,
                    pais: this.pais,
                    ciudad: this.ciudad,
                    fecha_nacimiento: this.fechaNacimiento,
                    linkedin: this.linkedin,
                    github: this.github,
                    imagen_perfil: 'noImagen',
                    es_tutor: false
                });      
                
                let conocimientos = await Conocimiento.findAll({attributes: ['id']});
                conocimientos.forEach(async conocimiento => {
                    await UsuarioConocimiento.create({
                        puntuacion: 1,
                        id_usuario: nuevoUsuario.id,
                        id_conocimiento: conocimiento.id
                    })
                });

                let tecnologias = await Tecnologia.findAll({attributes: ['id']});
                tecnologias.forEach(async tecnologia => {
                    await UsuarioTecnologia.create({
                        puntuacion: 1,
                        id_usuario: nuevoUsuario.id,
                        id_tecnologia: tecnologia.id
                    })
                });
                
                let desempenos = await Desempeno.findAll({attributes: ['id']});
                desempenos.forEach(async desempeno => {
                    await UsuarioDesempeno.create({
                        puntuacion: 1,
                        id_usuario: nuevoUsuario.id,
                        id_desempeño: desempeno.id
                    })
                });

                let habilidadesBlandas = await HabilidadBlanda.findAll({attributes: ['id']});
                habilidadesBlandas.forEach(async habilidadBlanda => {
                    await UsuarioHabilidadBlanda.create({
                        puntuacion: 1,
                        id_usuario: nuevoUsuario.id,
                        id_habilidad_blanda: habilidadBlanda.id
                    })
                });

                let entornosProfesionales = await EntornoProfesional.findAll({attributes: ['id']});
                entornosProfesionales.forEach(async entornoProfesional => {
                    await UsuarioEntornoProfesional.create({
                        puntuacion: 0,
                        id_usuario: nuevoUsuario.id,
                        id_entorno_profesional: entornoProfesional.id
                    })
                });

                return nuevoUsuario.id;
            } catch (error){
                throw new Error('No se pudo registrar usuario')                
            }
        }
    }
    //R
    static obtenerDatos = async (nombreUsuario) => {
        try {
            let usuario = await Usuario.findOne({
                where: {
                    nombre_usuario: nombreUsuario
                },
                
                attributes: [
                    'id',
                    'nombre_usuario', 
                    'nombres', 
                    'apellidos', 
                    'pais',
                    'ciudad',
                    'fecha_nacimiento',
                    'linkedin',
                    'github',
                    'createdAt',
                    'updatedAt',
                    'imagen_perfil'
                ],
                include: [
                    { model: Estudio, attributes: ['id', 'tipo', 'titulo', 'descripcion', 'año'] },
                    { model: Idioma, attributes: ['id', 'idioma', 'porcentaje'] },
                    { 
                        model: UsuarioConocimiento, 
                        attributes: ['id', 'puntuacion', 'updatedAt'],
                        include: { model: Conocimiento, attributes: ['nombre'] } 
                    },
                    { 
                        model: UsuarioTecnologia, 
                        attributes: ['id', 'puntuacion', 'updatedAt'], 
                        include: { model: Tecnologia, attributes: ['nombre'] } 
                    },
                    { 
                        model: UsuarioDesempeno, 
                        attributes: ['id', 'puntuacion', 'updatedAt'],
                        include: { model: Desempeno, attributes: ['nombre'] } 
                    },
                    { 
                        model: UsuarioHabilidadBlanda, 
                        attributes: ['id', 'puntuacion', 'updatedAt'],
                        include: { model: HabilidadBlanda, attributes: ['nombre'] } 
                    },
                    {
                        model: UsuarioEntornoProfesional,                         
                        attributes: ['id', 'puntuacion', 'updatedAt'],
                        include: { model: EntornoProfesional, attributes: ['nombre'] } 
                    },
                    {
                        model: UsuarioFeedback,
                        foreignKey: 'id_usuario_receptor',
                        attributes: ['id_usuario_emisor', 'comentario', 'createdAt', 'updatedAt'],  
                        include: { model: Usuario, as:'emisor_feedback', attributes: ['id', 'nombre_usuario', 'nombres', 'apellidos'] }                                          
                    }
                ]
            });
            if(usuario == null)
                throw new Error('No existe usuario');

            return usuario;
        } catch (error) {
            throw error;
        }
    } 
    checarExistenciaNombreUsuario = async () => {
        let existeUsuario = await Usuario.findOne({
            where: {nombre_usuario: this.nombreUsuario} 
        });
        if (existeUsuario === null)
            return false
        else 
            return true        
    }
    comprobarCredenciales = async (esTutor) => {
        let usuario = await Usuario.findOne({
            where: {
                nombre_usuario: this.nombreUsuario, 
                pass: this.pass,
                es_tutor: esTutor        
            },
            attributes: ['id', 'nombre_usuario', 'es_tutor', 'createdAt', 'updatedAt']
        });
        if (usuario === null)
            return false
        else 
            return usuario
    }
    //U
    modificarUsuario = async (id, newPass) => {        
        try {
            let usuarioAModificar = await Usuario.findOne({
                where: {
                    id: id,
                    pass: this.pass
                }
            });
            if(usuarioAModificar !== null){
                usuarioAModificar.pass = newPass;
                usuarioAModificar.nombres = this.nombres;
                usuarioAModificar.apellidos = this.apellidos;
                usuarioAModificar.pais = this.pais;
                usuarioAModificar.ciudad = this.ciudad;
                usuarioAModificar.fecha_nacimiento = this.fechaNacimiento;
                usuarioAModificar.linkedin = this.linkedin;
                usuarioAModificar.github = this.github;
                await usuarioAModificar.save();
                return 'Usuario modificado';
            }
            else
                throw new Error('Contraseña actual incorrecta');
        } catch (error) {
            throw error
        }        
    }
    //D
    eliminarUsuario = async (id) => {
        let usuarioAEliminar = await Usuario.findOne({
            where: {
                id: id,
                pass: this.pass
            }
        });
        try {
            if(usuarioAEliminar === null)
                throw new Error('Contraseña incorrecta')
            else {
                await usuarioAEliminar.destroy();
                return 'Usuario eliminado'
            }                
        } catch (error) {
            throw error
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    
    static actualizarImagen = async (id, imagen) => {
        try {
            let usuario = await Usuario.findOne({where: { id: id }});
            if(usuario == null)
                throw new Error();
            usuario.imagen_perfil = imagen;
            await usuario.save();
            return 'Imagen actualizada';
        } catch (error) {
            throw new Error('Error al actualizar imagen');
        }
    }

    static obtenerNombreImagen = async (id) => {
        try {
            let usuario = await Usuario.findOne(
                {
                    where: { id: id },
                    attributes: ['imagen_perfil']
                }
            );
            if(usuario == null)
                throw new Error();
            return usuario.imagen_perfil;
        } catch (error) {
            throw new Error('Error al obtener nombre de imagen');
        }
    }

}