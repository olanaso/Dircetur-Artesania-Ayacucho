const controller = require('../controllers').usuario;
const { Router } = require('express');
const { authenticateToken } = require("../midleware/authorization");
const { checkRol } = require('../midleware/rol')
const { validatorUpdatePasswordCliente } = require('../validators/usuario')
const router = Router();

router.post('/usuario', controller.guardar);
router.put('/usuario/:id', controller.actualizar);
router.delete('/usuario', controller.eliminar);
router.get('/usuario/:id', controller.obtener);
router.get('/usuario-perfil/:id', controller.obtenerDatosPerfil);
router.get('/usuario_dni', controller.obtenerDNI);
router.get('/usuarios', controller.listar);
router.post('/usuario_save', controller.save);
router.post('/cambiar_contrasenia', controller.cambiarContrasenia);
router.put('/resetear-contrasenia-artesano/:id', controller.resetearContraseniaArtesano);
router.put('/resetear-contrasenia-cliente/:id', controller.resetearContraseniaCliente);
router.put('/v1/contrasenia-clientes/:id', validatorUpdatePasswordCliente, controller.actualizarContraseniaCiente)
router.get('/loginpersonal', controller.loginpersonal);
router.post('/login', controller.loginpersonal);
router.post('/v1/login-clientes', controller.loginCliente)
router.post('/protegido', authenticateToken, checkRol(["1", "2"]), controller.verificarToken);
router.post('/recuperarcuenta', controller.recuperarcuenta);
router.post('/importarUsuarios', controller.importarUsuarios);
router.get('/reporteusuariosiestp', controller.reporteusuariosiestp);
router.get('/reportelibrosiestp', controller.reportelibrosiestp);
router.get('/reporteaccesosiestp', controller.reporteaccesosiestp);

module.exports = router;