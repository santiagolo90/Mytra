var express = require('express');
var router = express.Router();
const parametros = require('../config/parametros')
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');

router.use((req, res, next) => {
    const token = req.headers['token'];
    if (token) {
        jwt.verify(token, parametros.JWT.CLAVE, (err, decoded) => {
            if (!err) {
                const decodeToken = decoded;
                req.token = decodeToken;
                next();
            } else {
                let rta = {
                    "code": -1,
                    "text": "Acceso denegado, error en token",
                    "error": err
                }
                if (req.file) {
                    fs.unlink(req.file.path);
                }
                res.status(400).send(rta);
            }
        });
    } else {
        if (req.file) {
            fs.unlink(req.file.path);
        }
        let rta = {
            "code": -1,
            "text": "Acceso denegado, falta token"
        }
        res.status(400).send(rta);
    }
});

module.exports = router;
