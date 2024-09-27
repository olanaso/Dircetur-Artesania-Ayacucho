const controller = require('../controllers').pedido;
const { Router } = require('express');
const router = Router();
const { uploadarchivoDDP } = require('../midleware/uploadMax');


router.post('/pedido', controller.guardar);
router.put('/pedido/:id', controller.actualizar);
router.delete('/pedido', controller.eliminar);
router.get('/pedido/:id', controller.obtener);
router.get('/pedido', controller.listar);
router.post('/pedido/save/', controller.save);
router.get('/pedidos', controller.filtrar);

router.post('/enviar-pedido-cliente', controller.enviarPedido);


router.get('/reporte1/:id', controller.reporte1);
router.get('/reporte2/:id', controller.reporte2);

router.post('/pedido/fileupload', uploadarchivoDDP, controller.uploadFileAtencion);

module.exports = router;