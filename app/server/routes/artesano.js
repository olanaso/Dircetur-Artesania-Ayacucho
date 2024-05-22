const controller = require('../controllers').artesano;
const { Router } = require('express');
const router = Router();

router.post('/artesano', authenticateToken, controller.guardar);
router.put('/artesano/:id', controller.actualizar);
router.delete('/artesano', controller.eliminar);
router.get('/artesano/:id', controller.obtener);
router.get('/artesanos', controller.listar);
router.post('/artesano/save/', controller.save);


module.exports = router;