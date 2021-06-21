const express = require('express');
const tutorController = require('../controllers/tutor.controller');
const middJwt = require('../middlewares/midd.jwt');
const middValidTutor = require('../middlewares/midd.validation.tutor');

const router = express.Router();

router.post('/calificar/conocimientos', middJwt.checarTokenTutor, middValidTutor.puntuar, async (req, res) => {
    /*{idUsuario:0, puntuaciones: []}*/
    let body = req.body;
    try {
        let resultado = await tutorController.calificarConocimientos(body.id_usuario, body.puntuaciones);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/calificar/tecnologias', middJwt.checarTokenTutor, middValidTutor.puntuar, async (req, res) => {    
    let body = req.body;
    try {
        let resultado = await tutorController.calificarTecnologias(body.id_usuario, body.puntuaciones);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/calificar/desempenos', middJwt.checarTokenTutor, middValidTutor.puntuar, async (req, res) => {    
    let body = req.body;
    try {
        let resultado = await tutorController.calificarDesempeños(body.id_usuario, body.puntuaciones);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/calificar/habilidades-blandas', middJwt.checarTokenTutor, middValidTutor.puntuar, async (req, res) => {    
    let body = req.body;
    try {
        let resultado = await tutorController.calificarHabilidadesBlandas(body.id_usuario, body.puntuaciones);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});


module.exports = router;