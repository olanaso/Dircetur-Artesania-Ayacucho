const controller = require('../controllers').producto;
const { Router } = require('express');
const router = Router(); 
const { uploadarchivoProducto} = require('../midleware/uploadJorge');

router.post('/producto', controller.guardar);
router.put('/producto/:id', controller.actualizar);
router.delete('/producto', controller.eliminar);
router.get('/producto/:id', controller.obtener);
//router.get('/productos', controller.listar);
router.post('/producto/save', controller.save);
router.get('/productos',  controller.buscar);



router.post('/producto/fileupload', uploadarchivoProducto, controller.uploadFilproducto);
router.get('/reportegeneral', controller.reportegeneral);
router.get('/prductosFiltrados', controller.productoFiltrados);


module.exports = router;

 