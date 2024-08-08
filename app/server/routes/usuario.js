const controller    = require('../controllers').usuario;
const {Router} = require('express');
const {authenticateToken} = require("../midleware/authorization");
const {checkRol} = require('../midleware/rol')
const router = Router();

router.post('/usuario',  controller.guardar);
router.put('/usuario/:id',  controller.actualizar);
router.delete('/usuario',  controller.eliminar);
router.get('/usuario/:id',  controller.obtener);
router.get('/usuario_dni' , controller.obtenerDNI);
router.get('/usuarios',  controller.listar);
router.post('/usuario_save',  controller.save);
router.post('/cambiar_contrasenia',  controller.cambiarContrasenia);
router.get('/loginpersonal',  controller.loginpersonal);
router.post('/login',  controller.loginpersonal);
router.post('/protegido',authenticateToken, checkRol(["2"]),  controller.verificarToken);
router.post('/recuperarcuenta',  controller.recuperarcuenta);
router.post('/importarUsuarios',  controller.importarUsuarios);
router.get('/reporteusuariosiestp',  controller.reporteusuariosiestp);
router.get('/reportelibrosiestp',  controller.reportelibrosiestp);
router.get('/reporteaccesosiestp',  controller.reporteaccesosiestp);

//router.get('/login',  controller.login);
authenticateToken,


module.exports=router;