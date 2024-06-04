const controller    = require('../controllers').indent_predios;
const {Router} = require('express');
const router = Router();

router.post('/indent_predios',  controller.guardar);
router.put('/indent_predios/:id',  controller.actualizar);
router.delete('/indent_predios/:id',  controller.eliminar);
router.get('/indent_predios/:id',  controller.obtener);
router.get('/indent_predios',  controller.listar);
router.get('/indent_predios_day',  controller.listardia);
router.post('/indent_predios/save',  controller.save);


module.exports=router;