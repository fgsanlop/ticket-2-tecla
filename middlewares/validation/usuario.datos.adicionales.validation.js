const Joi = require('joi');

module.exports = {
    conocimientoExtra: Joi.object().keys({
        nombre: Joi.string().required().alphanum().max(40),
        descripcion: Joi.string().required().alphanum().max(300),           
    }),

    entornoProfesional: Joi.object().keys({
        puntuaciones: Joi.array().required().items(Joi.number().integer().min(0).max(5).required())
    }),   
    
    estudio: Joi.object().keys({
        tipo: Joi.string().valid('Certificación', 'Título', 'Curso').required(),
        titulo: Joi.string().required().alphanum().max(100),
        descripcion: Joi.string().required().alphanum().max(300),
        año: Joi.number().integer().min(1900).max(new Date().getFullYear())           
    }),

    feedback: Joi.object().keys({
        comentario: Joi.string().required().max(500),         
    }),

    idioma: Joi.object().keys({
        idioma: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(40),
        porcentaje: Joi.number().integer().required().min(1).max(100),           
    }),

}