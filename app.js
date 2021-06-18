const express = require('express');
const app = express();
const middGeneral = require('./middlewares/midd.general');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db/conn');
const sincronizarTablas = require('./db/sync');

//Middlewares
app.use(express.json());
app.use(cors(middGeneral.corsOptions));
app.use(middGeneral.limiter);
app.use(cookieParser());
app.use((err, req, res, next) => { //Errores generales
    if (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
});
//EJS
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');



const iniciarServidor = async () => {
    try {
        await sequelize.authenticate();
        await sincronizarTablas();
        app.listen(process.env.PORT, () => {
            console.log(`*** Servidor en http://${process.env.HOST}:${process.env.PORT} ***`)
        })
    } catch (error) {
        console.log(`Error de conexión: ${error.message}`);
    }
}

iniciarServidor();