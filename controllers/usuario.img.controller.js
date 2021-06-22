let fs = require('fs');
let path = require('path');
let middJwt = require('../middlewares/midd.jwt');
let UsuarioModel = require('../models/usuario.model');

const subirImagenUsuario = async (req, res) => {        
    try {
        if(req.files){
            const token = req.headers.authorization.split(' ')[1];
            const datos = await middJwt.decodificarToken(token);
            let idUsuario = datos.id;        
            let imagenUsuario = await UsuarioModel.obtenerNombreImagen(idUsuario);                              
            let rutaArchivo = req.files.imagen.path;
            
            let separacion = rutaArchivo.split('\\');        
            let nombreArchivo = separacion[separacion.length - 1];          
            let extension = nombreArchivo.split('.')[1];   
    
            if(extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif'){
                if(imagenUsuario != 'noImagen') {
                    let rutaDeCarga = "./public/img/usuarios/";
                    let checarImagen = rutaDeCarga + imagenUsuario;
                    console.log(checarImagen);
                    fs.exists(checarImagen, (existe) => {
                        if(existe)
                            fs.unlink(checarImagen, (err) => {
                                console.log(err); 
                            });                
                    });
                } 
                await UsuarioModel.actualizarImagen(idUsuario, nombreArchivo);
                res.status(200).json('Imagen actualizada')
            }                               
            else{
                fs.unlink(rutaArchivo, (err) => {
                    return res.status(500).json({error: 'Extension invalida'});
                })
            }
        }
        else{
            return res.status(500).send({
                error: 'Imagen no subida'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};

const verImagen = (req, res) => {
    let img = req.params.imagen;
    let ruta = `./public/img/usuarios/${img}`;

    fs.exists(ruta, (existe) => {
        if(existe)
            return res.sendFile(path.resolve(ruta));
        else
            return res.status(404).send({error: 'Imagen no encontrada'});
    });
}

module.exports = {
    subirImagenUsuario,
    verImagen
}

