const controller = require('../controllers').slider;
const { Router } = require('express');
const router = Router();

router.post('/slider', controller.guardar);
router.put('/slider/:id', controller.actualizar);
router.delete('/slider', controller.eliminar);
router.get('/slider/:id', controller.obtener);
router.get('/sliders', controller.listar);
router.post('/slider/save/', controller.save);

module.exports = router;