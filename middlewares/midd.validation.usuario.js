const Joi = require('joi')
const usuarioValidations = require('./validation/usuario.validation')

const login = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioValidations.login, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const registro = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioValidations.registro, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const actualizar = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioValidations.actualizar, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const eliminar = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, usuarioValidations.eliminar, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = { login, registro, actualizar, eliminar }