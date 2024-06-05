const controller = require('../controllers').artesano;
const { Router } = require('express');
const router = Router();

router.post('/artesano', controller.guardar);
router.put('/artesano/:id', controller.actualizar);
router.delete('/artesano', controller.eliminar);
router.get('/artesano/:id', controller.obtener);
//router.get('/artesanos', controller.listar);
router.post('/artesano/save/', controller.save);
router.get('/artesanos',  controller.buscar);
router.get('/artesano-dni/:dni', controller.obtenerDNI);


module.exports = router;
 
 