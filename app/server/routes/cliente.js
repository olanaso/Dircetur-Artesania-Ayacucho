const controller = require('../controllers').cliente;
const { Router } = require('express');
const router = Router();

router.post('/cliente', controller.guardar);
router.put('/cliente/:id', controller.actualizar);
router.delete('/cliente', controller.eliminar);
router.get('/cliente/:id', controller.obtener);
router.get('/clientes', controller.listar);
router.post('/cliente/save/', controller.save);

module.exports = router;