const controller    = require('../controllers').personal;
const {Router} = require('express');
const router = Router();

router.post('/personal',  controller.guardar);
router.put('/personal/:id',  controller.actualizar);
router.delete('/personal',  controller.eliminar);
router.get('/personal/:id',  controller.obtener);
router.get('/personals',  controller.listar);
router.get('/personals/buscar',  controller.buscar);
router.post('/personals/save',  controller.save);
router.get('/login',  controller.login);


module.exports=router;