const controller = require('../controllers').pedido;
const { Router } = require('express');
const router = Router();

router.post('/pedido', controller.guardar);
router.put('/pedido/:id', controller.actualizar);
router.delete('/pedido:id', controller.eliminar);
router.get('/pedido/:id', controller.obtener);
router.get('/pedido', controller.listar);
router.post('/pedido/save/', controller.save);


module.exports = router;