const controller = require('../controllers').cliente;
const { uploadarchivoDDP } = require('../midleware/uploadVictor');
const { Router } = require('express');
const router = Router();
const {validatorUpdateCliente} = require('../validators/cliente')

router.post('/cliente', controller.guardar);
router.put('/cliente/:id',validatorUpdateCliente, controller.actualizar);
router.delete('/cliente/:id', controller.eliminar);
router.get('/cliente/:id', controller.obtener);
router.get('/cliente', controller.listar);
router.post('/cliente/save/', controller.save);
router.get('/clientes', controller.filtrar);
router.post('/fileupload4', uploadarchivoDDP, controller.uploadFilimg);

module.exports = router;