const express = require('express');
const usuarioAmistadController = require('../controllers/usuario.amistad.controller');
const middJwt = require('../middlewares/midd.jwt');

const router = express.Router();

router.post('/solicitud/:idUsuarioReceptor', middJwt.checarToken, async (req, res) => {       
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        if(datos.id == req.params.idUsuarioReceptor)
            throw new Error('No puedes auto-enviarte una solicitud :/')
        let resultado = await usuarioAmistadController.solicitarAmistad(datos.id, req.params.idUsuarioReceptor);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/aceptar/:idUsuarioEmisor', middJwt.checarToken, async (req, res) => {       
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        if(datos.id == req.params.idUsuarioEmisor)
            throw new Error('No puedes auto-aceptar una solicitud :/')
        let resultado = await usuarioAmistadController.aceptarAmistad(req.params.idUsuarioEmisor, datos.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/solicitudes-enviadas', middJwt.checarToken, async (req, res) => {       
    const token = req.headers.authorization.split(' ')[1];  
    try {        
        const datos = await middJwt.decodificarToken(token);        
        let resultado = await usuarioAmistadController.listarSolicitudesEnviadas(datos.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/solicitudes-recibidas', middJwt.checarToken, async (req, res) => {       
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioAmistadController.listarSolicitudesRecibidas(datos.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/:id', async (req, res) => {       
    try {
        let resultado = await usuarioAmistadController.listarAmigos(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});



module.exports = router;