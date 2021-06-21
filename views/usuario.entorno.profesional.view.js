const express = require('express');
const usuarioEntornoProfesionalController = require('../controllers/usuario.entorno.profesional.controller');
const middJwt = require('../middlewares/midd.jwt');

const router = express.Router();

router.post('/calificar', middJwt.checarToken, async (req, res) => {
    /*{puntuaciones: []}*/
    let body = req.body;
    const token = req.headers.authorization.split(' ')[1]; 
    try {
        let datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioEntornoProfesionalController.calificarEntornosProfesionales(datos.id, body.puntuaciones);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;