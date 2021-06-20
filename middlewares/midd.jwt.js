const jwt = require('jsonwebtoken');
const Usuario = require('../db/usuarios/usuario');
//Token en header Auth antes de entrar a un ejs
const headerViewUsuario = (req, res, next) => {
    let token = req.cookies.token;
    req.headers.authorization = `Bearer ${token}`
    next();
}

const headerViewTutor = (req, res, next) => {
    let token = req.cookies.tokenTutor;
    req.headers.authorization = `Bearer ${token}`
    next();
}

const loggeado = (req, res, next) => {
    if(req.cookies.token != undefined)
        res.redirect('/')  
    else       
        next();
}

const loggeadoTutor = (req, res, next) => {
    if(req.cookies.tokenTutor != undefined)
        res.redirect('/admin/index')   
    else     
        next();
}

const checarToken = async (req, res, next) => {    
    if (req.headers.authorization != undefined) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            await decodificarToken(token);
            next();
        } catch (error) {
            res.status(400).json({error: error.message})
        }              
    }
    else
        res.status(400).json({error:'No tienes autorización para ver esto :/'});    
}

const checarTokenTutor = async (req, res, next) => {    
    if (req.headers.authorization != undefined) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let datos = await decodificarToken(token);
            if(datos.es_tutor)
                next();
            else
                throw new Error('No tienes autorización para ver esto :/');
        } catch (error) {
            res.status(400).json({error: error.message})
        }              
    }
    else
        res.status(400).json({error:'No tienes autorización para ver esto :/'});  
}

const decodificarToken = async (token) => {
    const decodificado = jwt.verify(token, process.env.SECRET_KEY);    
    if(decodificado) {
        let comprobarUsuario = Usuario.findOne({ where: {
            id: decodificado.datos.id,
            nombre_usuario: decodificado.datos.nombre_usuario
        }});
        if(comprobarUsuario == null)
            throw new Error('Token no valido');
        else
            return decodificado.datos
    }        
    else
        throw new Error('Token no valido') 
} 

module.exports = {
    headerViewUsuario,
    headerViewTutor,
    checarToken,
    loggeado,
    loggeadoTutor,
    decodificarToken,
    checarTokenTutor
}