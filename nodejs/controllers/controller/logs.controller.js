const fs_extra = require('fs-extra');
const fs = require('fs')
const path = require('path');


const parametros = require('../../config/parametros');
// import fs from 'fs';


const ctrlLogs = {};

ctrlLogs.getAll = (req, res, next) => {


    try {
        const directoryPath = path.join(__dirname, '../../logs');
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                let rta = {
                    "code": -1,
                    "data": "Unable to scan directory",
                    "error": err
                }
                next(rta);
            }
            if (files && files.length > 0) {
                let rta = {
                    "code": 1,
                    "data": files,
                }
                res.status(200).send(rta);
            }
        });

    } catch (err) {

        let rta = {
            "code": -1,
            "data": "No se encontraron logs",
            "error": err
        }
        next(rta);
    }




};


ctrlLogs.getOne = (req, res, next) => {

    const { logFile } = req.body;
    const file = parametros.LOGS_PATH + logFile
    
    const fileName = path.basename(file);
    const ext = path.extname(file).toLowerCase();
  
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-type', ext);
    const fileStream = fs.createReadStream(file);
    
    fileStream.on('error', function(err) {
        let rta = {
            "code": -1,
            "data": "No se encontraron logs",
            "error": err
        }
        next(rta);
    });

    fileStream.on('open', function () {
        fileStream.pipe(res)
    }); 
};






module.exports = ctrlLogs;
