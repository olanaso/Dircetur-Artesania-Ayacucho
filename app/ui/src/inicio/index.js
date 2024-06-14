import { loadPartials } from '../utils/viewpartials';
import { hideLoading, checkSession,llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init'
import {  } from '../utils/config'
import {  obtenerLibrosLeidosGuardados } from './api'


hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menu.html', container: 'app-side' },


  ]; 
  try {
    await loadPartials(partials);
    import ('../utils/common')

   
    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log('Las vistas parciales se han cargado correctamente!');
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp () {
 
  validarSession();
  setTimeout(function() {
    llenarinformacionIESTPProg();
    marcarSubMenuSeleccionado();
}, 500);
 

}
let usuario = null;
async function validarSession () {
  let result = await checkSession()
  console.log(result)
  if (result.isvalid) {
    usuario = result.usuarios;
    llenarinformacion(result)
    cargarLibrosLeidosGuardados(usuario);
  } else {
    location.href = "sinacceso.html"
  }
}


function llenarinformacion (datos) {
  let usuario=getDataFromLocalStorage('session').usuarios;
  $('#mlbliestp').text(usuario.id)
  //$('#mlbliestp').text(datos.usuario.iestp.nombre)
  $('#m_programas').empty();
  /*let nro = 1
  for (let prog of datos.usuario.programas) {
  $('#m_programas').append(`
        <li>${nro}.- ${prog.denominacion}</li>
      `)
      nro++
 }*/

}

async function cargarLibrosLeidosGuardados (usuario) {
  let {libguardados,librecientes} = await obtenerLibrosLeidosGuardados(usuario);
  $('#books_recientes').empty();
  for (let bookreciente of librecientes) {
    $('#books_recientes').append(cardBook(bookreciente))
  }
  $('#books_guardados').empty();
  for (let bookguardado of libguardados) {
    $('#books_guardados').append(cardBook(bookguardado))
  }
  $('[data-toggle="tooltip"]').tooltip();

}

function cardBook ({ id, url_portada, titulo, valor,autores }) {
  let estrellas = '';
  let puntuacion = (valor == null || valor == 'null') ? 0 : parseInt(valor);
  for (let i = 1; i <= 5; i++) {
    if (i <= puntuacion) {
      estrellas += `<span>&#9733;</span>`
    } else {
      estrellas += `<span>&#9734;</span>`
    }

  }

  let html = `
    <div class="col-12 col-md-2-5">
    <div class="card card-book" style="width: 14rem;">
    <a href="detailbook.html?id=${id}"> <img class="card-img-top" height="195" src="${url_portada}" alt="Card image cap">
    </a>    
    <div class="card-body">
        <a href="detailbook.html?id=${id}">
          <h5 data-toggle="tooltip" title="${titulo}" class="card-title long-text" >${titulo}</h5></a>
          <p class="card-text">${autores}</p>
          <div class="rating">
            ${estrellas}
          </div>
        </div>
      </div>
</div>
`
  return html;
}


function limpiarDatos(){
  // localStorage.removeItem('session');
  // localStorage.removeItem('usuario');
  // localStorage.removeItem('accessToken');
}