import { resolve } from 'path';

export default {
  build: {
    manifest: true,
    rollupOptions: {
      // Configurar la entrada de los archivos
      input: {
        'alertas': resolve(__dirname, 'alertas.html'),
        'artesanos-detalle': resolve(__dirname, 'artesanos-detalle.html'),
        'artesanos-nuevo': resolve(__dirname, 'artesanos-nuevo.html'),
        'artesanos': resolve(__dirname, 'artesanos.html'),
        'añadir-deseados': resolve(__dirname, 'añadir-deseados.html'),
        'busqueda-certificado': resolve(__dirname, 'busqueda-certificado.html'),
        'carga-evaluaciones': resolve(__dirname, 'carga-evaluaciones.html'),
        'categorias': resolve(__dirname, 'categorias.html'),
        'clientes-detalle': resolve(__dirname, 'clientes-detalle.html'),
        'clientes': resolve(__dirname, 'clientes.html'),
        'cuenta-cliente': resolve(__dirname, 'cuenta-cliente.html'),
        'dashboard': resolve(__dirname, 'dashboard.html'),
        'datosartesano': resolve(__dirname, 'datosartesano.html'),
        'demoartesania': resolve(__dirname, 'demoartesania.html'),
        'detalle-cliente': resolve(__dirname, 'detalle-cliente copy.html'),
        'historial-ventas': resolve(__dirname, 'historial-ventas copy.html'),
        'login': resolve(__dirname, 'login.html'),
        'inicio': resolve(__dirname, 'inicio.html'),
        'inicioartesano': resolve(__dirname, 'inicioartesano.html'),
        'lista-capacitaciones': resolve(__dirname, 'lista-capacitaciones.html'),
        'login-cliente': resolve(__dirname, 'login-cliente.html'),

        'miperfil': resolve(__dirname, 'miperfil.html'),
        'index': resolve(__dirname, 'index.html'),
        'principal-artesano': resolve(__dirname, 'principal-artesano.html'),
        'principal-busqueda': resolve(__dirname, 'principal-busqueda.html'),
        'principal-compra': resolve(__dirname, 'principal-compra.html'),
        'principal-detalle': resolve(__dirname, 'principal-detalle.html'),
        'principal-proceso-compra': resolve(__dirname, 'principal-proceso-compra.html'),
        'producto': resolve(__dirname, 'producto.html'),
        'productoartesano-detalle': resolve(__dirname, 'productoartesano-detalle.html'),
        'productoartesano': resolve(__dirname, 'productoartesano.html'),
        'productos-detalle': resolve(__dirname, 'productos-detalle.html'),
        'productos': resolve(__dirname, 'productos.html'),
        'productos2': resolve(__dirname, 'productos2.html'),
        'prueba': resolve(__dirname, 'prueba.html'),
        'recuperar-cuenta': resolve(__dirname, 'recuperar-cuenta.html'),
        'registrar-cliente': resolve(__dirname, 'registrar-cliente.html'),
        'reportes': resolve(__dirname, 'reportes.html'),
        'sinacceso': resolve(__dirname, 'sinacceso.html'),
        'slider': resolve(__dirname, 'slider.html'),
        'uploaddemo': resolve(__dirname, 'uploaddemo.html'),
        'usuarios': resolve(__dirname, 'usuarios.html'),
        'ventaartesano-detalle': resolve(__dirname, 'ventaartesano-detalle.html'),
        'ventaartesano': resolve(__dirname, 'ventaartesano.html'),
        'ventas-detalle': resolve(__dirname, 'ventas-detalle.html'),
        'ventas': resolve(__dirname, 'ventas.html'),
        'productos_por_categoria': resolve(__dirname, 'productos_por_categoria.html'),
        'tienda/index': resolve(__dirname, 'tienda/index.html'),
        'tienda/busqueda': resolve(__dirname, 'tienda/busqueda.html'),
        'tienda/artesano': resolve(__dirname, 'tienda/artesano.html'),
        'tienda/artesanos': resolve(__dirname, 'tienda/artesanos.html'),
        'tienda/producto': resolve(__dirname, 'tienda/producto.html'),
        'tienda/carrito-de-compra': resolve(__dirname, 'tienda/carrito-de-compra.html'),
        'tienda/proceso-de-compra': resolve(__dirname, 'tienda/proceso-de-compra.html'),
        'tienda/productos-deseados': resolve(__dirname, 'tienda/productos-deseados.html'),
        'tienda/nosotros': resolve(__dirname, 'tienda/nosotros.html'),
        'tienda/preguntas-frecuentes': resolve(__dirname, 'tienda/preguntas-frecuentes.html'),
        'tienda/finalizacion-de-compra': resolve(__dirname, 'tienda/finalizacion-de-compra.html'),
        'tienda/mapa-artesanos': resolve(__dirname, 'tienda/mapa-artesanos.html'),
        'tienda/politica-proteccion-datos': resolve(__dirname, 'tienda/politica-proteccion-datos.html'),
        'tienda/politicas-privacidad': resolve(__dirname, 'tienda/politicas-privacidad.html'),
        'tienda/terminos-condiciones': resolve(__dirname, 'tienda/terminos-condiciones.html')
      }
    },

    outDir: resolve(__dirname, './dist'),
    minify: true,
    assetsInlineLimit: 0,
    terserOptions: {
      // mangle: true,
      compress: true,
      mangle: {
        properties: {
          regex: /^_/
        }
      },
      keep_fnames: false
    }
  },
  publicDir: './public',
};