const controller    = require('../controllers').mantenimiento;
const {Router} = require('express');
const router = Router();

router.post('/mantenimiento',  controller.guardar);
router.put('/mantenimiento/:id',  controller.actualizar);
router.delete('/mantenimiento',  controller.eliminar);
router.get('/mantenimiento/:id',  controller.obtener);
router.get('/mantenimientos',  controller.listar);
router.post('/mantenimientos/buscar',  controller.buscar);
router.post('/mantenimientos/buscarProgramados',  controller.buscarProgramados);
router.post('/mantenimientos/save',  controller.save);
router.post('/mantenimientos/finalizar',  controller.finalizar);


module.exports=router;