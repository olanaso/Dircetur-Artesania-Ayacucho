const controller    = require('../controllers').notas;
const {Router} = require('express');
const router = Router();

router.post('/nota',  controller.guardar);
router.put('/nota/:id',  controller.actualizar);
router.delete('/nota',  controller.eliminar);
router.get('/nota/:id',  controller.obtener);
router.get('/nota-cert/:codigo',  controller.obtenerCertificado);
router.get('/notas',  controller.listar);
router.post('/nota_save',  controller.save);
router.post('/importarNotas',  controller.importarNotas);
router.get('/search',  controller.search);



module.exports=router;