const express = require('express');
const usuarioEstudioController = require('../controllers/usuario.estudio.controller');
const middJwt = require('../middlewares/midd.jwt');
const middValidUsuarioDatosAdicionales = require('../middlewares/midd.validation.usuario.datos.adicionales');

const router = express.Router();

router.post('/registro', middJwt.checarToken, middValidUsuarioDatosAdicionales.estudio, async (req, res) => {
    const body = req.body;   
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token)
        let resultado = await usuarioEstudioController.registrarEstudio(datos.id, body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/actualizar/:idEstudio', middJwt.checarToken, middValidUsuarioDatosAdicionales.estudio, async (req,res) => {    
    const body = req.body;
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioEstudioController.modificarEstudio(req.params.idEstudio, datos.id, body);
        res.status(200).json(resultado);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/eliminar/:idEstudio', middJwt.checarToken, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {        
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioEstudioController.eliminarEstudio(req.params.idEstudio, datos.id);        
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;