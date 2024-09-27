const controller = require('../controllers').productosFavoritos
const { Router } = require('express')
const {ValidatorCreateWishProduct} = require('../validators/productosFavoritos')
const router = Router()

router.post('/v1/productos-favoritos', ValidatorCreateWishProduct, controller.save)
router.delete('/v1/productos-favoritos/:idProducto/:idCliente', controller.deleted)
router.get('/v1/productos-favoritos/clientes/:idCliente', controller.getAllByClientId)


router.get('/test', (req, res) => res.send('test route'))

module.exports = router
