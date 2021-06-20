let fs = require('fs');
let path = require('path');

const subirImagenUsuario = (req, res) => {        
    try {
        if(req.files){
            // fs.exists(checkFile, (exists) => {
            //     if(exists)
            //         fs.unlink(checkFile, (err)=>console.log(err));                
            // });          
            let rutaArchivo = req.files.imagen.path;
            let separacion = rutaArchivo.split('\\');        
            let nombreArchivo = separacion[separacion.length - 1];          
            let extension = nombreArchivo.split('.')[1];   
    
            if(extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif')        
                res.status(200).json({ruta: rutaArchivo, imagen: nombreArchivo, extension: extension})        
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

