const controller = require('../controllers').ubicaciones;
const { Router } = require('express');
const router = Router();


router.get('/paises', controller.listarPais);
router.get('/regiones', controller.obtenerRegiones);
router.get('/ciudades', controller.obtenerCiudades);


module.exports = router;