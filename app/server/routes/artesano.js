const controller = require('../controllers').artesano;
const { Router } = require('express');
const { uploadarchivoArtesano } = require('../midleware/uploadJorge');
const router = Router();

router.post('/artesano', controller.guardar);
router.put('/artesano/:id', controller.actualizar);
router.delete('/artesano', controller.eliminar);
router.get('/artesano/:id', controller.obtener);
router.get('/artesanos', controller.listar);
router.get('/artesanos-combo', controller.listarCombo);
router.post('/artesano/save/', controller.save);
router.post('/artesano/saveusuarioartesano/', controller.saveUsuarioArtesano);
router.get('/artesanos', controller.buscar);
router.get('/artesano-dni/:dni', controller.obtenerDNI);
router.post('/artesano/fileupload', uploadarchivoArtesano, controller.uploadFilartesano);
router.get('/v1/artesanos/categorias', controller.getAllArtesanosByCategoria)
router.get('/artesanosweb', controller.listarArtesanosWeb)
router.get('/artesanos/mapa', controller.listarArtesanosMapa)

module.exports = router;



