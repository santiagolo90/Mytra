const express = require('express');
const router = express.Router();


const { slidersController } = require('../../controllers');
const verifyToken =  require('../../middleware/token.mw')
const imageMW =  require('../../middleware/image.mw')



router.get('/api/sliders/', slidersController.getAll);
router.post('/api/sliders/', slidersController.getAllWithFilters);
router.post('/api/slider/',verifyToken,imageMW, slidersController.create);

module.exports = router;

