const { User } = require('../model');
const jwt = require('jsonwebtoken');
const parametros = require('../config/parametros')

module.exports.isAuthorized = (id) => {

    return new Promise(async (resolve, reject) => {
        let rta = {}
        const user = await User.findOne({ _id: id });
        if (user && user.habilitado) {
            return resolve(true);
        } else {
            let rta = {
                "code": -1,
                "text": "Acceso denegado",
            }
            return reject(rta);
        }
    });
}


module.exports.sendNewToken = (user) => {

    return new Promise(async (resolve, reject) => {
        if (!user._id) {
            let rta = {
                "code": -1,
                "text": "Acceso denegado",
            }
            return reject(rta); 
        }
        const payload = {
            usuario: {
                "_id": user._id,
                "email": user.email,
                "tipo": user.tipo
            }
        };
        const token = jwt.sign(payload, parametros.JWT.CLAVE, {
            expiresIn: 60 * 60
        });

        return resolve(token);
    });
}