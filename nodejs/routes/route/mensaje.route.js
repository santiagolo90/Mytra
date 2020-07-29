const express = require('express');
const router = express.Router();

const { mensajeController } = require('../../controllers');

router.get('/api/mensajes/', mensajeController.getAll);
router.post('/api/mensajes/', mensajeController.getAllWithFilters);
router.post('/api/mensajes/name', mensajeController.getByName);
router.post('/api/mensajes/global', mensajeController.getByGlobalText);
router.post('/api/mensaje/', mensajeController.create);



module.exports = router;

