const controller = require('../controllers').accesos;
const { Router } = require('express');
const router = Router();

router.post('/acceso', controller.guardar);
router.get('/accesos', controller.listarfull);
router.get('/acceso_fecha', controller.listarInterval);


module.exports = router;