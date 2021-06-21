const jwt = require('jsonwebtoken');
const UsarioModel = require('../models/usuario.model');

const generarToken = async (datos) => {
    try {
        return jwt.sign({datos}, process.env.SECRET_KEY);
    }catch (error){
        throw error
    }
}

const registrarUsuario = async (datos) => {
    const { nombre_usuario, pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github } = datos;
    let nuevoUsuario = new UsarioModel(nombre_usuario, pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github);    
    try {
        return await nuevoUsuario.registrarUsuario();
    } catch (error) {
        throw error;
    }    
}

const obtenerDatos = async (nombreUsuario) => {        
    try { 
        return await UsarioModel.obtenerDatos(nombreUsuario);
    } catch (error) {
        throw error;
    }    
}

const iniciarSesion = async (datos) => {
    const { nombre_usuario, pass } = datos;
    let loginUsuario = new UsarioModel(nombre_usuario, pass);
    let comprobarCredenciales = await loginUsuario.comprobarCredenciales(false);
    try {
        if(comprobarCredenciales !== false) 
            return await generarToken(comprobarCredenciales);        
        else 
            throw new Error('Credenciales incorrectas');        
    } catch (error) {
        throw error;
    }
}

const iniciarSesionTutor = async (datos) => {
    const { nombre_usuario, pass } = datos;
    let loginUsuario = new UsarioModel(nombre_usuario, pass);
    let comprobarCredenciales = await loginUsuario.comprobarCredenciales(true);
    try {
        if(comprobarCredenciales !== false) 
            return await generarToken(comprobarCredenciales);        
        else 
            throw new Error('Credenciales incorrectas');        
    } catch (error) {
        throw error;
    }
}

const modificarUsuario = async (id, datos) => {
    const { pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github, new_pass } = datos;  
    let modUsuario = new UsarioModel('', pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github);
    try {        
        return await modUsuario.modificarUsuario(id, new_pass);;
    } catch (error) {
        throw error;
    }
}

const eliminarUsuario = async (id, pass) => {  
    try {                
        let usuarioAEliminar = new UsarioModel('', pass);        
        return await usuarioAEliminar.eliminarUsuario(id);;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarToken,
    registrarUsuario,
    iniciarSesion,
    iniciarSesionTutor,
    modificarUsuario,
    eliminarUsuario,
    obtenerDatos
}