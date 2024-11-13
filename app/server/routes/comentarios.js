const controller = require('../controllers').comentarios;
const { Router } = require('express');
const router = Router();


router.get('/listaComentarios', controller.listar);

router.post('/nuevoComentario', controller.guardar);

module.exports = router;



