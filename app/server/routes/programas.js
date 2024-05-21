const controller = require('../controllers').programas;
const {Router} = require('express');
const router = Router();

router.get('/listarProgramasIESTP',  controller.listarProgramasbyIESTP);
router.get('/listarProgramasIESTPSeleccionado',  controller.listarProgramasbyIESTPSeleccionado);



module.exports=router;