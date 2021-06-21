const express = require('express');
const usuarioIdiomaController = require('../controllers/usuario.idioma.controller');
const middJwt = require('../middlewares/midd.jwt');
const middValidUsuarioDatosAdicionales = require('../middlewares/midd.validation.usuario.datos.adicionales');

const router = express.Router();

router.post('/registro', middJwt.checarToken, middValidUsuarioDatosAdicionales.idioma, async (req, res) => {
    const body = req.body;   
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token)
        let resultado = await usuarioIdiomaController.registrarIdioma(datos.id, body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/actualizar/:idIdioma', middJwt.checarToken, middValidUsuarioDatosAdicionales.idioma, async (req,res) => {    
    const body = req.body;
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioIdiomaController.modificarIdioma(req.params.idIdioma, datos.id, body);
        res.status(200).json(resultado);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/eliminar/:idIdioma', middJwt.checarToken, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {        
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioIdiomaController.eliminarIdioma(req.params.idIdioma, datos.id);        
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;