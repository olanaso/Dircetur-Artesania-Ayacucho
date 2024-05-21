const controller = require('../controllers').libros;
const { Router } = require('express');
const router = Router();

router.post('/libro', controller.guardar);
router.get('/libro-inicio', controller.listarUltimosRecienteyGuardados);
router.get('/mislibros', controller.listarMisLibros);
router.get('/libro', controller.obtener);
router.post('/leer-libro', controller.leerlibros);
router.post('/valorar-libro', controller.valorarlibro);
router.post('/guardar-libro', controller.guardarlibro);
router.get('/mostrarLibro', controller.mostrarLibro);
router.get('/mostrarLibroparte', controller.mostrarLibroParte);
router.get('/busquedaLibros', controller.busquedaLibros);
router.get('/obtenertipoLibro', controller.obtenertipoLibro);
/*router.put('/libro/:id',  controller.actualizar); 
router.delete('/libro/:id',  controller.eliminar);
router.get('/libro/:id/:nombre_libro',  controller.obtener);
router.get('/libros/:iestp/:carrera/:busqueda',  controller.listar);
router.get('/librospag/:iestp/:carrera/:busqueda',  controller.listarPaginado);
router.get('/libroscant/:iestp/:carrera',  controller.listarCantbyCarreras);
router.get('/librosreporte',  controller.listarReporte);
router.post('/libro/save',  controller.save);*/


module.exports = router;