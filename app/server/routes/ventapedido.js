const controller = require('../controllers').ventapedido;
const { Router } = require('express');
const router = Router();
const { uploadarchivoDDP } = require('../midleware/uploadMax');


/*router.post('/pedido', controller.guardar);
router.put('/pedido/:id', controller.actualizar);
router.delete('/pedido', controller.eliminar);
router.get('/pedido/:id', controller.obtener);
router.post('/pedido/save/', controller.save);*/
router.get('/ventapedidos', controller.filtrar);
router.get('/ventapedido', controller.listar);
/*
router.post('/pedido/fileupload', uploadarchivoDDP, controller.uploadFileAtencion);*/

module.exports = router;