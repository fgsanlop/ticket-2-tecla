const Joi = require('joi');
const tutorValidations = require('./validation/tutor.validation');

const puntuar = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, tutorValidations.puntuar, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = { puntuar };
