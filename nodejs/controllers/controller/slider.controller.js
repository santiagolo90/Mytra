const fs = require('fs-extra');
const path = require('path');
const parametros = require('../../config/parametros')
const { Slider } = require('../../model');

let autorizado = require('../../helper/user.helper').isAuthorized;
let nuevoToken = require('../../helper/user.helper').sendNewToken


const ctrlSlider = {};

ctrlSlider.getAll = async (req, res, next) => {

    try {


        /**
         * Solo se ejecuta si envió la paginación
         * 
         */
        if (req.query.pagination && pareq.query.pagege) {

            const pagination = req.query.pagination ? parseInt(req.query.pagination) : 3;
            const page = req.query.page ? parseInt(req.query.page) : 1;

            const options = {
                page: page,
                limit: pagination,
                sort: { orden: 1 }
            };

            const sliders = await Slider.paginate({}, options);
            res.status(200).send(sliders);
        } else {
            /**
            * si no envió la paginación muestro todos los documentos
            * 
            */
            const sliders = await Slider.find({}).sort('orden').exec();
            if (!sliders || sliders.length < 1) {
                let rta = {
                    "code": 1,
                    "data": "No se encontraron sliders",
                    "error": "No se encontraron sliders",
                }
                res.status(200).send(rta);
            }


            let rta = {
                "code": 1,
                "docs": sliders
            }
            res.status(200).send(rta)
        }




    } catch (err) {

        let rta = {
            "code": -1,
            "data": "No se encontraron sliders",
            "error": err
        }
        next(rta);
    }

};

ctrlSlider.getAllWithFilters = async (req, res, next) => {

    try {
        const pagination = req.body.pagination ? parseInt(req.body.pagination) : 5;
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const titulo = req.body.titulo ? req.body.titulo : "";
        const detalle = req.body.detalle ? req.body.detalle : "";
        const extension = req.body.extension ? req.body.extension : "";
        const server = req.body.server ? req.body.server : "";
        const currentText = req.body.text ? req.body.text : "";

        let query = null;
        if (titulo) {
            query = { titulo: { $regex: titulo, $options: "i" } };
        } else if (detalle) {
            query = { detalle: { $regex: detalle, $options: "i" } };
        } else if (extension) {
            query = { extension: { $regex: extension, $options: "i" } };
        } else if (server) {
            query = { server: { $regex: server, $options: "i" } };
        } else if (currentText) {
            query = { $text: { $search: currentText } };
        }

        const options = {
            page: page,
            limit: pagination,
            sort: { orden: 1 },

        };

        const sliders = await Slider.paginate(query, options);
        res.status(200).send(sliders);

    } catch (err) {
        let rta = {
            "code": -1,
            "data": "No se encontraron sliders",
            "error": err
        }
        next(rta);
    }
};


ctrlSlider.create = (req, res) => {

    autorizado(req.token.usuario._id).then(async () => {
        const saveSlider = async () => {

            const { titulo, detalle, orden } = req.body;

            const errors = [];
            if (!req.file) {
                errors.push({ text: "Ingrese una imagen." });
            }

            if (!titulo || !detalle || !orden) {
                errors.push({ text: "Ingrese orden de la imagen." });
            }

            if (errors.length > 0) {
                res.status(404).send(errors);
            } else {
                const slider = await Slider.find({ orden: orden });
                if (slider.length > 0) {
                    req.body.orden = Number(req.body.orden) + 1;
                    saveSlider()
                } else {
                    //NOMBRE ORIGINAL DEL ARCHIVO
                    const imageTempPath = req.file.path;
                    // EXTENSION DEL ARCHIVO
                    const ext = path.extname(req.file.originalname).toLowerCase();

                    // Validate Extension
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {

                        //CREO EL OBJETO ANTES DE GUARDARLO EN MONGO
                        const newSlider = new Slider({
                            titulo: req.body.titulo,
                            detalle: req.body.detalle,
                            orden: req.body.orden,
                            extension: ext,
                            server: "localhost"
                        });

                        const targetPath = path.resolve(__dirname, `${parametros.IMAGES_PATH.SLIDER}${newSlider._id}${ext}`);
                        await fs.rename(imageTempPath, targetPath);

                        const sliderSaved = await newSlider.save();
                        await nuevoToken(req.token.usuario).then((token) => {
                            let rta = {
                                "slider": sliderSaved,
                                "token": token
                            }
                            res.status(200).send(rta);
                        }).catch(async (err) => {
                            if (req.file) {
                                fs.unlink(req.file.path);
                            }
                            res.status(404).json({ error: 'No se pudo generar nuevo token' });
                        })
                    } else {
                        await fs.unlink(imageTempPath);
                        res.status(500).json({ error: 'Only Images are allowed' });
                    }
                }
            }
        };
        saveSlider();

    }).catch(error => {
        fs.unlink(req.file.path);
        res.status(404).send(req.file.path);
    });

};




module.exports = ctrlSlider;
