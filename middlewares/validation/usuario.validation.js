const Joi = require('joi');
const JoiDate = require('@hapi/joi-date');

module.exports = {
    login: Joi.object().keys({
        nombre_usuario: Joi.string().regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,20}[a-zA-Z0-9]$/).required().min(3).max(20),
        pass: Joi.string().required().max(20),
        recordar: Joi.boolean().required()
    }),

    registro: Joi.object().keys({
        nombre_usuario: Joi.string().regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,20}[a-zA-Z0-9]$/).required().min(3).max(20),
        pass: Joi.string().required().max(20),
        nombres: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(40),
        apellidos: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(40),
        pais: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(20),
        ciudad: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(30),
        fecha_nacimiento: Joi.extend(JoiDate).date().format('YYYY-MM-DD').required(),
        linkedin: Joi.string().regex(/^https?:\/\/((www|\w\w)\.)?linkedin.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/).required().max(200),        
        github: Joi.string().regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,20}[a-zA-Z0-9]$/).required().min(3).max(100),
    }),

    actualizar: Joi.object().keys({        
        nombre_usuario: Joi.string().regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,20}[a-zA-Z0-9]$/).required().min(3).max(20),
        pass: Joi.string().required().max(20),
        nombres: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(40),
        apellidos: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(40),
        pais: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(20),
        ciudad: Joi.string().regex(/^[a-zA-Z\u00C0-\u00FF]+$/).required().max(30),
        fecha_nacimiento: Joi.extend(JoiDate).date().format('YYYY-MM-DD').required(),
        linkedin: Joi.string().regex(/^https?:\/\/((www|\w\w)\.)?linkedin.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/).required().max(200),        
        github: Joi.string().regex(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,20}[a-zA-Z0-9]$/).required().min(3).max(100),   
        new_pass: Joi.string().required().max(20)
    }),

    eliminar: Joi.object().keys({        
        pass: Joi.string().required().max(20)          
    }),        
}