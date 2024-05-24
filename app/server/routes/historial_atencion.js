const controller = require('../controllers').historial_atencion;
const { Router } = require('express');
const router = Router();

router.post('/historial_atencion', controller.guardar);
router.put('/historial_atencion/:id', controller.actualizar);
router.delete('/historial_atencion', controller.eliminar);
router.get('/historial_atencion/:id', controller.obtener);
router.get('/historial_atencion', controller.listar);
router.post('/historial_atencion/save/', controller.save);


module.exports = router;