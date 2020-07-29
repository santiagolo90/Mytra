const express = require('express');
const router = express.Router();


const { logsController } = require('../../controllers');

router.get('/api/logs/', logsController.getAll);
router.post('/api/log/', logsController.getOne);



module.exports = router;

