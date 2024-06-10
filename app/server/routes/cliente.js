const controller = require('../controllers').cliente;
const { uploadarchivoDDP } = require('../midleware/uploadVictor');
const { Router } = require('express');
const router = Router();

router.post('/cliente', controller.guardar);
router.put('/cliente/:id', controller.actualizar);
router.delete('/cliente', controller.eliminar);
router.get('/cliente/:id', controller.obtener);
router.get('/cliente', controller.listar);
router.post('/cliente/save/', controller.save);
router.get('/clientes', controller.filtrar);
router.post('/fileupload4', uploadarchivoDDP, controller.uploadFilimg);

module.exports = router;