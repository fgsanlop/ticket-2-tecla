let connectMultiparty = require('connect-multiparty');
let connectMultipartyMiddUsuarios = connectMultiparty({uploadDir: "./public/img/usuarios"});
let connectMultipartyMiddPublicaciones = connectMultiparty({uploadDir: "./public/img/publicaciones"});

module.exports = {
    connectMultipartyMiddPublicaciones,
    connectMultipartyMiddUsuarios,
}