const express = require('express');
const usuarioConocimientoExtraController = require('../controllers/usuario.conocimiento.extra.controller');
const middJwt = require('../middlewares/midd.jwt');
const middValidUsuarioDatosAdicionales = require('../middlewares/midd.validation.usuario.datos.adicionales');

const router = express.Router();

router.post('/registro', middJwt.checarToken, middValidUsuarioDatosAdicionales.conocimientoExtra, async (req, res) => {
    const body = req.body;   
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token)
        let resultado = await usuarioConocimientoExtraController.registrarConocimientoExtra(datos.id, body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/actualizar/:idConocimientoExtra', middJwt.checarToken, middValidUsuarioDatosAdicionales.conocimientoExtra, async (req,res) => {    
    const body = req.body;
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioConocimientoExtraController.modificarConocimientoExtra(req.params.idConocimientoExtra, datos.id, body);
        res.status(200).json(resultado);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/eliminar/:idConocimientoExtra', middJwt.checarToken, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {        
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioConocimientoExtraController.eliminarConocimientoExtra(req.params.idConocimientoExtra, datos.id);        
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;