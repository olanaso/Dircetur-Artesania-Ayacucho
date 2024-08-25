const controller = require('../controllers').portada;
const { Router } = require('express');
const router = Router();


router.get('/portada', controller.ListarDatosPortada);
module.exports = router;