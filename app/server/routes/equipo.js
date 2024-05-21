const controller    = require('../controllers').equipo;
const {Router} = require('express');
const router = Router();

router.post('/equipo',  controller.guardar);
router.put('/equipo/:id',  controller.actualizar);
router.delete('/equipo',  controller.eliminar);
router.get('/equipo/:id',  controller.obtener);
router.get('/equipos',  controller.listar);
router.get('/equipos/buscar',  controller.buscar);
router.post('/equipos/save',  controller.save);


module.exports=router;