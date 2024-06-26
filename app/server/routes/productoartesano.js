const controller = require('../controllers').productoartesano;
const { Router } = require('express');
const router = Router(); 
const { uploadarchivoProducto} = require('../midleware/uploadJorge');

/*router.post('/producto', controller.guardar);
router.put('/producto/:id', controller.actualizar);
router.delete('/producto', controller.eliminar);
router.get('/producto/:id', controller.obtener);
router.get('/productos', controller.listar);
router.post('/producto/save', controller.save);*/
router.get('/productoartesano',  controller.buscar);
router.get('/productoartesanos/:id', controller.listar);
/*
router.post('/producto/fileupload', uploadarchivoProducto, controller.uploadFilproducto);*/


module.exports = router;

 