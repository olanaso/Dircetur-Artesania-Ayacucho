import { resolve } from 'path';

export default {
  build: {
    manifest: true,
    rollupOptions: {
      // Configurar la entrada de los archivos
      input: {
        'alertas': resolve(__dirname, 'alertas.html'),
        'artesanos-detalle': resolve(__dirname, 'artesanos-detalle.html'),
        'artesanos': resolve(__dirname, 'artesanos.html'),
        'categorias': resolve(__dirname, 'categorias.html'),
        'clientes-detalle': resolve(__dirname, 'clientes-detalle.html'),
        'clientes': resolve(__dirname, 'clientes.html'),
        'dashboard': resolve(__dirname, 'dashboard.html'),
        'datosartesano': resolve(__dirname, 'datosartesano.html'),
        'demoartesania': resolve(__dirname, 'demoartesania.html'),
        'index': resolve(__dirname, 'index.html'),
        'inicio': resolve(__dirname, 'inicio.html'),
        'inicioartesano': resolve(__dirname, 'inicioartesano.html'),
        'login': resolve(__dirname, 'login.html'),
        'miperfil': resolve(__dirname, 'miperfil.html'),
        'productoartesano-detalle': resolve(__dirname, 'productoartesano-detalle.html'),
        'productoartesano': resolve(__dirname, 'productoartesano.html'),
        'productos-detalle': resolve(__dirname, 'productos-detalle.html'),
        'productos': resolve(__dirname, 'productos.html'),
        'recuperar-cuenta': resolve(__dirname, 'recuperar-cuenta.html'),
        'reportes': resolve(__dirname, 'reportes.html'),
        'sinacceso': resolve(__dirname, 'sinacceso.html'),
        'slider': resolve(__dirname, 'slider.html'),
        'usuarios': resolve(__dirname, 'usuarios.html'),
        'ventaartesano-detalle': resolve(__dirname, 'ventaartesano-detalle.html'),
        'ventaartesano': resolve(__dirname, 'ventaartesano.html'),
        'ventas-detalle': resolve(__dirname, 'ventas-detalle.html'),
        'ventas': resolve(__dirname, 'ventas.html')
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