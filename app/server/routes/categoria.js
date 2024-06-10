const controller = require('../controllers').categoria;
const { Router } = require('express');
const router = Router();
const { uploadarchivoDDP } = require('../midleware/uploadMax');



router.post('/categoria', controller.guardar);
router.put('/categoria/:id', controller.actualizar);
router.delete('/categoria', controller.eliminar);
router.get('/categoria/:id', controller.obtener);
router.get('/categoria', controller.listar);
router.post('/categoria/save/', controller.save);
router.get('/categorias', controller.filtrar);

router.post('/categoria/fileupload', uploadarchivoDDP, controller.uploadImgCategoria);

module.exports = router;