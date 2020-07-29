var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const multer = require('multer');

// database
require('./dbHelper/dbHelper');

//logs
const LOG = require('./modules/logger');

//rutas
const { mensajeRoute, slidersRouter, logsRouter } = require('./routes');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(mensajeRoute);
app.use(slidersRouter);
app.use(logsRouter);



app.use((err,req,res,next) => {
    LOG.info(JSON.stringify(err));
    res.status(400).send({
        "code": err.code,
        "data": err.data,
        "error": {
            "message": err.error.message,
            "name": err.error.name,
            "friendly": err.error._message
        }
    })
})


app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html' ))
})

module.exports = app;
