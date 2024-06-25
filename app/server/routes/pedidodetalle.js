const controller = require('../controllers').pedidodetalle;
const { Router } = require('express');
const router = Router();  

router.post('/pedidodetalle', controller.guardar);
router.put('/pedidodetalle/:id', controller.actualizar);
///router.delete('/pedidodetalle', controller.eliminar);
//router.get('/pedidodetalle/:id', controller.obtener);
router.get('/pedidodetalle/:id', controller.listar);
//router.post('/pedidodetalle/save', controller.save);
//router.get('/pedidodetalles',  controller.buscar); 

module.exports = router;

 