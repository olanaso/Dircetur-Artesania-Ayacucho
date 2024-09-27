const controller = require('../controllers').portada;
const { Router } = require('express');
const router = Router();


router.get('/portada', controller.ListarDatosPortada);
router.get('/buscar-producto', controller.busquedaProductoController);
router.get('/portada-artesano', controller.buscarArtesano);
router.get('/portada-init-busqueda', controller.portadaInitBusqueda);

module.exports = router;