const controller = require('../controllers').reportes;
const { Router } = require('express');
const router = Router();

router.get('/reporte', controller.generateReport);

module.exports = router;