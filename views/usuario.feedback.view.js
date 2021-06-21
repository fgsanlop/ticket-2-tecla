const express = require('express');
const usuarioFeedbackController = require('../controllers/usuario.feedback.controller');
const middJwt = require('../middlewares/midd.jwt');

const router = express.Router();

router.post('/registro/:idUsuarioReceptor', middJwt.checarToken, async (req, res) => {
    const comentario = req.body.comentario;   
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioFeedbackController.registrarFeedback(datos.id, req.params.idUsuarioReceptor, comentario);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/actualizar/:idUsuarioReceptor', middJwt.checarToken, async (req, res) => {
    const comentario = req.body.comentario;   
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioFeedbackController.modificarFeedback(datos.id, req.params.idUsuarioReceptor, comentario);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/eliminar/:idUsuarioReceptor', middJwt.checarToken, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];  
    try {
        const datos = await middJwt.decodificarToken(token);
        let resultado = await usuarioFeedbackController.eliminarFeedback(datos.id, req.params.idUsuarioReceptor);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});


module.exports = router;