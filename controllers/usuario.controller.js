const jwt = require('jsonwebtoken');
const UsarioModel = require('../models/usuario.model');

const generarToken = async (datos) => {
    try {
        let tokenSign = jwt.sign({datos}, process.env.SECRET_KEY)
        return tokenSign
    }catch (error){
        throw error
    }
}

const registrarUsuario = async (datos) => {
    const { nombre_usuario, pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github } = datos;
    let nuevoUsuario = new UsarioModel(nombre_usuario, pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github);    
    try {
        let resultado = await nuevoUsuario.registrarUsuario();
        return resultado;
    } catch (error) {
        throw error;
    }    
}

const obtenerDatos = async (nombreUsuario) => {        
    try {
        let usuario = UsarioModel.obtenerDatos(nombreUsuario);
        return usuario;
    } catch (error) {
        throw error;
    }    
}

const iniciarSesion = async (datos) => {
    const { nombre_usuario, pass } = datos;
    let loginUsuario = new UsarioModel(nombre_usuario, pass);
    let comprobarCredenciales = await loginUsuario.comprobarCredenciales(false);
    try {
        if(comprobarCredenciales !== false) {
            console.log(comprobarCredenciales);
            let token = await generarToken(comprobarCredenciales);            
            return token;
        }
        else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw error;
    }
}

const iniciarSesionTutor = async (datos) => {
    const { nombre_usuario, pass } = datos;
    let loginUsuario = new UsarioModel(nombre_usuario, pass);
    let comprobarCredenciales = await loginUsuario.comprobarCredenciales(true);
    try {
        if(comprobarCredenciales !== false) {
            console.log(comprobarCredenciales);
            let token = await generarToken(comprobarCredenciales);            
            return token;
        }
        else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw error;
    }
}

const modificarUsuario = async (id, datos) => {
    const { pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github, new_pass } = datos;  
    let modUsuario = new UsarioModel('', pass, nombres, apellidos, pais, ciudad, fecha_nacimiento, linkedin, github);
    try {        
        let resultado = await modUsuario.modificarUsuario(id, new_pass);
        return resultado;
    } catch (error) {
        throw error;
    }
}

const eliminarUsuario = async (id, pass) => {  
    try {                
        let usuarioAEliminar = new UsarioModel('', pass);
        let resultado = await usuarioAEliminar.eliminarUsuario(id);
        return resultado;
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