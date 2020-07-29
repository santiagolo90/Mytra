const fs = require('fs-extra');
const path = require('path');
const parametros = require('../../config/parametros')
const { Mensaje } = require('../../model');

let autorizado = require('../../helper/user.helper').isAuthorized;
let nuevoToken = require('../../helper/user.helper').sendNewToken
const sendMail = require('../../modules/email.module').sendMail;

const ctrlMensajes = {};


ctrlMensajes.create = async (req, res, next) => {
    try {
        const { nombre, apellido, email, telefono, mensaje } = req.body;
        const errors = [];
        if (!nombre || !apellido || !email || !telefono || !mensaje) {
            errors.push({ message: "faltan datos requeridos en el email." });
        }
        if (errors.length > 0) {
            throw errors[errors.length - 1];
        } else {
            const subject = email;
            const message = crearCuerpo(nombre, apellido, email, telefono, mensaje);
            if (subject && message) {
                const newMessage = new Mensaje({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    telefono: req.body.telefono,
                    mensaje: req.body.mensaje
                });
                // await newMessage.save();
                try {
                   const rta = await sendMail(subject, message);
                   await newMessage.save();
                   res.status(200).send(rta);
                } catch (err) {
                    let rta = {
                        "code": -1,
                        "data": "El mensaje no pudo ser enviado",
                        "error": err
                    }
                    next(rta);
                }
            } else {
                let rta = {
                    "code": -1,
                    "data": "Error al enviar mensaje",
                    "error": {
                        "message": "subject or message is empty"
                    }
                }
                next(rta);
            }
        }

    } catch (err) {
        let rta = {
            "code": -1,
            "data": "Error generico: no hay correo",
            "error": err
        }
        next(rta)
    }
};

ctrlMensajes.getAll = async (req, res,next) => {
    try {

        /**
         * Solo se ejecuta si envió la paginación
         * 
         */
        if (req.query.pagination && req.query.page) {
            const pagination = req.query.pagination ? parseInt(req.query.pagination) : 3;
            const page = req.query.page ? parseInt(req.query.page) : 1;
            
            const options = {
                page: page,
                limit: pagination,
                sort: { createdAt: -1 }
            };

            const mensajes = await Mensaje.paginate({}, options);
            res.status(200).send(mensajes);
        }else{
            /**
            * si no envió la paginación muestro todos los documentos
            * 
            */
            const mensajes = await Mensaje.find({}).sort({ createdAt: -1 }).exec();
            if (!mensajes || mensajes.length < 1){
                let rta = {
                    "code": 1,
                    "data": "No se encontraron sliders",
                    "error": "No se encontraron sliders"
                }
                res.status(200).send(rta);
            } 
    

            let rta = {
                "code": 1,
                "docs":mensajes
            }
            res.status(200).send(rta)
        };

    } catch (err) {

        let rta = {
            "code": -1,
            "data": "No se encuentró ningún mensaje",
            "error": err
        }
        next(rta);
    }
};

ctrlMensajes.getByName = async (req, res, next) => {
    try {

        const pagination = req.body.pagination ? parseInt(req.body.pagination) : 5;
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const nombre =  req.body.nombre ? req.body.nombre : "";

        const query   = {
            nombre: {
                $regex: nombre, $options: "i"
            },
        };

        const options = {
            page: page,
            limit: pagination,
            sort: { createdAt: -1 },

        };
        

        const mensajes = await Mensaje.paginate(query, options);
        res.status(200).send(mensajes);

    } catch (err) {

        let rta = {
            "code": -1,
            "data": "No se encuentró ningún mensaje",
            "error": err
        }
        next(rta);
    }
};

ctrlMensajes.getByGlobalText = async (req, res, next) => {
    try {

        const pagination = req.body.pagination ? parseInt(req.body.pagination) : 5;
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const currentText =  req.body.text ? req.body.text : "";

        const query   = {

            $text : { $search : currentText },
        };

        const options = {
            page: page,
            limit: pagination,
            sort: { createdAt: -1 },

        };
        

        const mensajes = await Mensaje.paginate(query, options);
        res.status(200).send(mensajes);

    } catch (err) {

        let rta = {
            "code": -1,
            "data": "No se encuentró ningún mensaje",
            "error": err
        }
        next(rta);
    }
};


ctrlMensajes.getAllWithFilters = async (req, res, next) => {

    try {
        const pagination = req.body.pagination ? parseInt(req.body.pagination) : 5;
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const nombre =  req.body.nombre ? req.body.nombre : "";
        const apellido =  req.body.apellido ? req.body.apellido : "";
        const email =  req.body.email ? req.body.email : "";
        const telefono =  req.body.telefono ? req.body.telefono : "";
        const mensaje =  req.body.mensaje ? req.body.mensaje : "";
        const currentText =  req.body.text ? req.body.text : "";

        let query = null;
        if (nombre) {
            query = { nombre: { $regex: nombre, $options: "i"}};
        }else if(apellido){
            query = { apellido: { $regex: apellido, $options: "i"}};
        }else if(email){
            query = { email: { $regex: email, $options: "i"}};
        }else if(telefono){
            query = { telefono: { $regex: telefono, $options: "i"}};
        }else if(mensaje){
            query = { mensaje: { $regex: mensaje, $options: "i"}};
        }else if(currentText){
            query   = { $text : { $search : currentText }};
        }

        const options = {
            page: page,
            limit: pagination,
            sort: { createdAt: -1 },

        };

        const mensajes = await Mensaje.paginate(query, options);
        res.status(200).send(mensajes);

    } catch (err) {
        let rta = {
            "code": -1,
            "data": "No se encuentró ningún mensaje",
            "error": err
        }
        next(rta);
    }
};


module.exports = ctrlMensajes;

function crearCuerpo(nombre, apellido, email, telefono, mensaje) {
    return cuerpoCorreo = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    </head>
    <body>
        <div class="">
                <div class="">
                        <div class="" style="text-align: center;">
                          <h1 class="" style="color:#026b2c">Tienes un nuevo mensaje.</h1>
                          <p class="">
                          <strong>Nombre: </strong> ${nombre}
                          <br>
                          <strong>Apellido: </strong> ${apellido}
                          <br>
                          <strong>Email: </strong> ${email}
                          <br>
                          <strong>Telefono: </strong>${telefono}
                          <br>
                          <strong>Mensaje: </strong>${mensaje}
                          <br>
                          </p>
                        </div>
                </div>
        </div>
    </body>
    </html>`;

}