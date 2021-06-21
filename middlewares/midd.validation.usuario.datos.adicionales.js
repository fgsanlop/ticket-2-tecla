const Joi = require('joi');
const usuarioDatosAdicionalesValidations = require('./validation/usuario.datos.adicionales.validation');

const conocimientoExtra = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioDatosAdicionalesValidations.conocimientoExtra, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const entornoProfesional = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioDatosAdicionalesValidations.entornoProfesional, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const estudio = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioDatosAdicionalesValidations.estudio, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const feedback = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioDatosAdicionalesValidations.feedback, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const idioma = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioDatosAdicionalesValidations.idioma, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = { conocimientoExtra, entornoProfesional, estudio, feedback, idioma };
