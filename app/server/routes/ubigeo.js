const controller = require('../controllers').ubigeo;
const { Router } = require('express');
const router = Router();

 

router.get('/departamento', controller.listarDepartamento);
router.get('/ubigeo-provincias/:id', controller.obtenerProvincia);
router.get('/ubigeo-distritos/:id', controller.obtenerDistrito);


module.exports = router;