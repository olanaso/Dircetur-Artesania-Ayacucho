import { resolve } from 'path';

export default {
  build: {
    manifest: true,
    rollupOptions: {
      // Configurar la entrada de los archivos
      input: {
        'index': resolve(__dirname, 'index.html'),
        'recuperar-cuenta': resolve(__dirname, 'recuperar-cuenta.html'),
        'inicio': resolve(__dirname, 'inicio.html'),
        'carga-evaluaciones': resolve(__dirname, 'carga-evaluaciones.html'),
        'busqueda-certificado': resolve(__dirname, 'busqueda-certificado.html'),        
        'lista-capacitaciones': resolve(__dirname, 'lista-capacitaciones.html'),
        'miperfil': resolve(__dirname, 'miperfil.html'),
        'sinacceso': resolve(__dirname, 'sinacceso.html'),
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