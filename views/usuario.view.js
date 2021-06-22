const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const usuarioImgController = require('../controllers/usuario.img.controller');
const connectMultipartyMidd = require('../middlewares/midd.connect.multiparty');
const middJwt = require('../middlewares/midd.jwt');
const middValidUsuario = require('../middlewares/midd.validation.usuario');

const router = express.Router();

router.post('/registro', middValidUsuario.registro, async (req, res) => {
    let body = req.body;   
    try {
        let resultado = await usuarioController.registrarUsuario(body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/login', middValidUsuario.login, async (req, res) => {
    let body = req.body;    
    let recordar = req.body.recordar;
    try {
        let resultado = await usuarioController.iniciarSesion(body); 
        if (recordar)    
            res.status(200).cookie('token', resultado, {maxAge: 31536000000}).json(resultado);  //Cookie expira en un año                              
        else
            res.status(200).cookie('token', resultado).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});    
    }
});

router.post('/tutor/login', middValidUsuario.login, async (req, res) => {
    let body = req.body;    
    let recordar = req.body.recordar;
    try {
        let resultado = await usuarioController.iniciarSesionTutor(body); 
        if (recordar)    
            res.status(200).cookie('tokenTutor', resultado, {maxAge: 31536000000}).json(resultado);  //Cookie expira en un año                              
        else
            res.status(200).cookie('tokenTutor', resultado).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});    
    }
});

router.get('/:nombreUsuario', async (req, res) => {                     
    try {
        let resultado = await usuarioController.obtenerDatos(req.params.nombreUsuario);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }    
});

router.put('/actualizar', middJwt.checarToken, middValidUsuario.actualizar, async (req,res) => {    
    let body = req.body;
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioController.modificarUsuario(datos.id, body);
        res.status(200).json(resultado);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/eliminar', middJwt.checarToken, middValidUsuario.eliminar, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {        
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioController.eliminarUsuario(datos.id, req.body.pass);
        res.clearCookie('token');
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/logout', middJwt.headerViewUsuario, middJwt.checarToken, async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');  
});

router.get('/tutor/logout', middJwt.headerViewTutor, middJwt.checarTokenTutor, async (req, res) => {
    res.clearCookie('tokenTutor');    
    res.redirect('/tutor/login');
});

//IMAGENES
router.post('/imagen', middJwt.checarToken, 
connectMultipartyMidd.connectMultipartyMiddUsuarios, 
usuarioImgController.subirImagenUsuario);
router.get('/imagen/:imagen', usuarioImgController.verImagen);



module.exports = router;