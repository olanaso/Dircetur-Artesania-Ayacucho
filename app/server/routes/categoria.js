const controller = require('../controllers').categoria;
const { Router } = require('express');
const router = Router();

router.post('/categoria', controller.guardar);
router.put('/categoria/:id', controller.actualizar);
router.delete('/categoria', controller.eliminar);
router.get('/categoria/:id', controller.obtener);
router.get('/categoria', controller.listar);
router.post('/categoria/save/', controller.save);


module.exports = router;