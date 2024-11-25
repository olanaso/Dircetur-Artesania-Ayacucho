import { loadPartials } from '../utils/viewpartials';
import { saveUser, changepassword, getDatausuario } from './api';
import { hideLoading, showLoading, checkSession, llenarinformacionIESTPProg } from '../utils/init';
import { showToast } from '../utils/toast';
import { getDataFromLocalStorage, } from '../utils/config'

hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menu.html', container: 'app-side' },


  ];
  try {
    await loadPartials(partials);
    import('../utils/common')

    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log('Las vistas parciales se han cargado correctamente!');
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp () {
  checkSession()
  //setDrp()
  cargarDatosusuario();
  // buscarlibro();
  llenarinformacionIESTPProg();

  guardarUsuario()
  cambiarClave()
  mostrarOcultarPassword()
}

function mostrarOcultarPassword () {
  // Alternar visibilidad de contraseña actual
  $('#togglePasswordAnt').on('click', function () {
    const input = $('#txt_clave_ant');
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    // Cambia el icono (opcional)
    $(this).text(type === 'password' ? '👁️' : '🚫');
  });

  // Alternar visibilidad de contraseña nueva
  $('#togglePasswordNueva').on('click', function () {
    const input = $('#txt_clave_nueva');
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    // Cambia el icono (opcional)
    $(this).text(type === 'password' ? '👁️' : '🚫');
  });
}


async function cargarDatosusuario () {
  let usuariosession = getDataFromLocalStorage('session').usuarios;
  //console.log(usuario)
  let usuario = await getDatausuario(usuariosession.id);
  $('#txt-dni').val(usuario.usuario)
  $('#txt-nombres').val(usuario.nombre_completo)
  $('#txt-apellidos').val(usuario.apellidos)
  $('#txt-correo').val(usuario.correo)
  // $('#txt-telefonos').val(usuario.telefonos)
  let rol = "";
  if (usuario.rolid == 1) {
    rol = "ADMINISTRADOR"
  }
  if (usuario.rolid == 2) {
    rol = "ARTESANO"
  }
  if (usuario.rolid == 3) {
    rol = "CLIENTE"
  }
  $('#txt-rol').val(rol)

  // let programas = usuario.programas.map(item => item.denominacion).join(', ');
  // $('#txt-programa').val(programas)

}

async function guardarUsuario () {

  $('#btnguardardatosperfil').on('click', async function (e) {

    e.preventDefault();

    let usuariosession = getDataFromLocalStorage('session').usuarios;
    $("#btnguardardatosperfil").prop("disabled", true).text("Guardando...");
    let dni = $('#txt-dni').val()
    let nombre_completo = $('#txt-nombres').val()
    // let apellidos = $('#txt-apellidos').val()
    let correo = $('#txt-correo').val()
    // let telefonos = $('#txt-telefonos').val()
    let result = await saveUser({ id: usuariosession.id, dni, nombre_completo, correo });
    if (result.id) {
      showToast('Se guardo los datos correctamente')
    } else {
      showToast('Ocurrio un error.')
    }
    $("#btnguardardatosperfil").prop("disabled", false).text("Guardar");

  })


}


async function cambiarClave () {

  $('#btncambiarClave').on('click', async function (e) {
    e.preventDefault();
    $("#btncambiarClave").prop("disabled", true).text("Guardando...");
    let dni = $('#txt-dni').val()
    let clave_ant = $('#txt_clave_ant').val()
    let clave_nueva = $('#txt_clave_nueva').val()

    let result = await changepassword({ dni, clave_ant, clave_nueva });
    if (result.ischanged != undefined) {

      showToast(result.msj)
    } else {
      showToast('Se guardo los datos correctamente');
      window.location.href = "index.html"
    }
    $("#btncambiarClave").prop("disabled", false).text("Guardar");

  })


}

async function createPaginate () {
  let usuario = getDataFromLocalStorage('session').usuario;
  showLoading();
  let libros = await busquedaMisLibros(usuario.id)
  $('#txtcant-mostrar').text(libros.length)
  cargarLibros(libros)
  hideLoading()

}

function cambiarnombrebotonos () {
  $('#pagination-demo .prev a').text('Anterior');
  $('#pagination-demo .next a').text('Siguiente');
  $('#pagination-demo .first a').text('Primero');
  $('#pagination-demo .last a').text('Último');
}

async function cargarLibros (libros) {

  $('#resultadobooks').empty();
  for (let book of libros) {
    $('#resultadobooks').append(cardBook(book))
  }
  $('[data-toggle="tooltip"]').tooltip();

}


function cardBook ({ id, url_portada, titulo, valor, autores }) {
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
    <div class="col-sm-2-4">
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

function buscarlibro () {
  $('#btnbuscarlibro').on('click', function (e) {
    $("#btnbuscarlibro").prop("disabled", true).text("Buscando...");
    createPaginate()
    $("#btnbuscarlibro").prop("disabled", false).text("Búscar");
  })
}