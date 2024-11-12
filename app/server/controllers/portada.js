const { listarSlider, listarCategorias, listadoProductosOferta, listadoProductosDestacados, listadoProductosRecientes, busquedaProducto, obtenerArtesano, PortadaBusquedaListCategorias, PortadaBusquedaListArtesanos } = require('../services/portada/portada');

module.exports = {
    ListarDatosPortada, busquedaProductoController, buscarArtesano, portadaInitBusqueda
};


async function ListarDatosPortada (req, res) {

    let sliders = await listarSlider()
    let categorias = await listarCategorias()
    let productosOferta = await listadoProductosOferta()
    let productosDestacados = await listadoProductosDestacados()
    let productosRecientes = await listadoProductosRecientes()
    return res.status(200).send({ sliders, categorias, productosOferta, productosDestacados, productosRecientes });

}


async function busquedaProductoController (req, res) {
    let param = req.query;
    let resultado = await busquedaProducto(param.page, param.limit, param.oferta, param.precio_min, param.precio_max
        , param.abrev_categoria, param.nombre_categoria, param.id_categoria, param.id_artesano, param.nombre_artesano
        , param.nombre_producto, param.order)

    return res.status(200).send(resultado);

}



async function buscarArtesano (req, res) {
    let param = req.query;
    let resultado = await obtenerArtesano(param.id)

    return res.status(200).send(resultado);

}


async function portadaInitBusqueda (req, res) {
    let listArtesanos = await PortadaBusquedaListArtesanos();
    let listCategorias = await PortadaBusquedaListCategorias()

    return res.status(200).send({ listArtesanos, listCategorias });
}
