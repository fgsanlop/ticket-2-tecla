const Joi = require('joi');

module.exports = {
    puntuar: Joi.object().keys({
        id_usuario: Joi.number().integer().required(),
        puntuaciones: Joi.array().required().items(Joi.number().integer().min(1).max(5).required())
    }),   
}