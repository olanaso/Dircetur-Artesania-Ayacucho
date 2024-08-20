const controller = require('../controllers').productosFavoritos
const { Router } = require('express')

const router = Router()

router.post('/v1/productos-favoritos', controller.save)
router.delete('/v1/productos-favoritos/:idProducto/:idCliente', controller.deleted)
router.get('/test', (req, res) => res.send('test route'))

module.exports = router
