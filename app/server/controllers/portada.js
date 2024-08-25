const { listarSlider, listarCategorias, listadoProductosOferta, listadoProductosDestacados, listadoProductosRecientes } = require('../services/portada/portada');

module.exports = {
    ListarDatosPortada
};


async function ListarDatosPortada (req, res) {

    let sliders = await listarSlider()
    let categorias = await listarCategorias()
    let productosOferta = await listadoProductosOferta()
    let productosDestacados = await listadoProductosDestacados()
    let productosRecientes = await listadoProductosRecientes()
    return res.status(200).send({ sliders, categorias, productosOferta, productosDestacados, productosRecientes });

}
