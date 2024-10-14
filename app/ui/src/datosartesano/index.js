import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { FileUploader } from '../utils/uploadJorge.js';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();
import { guardarUsuario, geteditarArtesano, geteditarLogin, deleteUserCapacitacion, guardarArtesano, llenardepartamento, llenarprovincia, llenardistrito, nuevoUserCapacitacion, buscarDNI } from './api';
import { showLoading, hideLoading, llenarinformacionIESTPProg, marcarSubMenuSeleccionado } from '../utils/init';

import { showToast } from '../utils/toast';
import { baseUrl, baseUrldni, getDataFromLocalStorage, getBaseUrl } from '../utils/config.js';
import '../datosartesano/style.css'


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
  // checkadminsession(); 
  setTimeout(function () {
    llenarinformacionIESTPProg();
    //marcarSubMenuSeleccionado();
  }, 500);
  buscarUsuario();
  //exportarExcel();
  //nuevo();
  setChangeOpcionesBilletera();
}


function setChangeOpcionesBilletera () {

  document.getElementById('tipomediopago').addEventListener('change', handleSelectMediosPago);
}


function handleSelectMediosPago (event) {

  const contenedor = document.getElementById('valoresBilletera');
  const inputs = contenedor.querySelectorAll('.nro-yape-plin, .nombre-titular,  .nro-cta , .nro-cci');

  // Ocultar todos los inputs dentro del contenedor `valoresBilletera` inicialmente
  inputs.forEach(input => input.style.display = 'none');

  // Obtener el valor seleccionado y los targets a mostrar
  const selectedOption = event.target.options[event.target.selectedIndex];
  const targets = selectedOption.getAttribute('data-target');

  // Mostrar los inputs especificados en los targets dentro de `valoresBilletera`
  if (targets) {
    targets.split(' ').forEach(target => {
      const elements = contenedor.querySelectorAll(`.${target}`);
      elements.forEach(element => {
        element.style.display = 'block';
      });
    });
  }
}

/*async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}*/


let videoCounter = 0;
let videoCounter2 = 0;

async function nuevo () {

  $('#btnNuevoRegistro').on('click', async function (e) {

    openModalNuevo(0); // Llama a la función que abre el modal y pasa el ID

    $('#txt-dni1').val('')
    $('#txt-nombres1').val('')
    $('#txt-cod_curso1').val('')
    $('#txt-nota1').val('')
    $('#txt-cant_horas1').val('')
    $('#txt-fecha_inicio1').val('')
    $('#txt-fecha_fin1').val('')
    $('#txt-fecha_emision1').val('')
    $('#txt-instructor1').val('')
    $('#txt-temario1').val('')
    $('#txt-curso1').val('')
    $('#txt-ubicacion1').val('')
    $('#txt-institucion_solicitante1').val('')

  })

}

var artesanoId = 0;
var usuarioid = 0;


let contadorContacto = 0;
let contadorMedioPago = 0;
let contadorreconocimiento = 0;
let validar = 0;

var editarartesano = null;
var editarlogin = null;



async function buscarUsuario () {

  $('#btnvalidar').on('click', async function (e) {

    event.preventDefault(); // Prevenir el envío predeterminado del formulario

    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var repetirContrasena = document.getElementById("repetirContrasena").value;
    //var usuarioError = document.getElementById("usuarioError");
    //var contrasenaError = document.getElementById("contrasenaError");
    //var repetirContrasenaError = document.getElementById("repetirContrasenaError");
    var errores = false;


    // Validar usuario
    if (usuario.trim() === "") {

      showToast('El campo usuario es obligatorio')
      //usuarioError.textContent = "El campo usuario es obligatorio";
      errores = true;
      validar = 0;
      return;
    } else if (!/^\w+$/.test(usuario)) {

      showToast('El usuario solo puede contener letras, números y guiones bajos')
      //usuarioError.textContent = "El usuario solo puede contener letras, números y guiones bajos";
      errores = true;
      validar = 0;
      return;
    } else {
      usuarioError.textContent = "";
    }

    // Validar contraseña
    if (contrasena.trim() === "") {

      showToast('El campo contraseña es obligatorio')
      //contrasenaError.textContent = "El campo contraseña es obligatorio";
      errores = true;
      validar = 0;
      return;

    } else if (!/^\w+$/.test(contrasena)) {

      showToast('El contraseña solo puede contener letras, números y guiones bajos')
      //usuarioError.textContent = "El usuario solo puede contener letras, números y guiones bajos";
      errores = true;
      validar = 0;
      return;
    } else {
      //contrasenaError.textContent = "";
    }

    // Validar repetir contraseña
    if (repetirContrasena.trim() === "") {
      showToast('Debe repetir la contraseña')
      //repetirContrasenaError.textContent = "Debe repetir la contraseña";
      errores = true;
      validar = 0;
      return;
    } else if (repetirContrasena !== contrasena) {
      showToast('Las contraseñas no coinciden')
      //repetirContrasenaError.textContent = "Las contraseñas no coinciden";
      errores = true;
      validar = 0;
      return;
    } else {
      //.textContent = "";
    }

    if (!errores) {
      // No hay errores, mostrar alerta de éxito
      showToast('Se valido con exito')
      validar = 1;
      // Aquí podrías realizar alguna otra acción, como redireccionar a otra página
    }


  });

  /*********** */
  $('#btnguardarcambio').on('click', async function (e) {

    debugger

    e.preventDefault();
    var isValid = true;
    // Itera sobre todos los campos requeridos para verificar si están vacíos
    $('#form .form-control[required]').each(function () {
      if ($(this).val() === '') {
        isValid = false;
        $(this).css('border-color', 'red'); // Marca los campos vacíos
      } else {
        $(this).css('border-color', ''); // Restablece a la normalidad si se corrige
      }
    });

    if (!isValid) {
      showToast('Por favor, ingresa el DNI y todos los campos *.');
      document.getElementById('dni').focus(); // Pone el foco en el campo del D

      return;
    }
    // else if (validar == "0") {
    //   showToast('validar usuario de la ficha - información personal.');
    //   return;
    // } else {

    let dni = $('#dni').val()
    let ruc = $('#ruc').val()
    let nombres = $('#nombres').val()
    let apellidos = $('#apellidos').val()
    let correo = $('#correo').val()
    let celular = $('#celular').val()
    let lugar_nacimiento = $('#lugar_nacimiento').val()
    let ubigeo = $('#distrito').val()
    let lengua_materna = $('#lengua_materna').val()

    var foto1ImagePreview = document.getElementById('imagenFoto1');
    var foto2ImagePreview = document.getElementById('imagenFoto2');

    // Obtener el valor del atributo src
    var foto1 = foto1ImagePreview.src;
    var foto2 = foto2ImagePreview.src;

    //****informacion del taller */
    let listataller = [];

    let taller = {
      id: 1,
      nombretaller: $('#nombretaller').val(),
      horarioatencion: $('#horarioatencion').val(),
      ructaller: $('#ructaller').val(),
      direccionfisica: $('#direccionfisica').val(),
      latitud: $('#latitud').val(),
      longitud: $('#longitud').val()
    };
    listataller.push(taller);


    let tallerJSON = JSON.stringify(listataller);
    let lst_taller = tallerJSON;

    //****informacion especialidad tecnica */
    let listaespecialidad = [];

    let especialidad = {
      id: 1,
      descripcionhabilidades: $('#descripcionhabilidades').val(),
      tipoartesania: $('#tipoartesania').val(),
      ceramica: $('#ceramica').is(':checked') ? 1 : 0,
      piedra: $('#piedra').is(':checked') ? 1 : 0,
      talabarteria: $('#talabarteria').is(':checked') ? 1 : 0,
      otro: $('#otro').is(':checked') ? 1 : 0,
      desotro: $('#desotro').val()
    };
    listaespecialidad.push(especialidad);

    let especialidadJSON = JSON.stringify(listaespecialidad);
    let lst_especialidadtecnicas = especialidadJSON;

    //****informacion del contacto */
    let listacontacto = [];

    $('#listaContacto tr').each(function () {
      let fila = $(this);
      let contacto = {
        id: fila.find('td').eq(0).text(),
        valor: fila.find('td.ocultar').text(),
        tipo: fila.find('td').eq(2).text(),
        Usuario: fila.find('td').eq(3).text(),
        Enlace: fila.find('td').eq(4).text()
      };
      listacontacto.push(contacto);
    });

    let contactoJSON = JSON.stringify(listacontacto);

    let lst_contactos = contactoJSON;

    //****informacion del medio de pago */

    let listamediospago = [];

    $('#listaMediopago tr').each(function () {
      let fila = $(this);
      let mediospago = {
        id: fila.find('td').eq(0).text(),
        valor: fila.find('td.ocultar').eq(0).text(),
        Pago: fila.find('td').eq(2).text(),
        Banco: fila.find('td.ocultar').eq(1).text(),
        Titular: fila.find('td').eq(4).text(),
        Corriente: fila.find('td').eq(5).text(),
        Interbancaria: fila.find('td').eq(6).text(),
        Boleta: fila.find('td.ocultar').eq(2).text(),
        Factura: fila.find('td.ocultar').eq(3).text(),
        Recibo: fila.find('td.ocultar').eq(4).text(),
        Local: fila.find('td.ocultar').eq(5).text(),
        Departamental: fila.find('td.ocultar').eq(6).text(),
        Internacional: fila.find('td.ocultar').eq(7).text()
      };
      listamediospago.push(mediospago);
    });

    let mediospagoJSON = JSON.stringify(listamediospago);

    let lst_mediospago = mediospagoJSON;


    //****informacion del reconocimiento */

    let listareconocimientos = [];

    $('#listaReconocimiento tr').each(function () {
      let fila = $(this);
      let reconocimientos = {
        id: fila.find('td').eq(0).text(),
        Título: fila.find('td').eq(1).text(),
        Entidad: fila.find('td').eq(2).text(),
        Descripcion: fila.find('td').eq(3).text()
      };
      listareconocimientos.push(reconocimientos);
    });

    let reconocimientosJSON = JSON.stringify(listareconocimientos);

    let lst_reconocimientos = reconocimientosJSON;




    let usuario = "";//$('#usuario').val();
    let clave = "";//$('#contrasena').val();

    // Aquí puedes enviar videosJSON al servidor o hacer algo con él
    //alert('Costos guardados en JSON:\n' + costosJSON);
    /****fin */
    let listavideos = [];
    $('#videoList tr').each(function () {
      let fila = $(this);
      let imagen = {
        id: fila.find('td').eq(0).text(),
        nombre: fila.find('td').eq(1).text(),
        src: fila.find('a').attr('href'),
      };
      listavideos.push(imagen);
    });

    let videosJSON = JSON.stringify(listavideos);
    let lst_videos = videosJSON;


    // Aquí puedes enviar videosenlaceJSON al servidor o hacer algo con él
    //alert('Costos guardados en JSON:\n' + costosJSON);
    /****fin */
    let listavideosenlace = [];
    $('#videoList2 tr').each(function () {
      let fila = $(this);
      let imagen = {
        id: fila.find('td').eq(0).text(),
        nombre: fila.find('td').eq(1).text(),
        src: fila.find('a').attr('href'),
      };
      listavideosenlace.push(imagen);
    });

    let videosenlaceJSON = JSON.stringify(listavideosenlace);
    let lst_videoenlace = videosenlaceJSON;







    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas guardar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {


          showLoading()
          let resultlogin = await guardarUsuario({ usuarioid, usuario, nombre_completo: nombres + ' ' + apellidos, clave, rolid: 2, tipousuario: 2, estado: 1 });
          debugger
          if (resultlogin) {
            showToast('Se actualizo los datos correctamente')
            usuarioid = resultlogin.data.id
            let artesano = getDataFromLocalStorage('artesano')
            let result = await guardarArtesano({
              id: artesano.id, artesanoId: artesano.id, dni, ruc, nombres, apellidos, correo, celular, lugar_nacimiento, ubigeo
              , lengua_materna, foto1, foto2, lst_taller, lst_especialidadtecnicas, lst_contactos, lst_mediospago, lst_reconocimientos
              , usuario_id: usuarioid, lst_videoenlace, lst_videos
            });
            if (result) {

              showToast('Se actualizo los datos correctamente')

              if (artesanoId == 0) {
                const url = new URL(window.location.href);
                url.searchParams.set('id', result.id);
                window.history.pushState({}, '', url);
                artesanoId = result.id;
              }


              hideLoading()
              $('#myModal').css('display', 'none');
            } else {
              showToast('Ocurrio un error.')
            }
          } else {
            showToast('Ocurrio un error.')
          }

        } catch (error) {
          console.error('Error al eliminar la foto de perfil:', error);
        }
      }
    );


    //}
  })




}





// calcular precios 


async function editarArtesano (usuario_id) {

  let artesano = getDataFromLocalStorage('artesano')

  editarartesano = await geteditarArtesano(artesano.id);



  usuarioid = editarartesano.usuario_id;
  artesanoId = editarartesano.usuario_id;

  $('#dni').val(editarartesano.dni)
  $('#ruc').val(editarartesano.ruc)
  $('#nombres').val(editarartesano.nombres)
  $('#apellidos').val(editarartesano.apellidos)
  $('#correo').val(editarartesano.correo)
  $('#celular').val(editarartesano.celular)
  $('#lugar_nacimiento').val(editarartesano.lugar_nacimiento)

  /* $('#region').val(editarartesano.ubigeo.substring(0,2) ) 
   $('#provincia').val(editarartesano.ubigeo.substring(0,4)) 
   $('#distrito').val(editarartesano.ubigeo) */

  await llenarDpto();

  // Establecer el valor del select de región
  $('#region').val(editarartesano.ubigeo.substring(0, 2));

  // Llenar provincias basadas en la región seleccionada
  await llenarProv(editarartesano.ubigeo.substring(0, 2));

  // Establecer el valor del select de provincia
  $('#provincia').val(editarartesano.ubigeo.substring(0, 4));

  // Llenar distritos basados en la provincia seleccionada
  await llenarDist(editarartesano.ubigeo.substring(0, 4));

  // Establecer el valor del select de distrito
  $('#distrito').val(editarartesano.ubigeo);

  $('#lengua_materna').val(editarartesano.lengua_materna)
  document.getElementById('imagenFoto1').src = editarartesano.foto1
  document.getElementById('imagenFoto2').src = editarartesano.foto2


  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lsttaller2 = JSON.parse(editarartesano.lst_taller);
  const lsttaller = JSON.parse(lsttaller2);

  lsttaller.forEach(item => {

    $('#nombretaller').val(item.nombretaller),
      $('#horarioatencion').val(item.horarioatencion),
      $('#ructaller').val(item.ructaller),
      $('#direccionfisica').val(item.direccionfisica),
      $('#latitud').val(item.latitud),
      $('#longitud').val(item.longitud)

  });

  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const especialidad2 = JSON.parse(editarartesano.lst_especialidadtecnicas);
  const especialidad = JSON.parse(especialidad2);

  especialidad.forEach(item => {

    $('#descripcionhabilidades').val(item.descripcionhabilidades)
    $('#tipoartesania').val(item.tipoartesania)

    if (item.ceramica === 1) {
      document.getElementById('ceramica').checked = true;
    } else {
      document.getElementById('ceramica').checked = false;
    }
    if (item.piedra === 1) {
      document.getElementById('piedra').checked = true;
    } else {
      document.getElementById('piedra').checked = false;
    }
    if (item.talabarteria === 1) {
      document.getElementById('talabarteria').checked = true;
    } else {
      document.getElementById('talabarteria').checked = false;
    }

    var input = document.getElementById('desotro');
    if (item.otro === 1) {
      document.getElementById('otro').checked = true;
      input.disabled = false;
      $('#desotro').val(item.desotro)
    } else {
      document.getElementById('otro').checked = false;
      input.disabled = true;
    }


  });




  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lstcontactos2 = JSON.parse(editarartesano.lst_contactos);
  const lstcontactos = JSON.parse(lstcontactos2);

  lstcontactos.forEach(item => {
    contadorContacto++;
    let nuevaFila = `  
                  <tr>
                    <td>${contadorContacto}</td>
                    <td class="ocultar">${item.valor}</td> 
                    <td>${item.tipo}</td> 
                    <td>${item.Usuario}</td> 
                    <td>${item.Enlace}</td> 
                    <td>
                        <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Contacto">
                        <i class="icon icon-bin"></i>
                        </button> 
        
                    </td>
                </tr>

              `;
    document.getElementById('listaContacto').insertAdjacentHTML('beforeend', nuevaFila);
  });





  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lstmediospago2 = JSON.parse(editarartesano.lst_mediospago);
  const lstmediospago = JSON.parse(lstmediospago2);

  lstmediospago.forEach(item => {
    contadorMedioPago++;
    let nuevaFila = `   
                    <tr>
                      <td>${contadorMedioPago}</td>
                      <td class="ocultar">${item.valor}</td> 
                      <td>${item.Pago}</td> 
                      <td class="ocultar">${item.Banco}</td> 
                      <td>${item.Titular}</td> 
                      <td>${item.Corriente}</td> 
                      <td>${item.Interbancaria}</td>  
                      <td class="ocultar">${item.Boleta}</td> 
                      <td class="ocultar">${item.Factura}</td> 
                      <td class="ocultar">${item.Recibo}</td> 
                      <td class="ocultar">${item.Local}</td> 
                      <td class="ocultar">${item.Departamental}</td> 
                      <td class="ocultar">${item.Internacional}</td> 
                      <td>
                          <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-Mediopago">
                              <i class="icon icon-pencil"></i>
                          </button>
                          <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Mediopago">
                            <i class="icon icon-bin"></i>
                          </button> 
          
                      </td>
                </tr>

              `;
    document.getElementById('listaMediopago').insertAdjacentHTML('beforeend', nuevaFila);
  });


  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lstreconocimientos2 = JSON.parse(editarartesano.lst_reconocimientos);
  const lstreconocimientos = JSON.parse(lstreconocimientos2);

  lstreconocimientos.forEach(item => {
    contadorreconocimiento++;
    let nuevaFila = `   
                    <tr>
                        <td>${contadorreconocimiento}</td> 
                        <td class="titulo">${item.Título}</td> 
                        <td class="entidad">${item.Entidad}</td> 
                        <td class="descripcion">${item.Descripcion}</td>  
                        <td> 

                        <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-reconocimiento">
                                    <i class="icon icon-pencil"></i>
                        </button>
                        <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-reconocimiento">
                                  <i class="icon icon-bin"></i>
                        </button> 
            
                        </td>
                    </tr>

              `;
    document.getElementById('listaReconocimiento').insertAdjacentHTML('beforeend', nuevaFila);
  });


  /****Login */


  editarlogin = await geteditarLogin(editarartesano.usuario_id);

  $('#usuario').val(editarlogin.usuario)
  $('#contrasena').val(editarlogin.clave)
  $('#repetirContrasena').val(editarlogin.clave)

  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lstvideos1 = JSON.parse(editarartesano.lst_videos);
  const lstvideos = JSON.parse(lstvideos1);
  //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
  lstvideos.forEach(item => {
    videoCounter++;
    let nuevaFila = `
              <tr>
                  <td>${videoCounter}</td>
                  <td>${item.nombre}</td>
                  <td><a href="${item.src}" target="_blank">Video subido</a></td>
                  <td>
                      <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${item.src}">Ver</button>  
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video">
                      <i class="icon icon-bin"></i> 
                  </td>
              </tr>
              `;
    document.getElementById('videoList').insertAdjacentHTML('beforeend', nuevaFila);
  });


  // Parsear el JSON
  // Parsear el JSON y asegurarse de que es un arreglo
  const lstvideoenlace1 = JSON.parse(editarartesano.lst_videoenlace);
  const lstvideoenlace = JSON.parse(lstvideoenlace1);
  //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
  lstvideoenlace.forEach(item => {
    videoCounter2++;
    let nuevaFila = ` 
              <tr>
                  <td>${videoCounter2}</td>
                  <td>${item.nombre}</td>
                  <td><a href="${item.src}" target="_blank">${item.src}</a></td>
                  <td>
                      <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${item.src}">Ver</button> 
                      
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video1">
                      <i class="icon icon-bin"></i> 
                  </td>
              </tr>
              `;
    document.getElementById('videoList2').insertAdjacentHTML('beforeend', nuevaFila);
  });







}



const selectRegion = document.getElementById('region');
const selectProvincian = document.getElementById('provincia');
const selectDistrito = document.getElementById('distrito');

selectRegion.addEventListener('change', function () {
  var regionSelect = document.getElementById("region");

  // Obtener el valor seleccionado
  var iddepartamento = regionSelect.value;
  llenarProv(iddepartamento);
});

selectProvincian.addEventListener('change', function () {
  var provinciaSelect = document.getElementById("provincia");

  // Obtener el valor seleccionado
  var idprovincia = provinciaSelect.value;
  llenarDist(idprovincia);
});

// Función para obtener y llenar el select
async function llenarDpto () {

  try {
    // Obtener los datos asincrónicamente
    const llenardepartamentos = await llenardepartamento();
    // Limpiar opciones existentes en el select (si es necesario)
    selectRegion.innerHTML = '';

    // Agregar opción inicial "Seleccionar"
    let optionSeleccionar = document.createElement('option');
    optionSeleccionar.value = '0';
    optionSeleccionar.textContent = 'Seleccionar';
    selectRegion.appendChild(optionSeleccionar);

    // Iterar sobre el arreglo de regiones y agregar cada una como una opción
    llenardepartamentos.forEach(region => {
      let option = document.createElement('option');
      option.value = region.iddepartamento;
      option.textContent = region.departamento;
      selectRegion.appendChild(option);
    });
  } catch (error) {
    console.error('Error al llenar el select:', error);
  }
}

async function llenarProv (iddepartamento) {

  try {


    // Obtener los datos asincrónicamente
    const llenarprovincias = await llenarprovincia(iddepartamento);
    // Limpiar opciones existentes en el select (si es necesario)
    selectProvincian.innerHTML = '';

    // Agregar opción inicial "Seleccionar"
    let optionSeleccionar = document.createElement('option');
    optionSeleccionar.value = '0';
    optionSeleccionar.textContent = 'Seleccionar';
    selectProvincian.appendChild(optionSeleccionar);

    // Iterar sobre el arreglo de regiones y agregar cada una como una opción
    llenarprovincias.forEach(region => {
      let option = document.createElement('option');
      option.value = region.idprovincia;
      option.textContent = region.provincia;
      selectProvincian.appendChild(option);
    });
  } catch (error) {
    console.error('Error al llenar el select:', error);
  }
}


async function llenarDist (idprovincia) {

  try {


    // Obtener los datos asincrónicamente
    const llenardistritos = await llenardistrito(idprovincia);
    // Limpiar opciones existentes en el select (si es necesario)
    selectDistrito.innerHTML = '';

    // Agregar opción inicial "Seleccionar"
    let optionSeleccionar = document.createElement('option');
    optionSeleccionar.value = '0';
    optionSeleccionar.textContent = 'Seleccionar';
    selectDistrito.appendChild(optionSeleccionar);

    // Iterar sobre el arreglo de regiones y agregar cada una como una opción
    llenardistritos.forEach(region => {
      let option = document.createElement('option');
      option.value = region.ubigeo;
      option.textContent = region.distrito;
      selectDistrito.appendChild(option);
    });
  } catch (error) {
    console.error('Error al llenar el select:', error);
  }
}


$(document).ready(function () {

  llenarDpto();
  document.getElementById('guardarMediopagoBtn').style.display = 'inline-block';
  document.getElementById('editarMediopagoBtn').style.display = 'none';


  document.getElementById('guardarreconocimientoBtn').style.display = 'inline-block';
  document.getElementById('editarreconocimientoBtn').style.display = 'none';

  ///editar formulario
  /**const urlParams = new URLSearchParams(window.location.search);
    artesanoId = urlParams.get('id');*/
  let usuario = getDataFromLocalStorage('usuario');



  var titulo = document.getElementById("tituloartesano");


  if (usuario.id != 0) {
    titulo.innerText = "Datos Artesano";
    editarArtesano(usuario.id);
  } else {
    titulo.innerText = "Nuevo artesano";
  }




  /****** Contacto */


  $('#addcontactoButton').on('click', function () {


    let tiporedsocial = $('#tiporedsocial option:selected').val();



    let usuarionumero = $('#usuarionumero').val();
    let enlacecontacto = $('#enlacecontacto').val();

    if (tiporedsocial === "0") {
      showToast('Por favor de seleccionar tipo.');
      return;
    }
    if (usuarionumero === "") {
      showToast('Por favor, ingresar usuario / número.');
      return;
    }
    if (enlacecontacto === "") {
      showToast('Por favor, ingresar enlace de contacto.');
      return;
    }

    const selectElement = document.getElementById('tiporedsocial');
    const opciones = selectElement.options;
    let texto = $('#tiporedsocial option:selected').text();
    let valor = $('#tiporedsocial option:selected').val();
    // for (let i = 0; i < opciones.length; i++) {
    //   texto = opciones[i].text;
    //   valor = opciones[i].value;
    //   console.log(`Texto: ${texto}, Valor: ${valor}`);
    // }

    contadorContacto++;

    let nuevaFila = `
        <tr>
            <td>${contadorContacto}</td>
            <td class="ocultar">${valor}</td> 
            <td>${texto}</td> 
            <td>${usuarionumero}</td> 
            <td>${enlacecontacto}</td> 
            <td>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Contacto">
                <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;
    $('#listaContacto').append(nuevaFila);

    $('#tiporedsocial').val(0);
    $('#usuarionumero').val('');
    $('#enlacecontacto').val('');
  });

  $(document).on('click', '.btn-delete-Contacto', function () {

    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas eliminar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {

          $(this).closest('tr').remove();
          contadorContacto--;

          // Reordenar los números de la lista
          $('#listaContacto tr').each(function (index, tr) {
            $(tr).find('td:first').text(index + 1);
          });

        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    );

  });








  /****** Medio de Pago */


  $('#guardarMediopagoBtn').on('click', function () {


    let tipomediopago = $('#tipomediopago').val();



    let nombrebanco = $('#nombrebanco').val();
    let nombretitular = $('#nombretitular').val();
    let cuentacorriente = $('#cuentacorriente').val();
    let cuentainterbancaria = $('#cuentainterbancaria').val();
    let boleta = $('#boleta').is(':checked') ? 1 : 0;
    let factura = $('#factura').is(':checked') ? 1 : 0;
    let recibohonorario = $('#recibohonorario').is(':checked') ? 1 : 0;
    let local = $('#local').is(':checked') ? 1 : 0;
    let departamental = $('#departamental').is(':checked') ? 1 : 0;
    let internacional = $('#internacional').is(':checked') ? 1 : 0;


    if (tipomediopago === "0") {
      showToast('Por favor de seleccionar tipo.');
      return;
    }
    // if (nombrebanco === "" || nombretitular === "" || cuentacorriente === "" || cuentainterbancaria === "") {
    //   showToast('Por favor, todos los campos *.');
    //   return;
    // }

    /*const selectElement = document.getElementById('tipomediopago');
    const opciones = selectElement.options;
    let texto="";
    let valor="";
    for (let i = 0; i < opciones.length; i++) {
         texto = opciones[i].text;
         valor = opciones[i].value;
        console.log(`Texto: ${texto}, Valor: ${valor}`);
    }*/

    let valor = $('#tipomediopago').val();
    let texto = $('#tipomediopago option:selected').text();

    contadorMedioPago++;

    let nuevaFila = `
        <tr>
            <td>${contadorMedioPago}</td>
            <td class="ocultar">${valor}</td> 
            <td>${texto}</td> 
            <td class="ocultar">${nombrebanco}</td> 
            <td>${nombretitular}</td> 
            <td>${cuentacorriente}</td> 
            <td>${cuentainterbancaria}</td> 
            <td class="ocultar">${boleta}</td> 
            <td class="ocultar">${factura}</td> 
            <td class="ocultar">${recibohonorario}</td> 
            <td class="ocultar">${local}</td> 
            <td class="ocultar">${departamental}</td> 
            <td class="ocultar">${internacional}</td> 
            <td>
                <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-Mediopago">
                    <i class="icon icon-pencil"></i>
                </button>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Mediopago">
                <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;
    $('#listaMediopago').append(nuevaFila);



    $('#tipomediopago').val(0);
    $('#nombrebanco').val('');
    $('#nombretitular').val('');
    $('#cuentacorriente').val('');
    $('#cuentainterbancaria').val('');
    $('#boleta').prop('checked', false);
    $('#factura').prop('checked', false);
    $('#recibohonorario').prop('checked', false);
    $('#local').prop('checked', false);
    $('#departamental').prop('checked', false);
    $('#internacional').prop('checked', false);



    $('#addmediopagoModal').modal('hide');

  });

  var estadomediopago = 0;
  var titulomediopago = document.getElementById("addmediopagoModalLabel");
  $('#addmediopagoModal').on('shown.bs.modal', function () {
    // Limpiar los campos
    if (estadomediopago !== 1) {
      $('#tituloreconocimiento').val('');
      $('#entidadreconoce').val('');
      $('#descripcionreconocimiento').val('');


      // Obtener el título 

      // Cambiar el título según lo necesites
      // Ejemplo: Cambiar a "Nuevo reconocimiento"
      titulomediopago.innerText = "Nuevo medio de pago";
    }
  });

  $('#addmediopagoModal').on('hide.bs.modal', function () {
    // Limpiar los campos 

    $('#tipomediopago').val(0);
    $('#nombrebanco').val('');
    $('#nombretitular').val('');
    $('#cuentacorriente').val('');
    $('#cuentainterbancaria').val('');
    $('#boleta').prop('checked', false);
    $('#factura').prop('checked', false);
    $('#recibohonorario').prop('checked', false);
    $('#local').prop('checked', false);
    $('#departamental').prop('checked', false);
    $('#internacional').prop('checked', false);
    estadomediopago = 0;

    // Obtener el título


    // Cambiar el título según lo necesites
    // Ejemplo: Cambiar a "Nuevo reconocimiento"
    titulomediopago.innerText = "Nuevo medio de pago";
  });


  // Delegar el evento de clic para el botón editar
  $('#listaMediopago').on('click', '.btn-edit-Mediopago', function () {
    filaActual = $(this).closest('tr');
    let valor = filaActual.find('td:eq(1)').text();
    let texto = filaActual.find('td:eq(2)').text();
    let nombrebanco = filaActual.find('td:eq(3)').text();
    let nombretitular = filaActual.find('td:eq(4)').text();
    let cuentacorriente = filaActual.find('td:eq(5)').text();
    let cuentainterbancaria = filaActual.find('td:eq(6)').text();
    let boleta = filaActual.find('td:eq(7)').text();
    let factura = filaActual.find('td:eq(8)').text();
    let recibohonorario = filaActual.find('td:eq(9)').text();
    let local = filaActual.find('td:eq(10)').text();
    let departamental = filaActual.find('td:eq(11)').text();
    let internacional = filaActual.find('td:eq(12)').text();

    $('#tipomediopago').val(valor);
    $('#nombrebanco').val(nombrebanco);
    $('#nombretitular').val(nombretitular);
    $('#cuentacorriente').val(cuentacorriente);
    $('#cuentainterbancaria').val(cuentainterbancaria);

    if (boleta == 1) {
      document.getElementById('boleta').checked = true;
    } else {
      document.getElementById('boleta').checked = false;
    }
    if (factura == 1) {
      document.getElementById('factura').checked = true;
    } else {
      document.getElementById('factura').checked = false;
    }
    if (recibohonorario == 1) {
      document.getElementById('recibohonorario').checked = true;
    } else {
      document.getElementById('recibohonorario').checked = false;
    }
    if (local == 1) {
      document.getElementById('local').checked = true;
    } else {
      document.getElementById('local').checked = false;
    }
    if (departamental == 1) {
      document.getElementById('departamental').checked = true;
    } else {
      document.getElementById('departamental').checked = false;
    }
    if (internacional == 1) {
      document.getElementById('internacional').checked = true;
    } else {
      document.getElementById('internacional').checked = false;
    }


    document.getElementById('guardarMediopagoBtn').style.display = 'none';
    document.getElementById('editarMediopagoBtn').style.display = 'inline-block';


    titulomediopago.innerText = "Editar medio de pago";
    estadomediopago = 1;
    $('#addmediopagoModal').modal('show');

  });

  $(document).on('click', '.btn-delete-Mediopago', function () {

    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas eliminar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {

          $(this).closest('tr').remove();
          contadorMedioPago--;

          // Reordenar los números de la lista
          $('#listaMediopago tr').each(function (index, tr) {
            $(tr).find('td:first').text(index + 1);
          });

        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    );


  });

  $('#editarMediopagoBtn').on('click', function () {



    let nuevoValor = $('#tipomediopago').val();
    let nuevoTexto = $('#tipomediopago option:selected').text();



    let nuevoNombreBanco = $('#nombrebanco').val();
    let nuevoNombreTitular = $('#nombretitular').val();
    let nuevaCuentaCorriente = $('#cuentacorriente').val();
    let nuevaCuentaInterbancaria = $('#cuentainterbancaria').val();
    let nuevaBoleta = $('#boleta').is(':checked') ? 1 : 0;
    let nuevaFactura = $('#factura').is(':checked') ? 1 : 0;
    let nuevoReciboHonorario = $('#recibohonorario').is(':checked') ? 1 : 0;
    let nuevoLocal = $('#local').is(':checked') ? 1 : 0;
    let nuevoDepartamental = $('#departamental').is(':checked') ? 1 : 0;
    let nuevoInternacional = $('#internacional').is(':checked') ? 1 : 0;


    filaActual.find('td:eq(1)').text(nuevoValor);
    filaActual.find('td:eq(2)').text(nuevoTexto);
    filaActual.find('td:eq(3)').text(nuevoNombreBanco);
    filaActual.find('td:eq(4)').text(nuevoNombreTitular);
    filaActual.find('td:eq(5)').text(nuevaCuentaCorriente);
    filaActual.find('td:eq(6)').text(nuevaCuentaInterbancaria);
    filaActual.find('td:eq(7)').text(nuevaBoleta);
    filaActual.find('td:eq(8)').text(nuevaFactura);
    filaActual.find('td:eq(9)').text(nuevoReciboHonorario);
    filaActual.find('td:eq(10)').text(nuevoLocal);
    filaActual.find('td:eq(11)').text(nuevoDepartamental);
    filaActual.find('td:eq(12)').text(nuevoInternacional);


    document.getElementById('guardarMediopagoBtn').style.display = 'inline-block';
    document.getElementById('editarMediopagoBtn').style.display = 'none';


    $('#tipomediopago').val(0);
    $('#nombrebanco').val('');
    $('#nombretitular').val('');
    $('#cuentacorriente').val('');
    $('#cuentainterbancaria').val('');
    $('#boleta').prop('checked', false);
    $('#factura').prop('checked', false);
    $('#recibohonorario').prop('checked', false);
    $('#local').prop('checked', false);
    $('#departamental').prop('checked', false);
    $('#internacional').prop('checked', false);

    $('#addmediopagoModal').modal('hide');
    estadomediopago = 0;
  });



  /****** Reconocimiento */


  $('#guardarreconocimientoBtn').on('click', function () {


    let tituloreconocimiento = $('#tituloreconocimiento').val();
    let entidadreconoce = $('#entidadreconoce').val();
    let descripcionreconocimiento = $('#descripcionreconocimiento').val();


    if (tituloreconocimiento === "" || entidadreconoce === "" || descripcionreconocimiento === "") {
      showToast('Por favor, todos los campos *.');
      return;
    }


    contadorreconocimiento++;

    let nuevaFila = `
        <tr>
            <td>${contadorreconocimiento}</td> 
            <td class="titulo">${tituloreconocimiento}</td> 
            <td class="entidad">${entidadreconoce}</td> 
            <td class="descripcion">${descripcionreconocimiento}</td>  
            <td>
                  <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-reconocimiento">
                            <i class="icon icon-pencil"></i>
                 </button>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-reconocimiento">
                      <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;
    $('#listaReconocimiento').append(nuevaFila);


    $('#tituloreconocimiento').val('');
    $('#entidadreconoce').val('');
    $('#descripcionreconocimiento').val('');
    $('#addreconocimmientoModal').modal('hide');

  });

  let filaActual;
  var addreconocimmientoModal = document.getElementById("addreconocimmientoModalLabel");
  var estadoreconocimmiento = 0;
  // Delegar el evento de clic para el botón editar
  $('#listaReconocimiento').on('click', '.btn-edit-reconocimiento', function () {
    filaActual = $(this).closest('tr');
    let titulo = filaActual.find('.titulo').text();
    let entidad = filaActual.find('.entidad').text();
    let descripcion = filaActual.find('.descripcion').text();

    $('#tituloreconocimiento').val(titulo);
    $('#entidadreconoce').val(entidad);
    $('#descripcionreconocimiento').val(descripcion);


    document.getElementById('guardarreconocimientoBtn').style.display = 'none';
    document.getElementById('editarreconocimientoBtn').style.display = 'inline-block';

    $('#addreconocimmientoModal').modal('show');

    addreconocimmientoModal.innerText = "Editar Reconocimiento";
    estadoreconocimmiento = 1;

  });

  $(document).on('click', '.btn-delete-reconocimiento', function () {



    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas eliminar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {

          $(this).closest('tr').remove();
          contadorMedioPago--;

          // Reordenar los números de la lista
          $('#listaReconocimiento tr').each(function (index, tr) {
            $(tr).find('td:first').text(index + 1);
          });

        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    );



  });

  $('#addreconocimmientoModal').on('shown.bs.modal', function () {
    // Limpiar los campos
    if (estadoreconocimmiento !== 1) {
      $('#tituloreconocimiento').val('');
      $('#entidadreconoce').val('');
      $('#descripcionreconocimiento').val('');

      // Obtener el título
      var titulo = document.getElementById("addreconocimmientoModalLabel");

      // Cambiar el título según lo necesites
      // Ejemplo: Cambiar a "Nuevo reconocimiento"
      titulo.innerText = "Nuevo reconocimiento";
    }
  });

  $('#addreconocimmientoModal').on('hide.bs.modal', function () {
    // Limpiar los campos 
    $('#tituloreconocimiento').val('');
    $('#entidadreconoce').val('');
    $('#descripcionreconocimiento').val('');
    estadoreconocimmiento = 0;

    // Obtener el título
    var titulo = document.getElementById("addreconocimmientoModalLabel");

    // Cambiar el título según lo necesites
    // Ejemplo: Cambiar a "Nuevo reconocimiento"
    titulo.innerText = "Nuevo reconocimiento";
  });

  $('#editarreconocimientoBtn').on('click', function () {

    let nuevoTitulo = $('#tituloreconocimiento').val();
    let nuevaEntidad = $('#entidadreconoce').val();
    let nuevaDescripcion = $('#descripcionreconocimiento').val();

    filaActual.find('.titulo').text(nuevoTitulo);
    filaActual.find('.entidad').text(nuevaEntidad);
    filaActual.find('.descripcion').text(nuevaDescripcion);

    document.getElementById('guardarreconocimientoBtn').style.display = 'inline-block';
    document.getElementById('editarreconocimientoBtn').style.display = 'none';


    $('#tituloreconocimiento').val('');
    $('#entidadreconoce').val('');
    $('#descripcionreconocimiento').val('');

    $('#addreconocimmientoModal').modal('hide');
    estadoreconocimmiento = 0;

  });









  /******foto 1 */
  $('#guardarPrincipalBtn').on('click', function () {
    let principalImageSrc = $('#principalImagePreview').attr('src');
    let principalImageName = $('#principalImageName').val();

    let imageName = $('#imageName').val();
    let imageSrc = $('#imagePreview').attr('src');


    if (!principalImageSrc || !principalImageName) {
      showToast('Por favor, suba una imagen.');
      return;
    }

    $('#imagenFoto1').attr('src', principalImageSrc);
    $('#imagenFoto1Modal').modal('hide');
    $('#imagenPrincipalForm')[0].reset();
    $('#principalImagePreview').hide();
  });


  $('#limpiarFoto1Btn').on('click', function () {
    $('#imagenFoto1').attr('src', '/img/sin_imagen.jpg');
  });

  /******foto 2 */
  $('#guardarPrincipal2Btn').on('click', function () {
    let principalImage2Src = $('#principalImage2Preview').attr('src');
    let principalImage2Name = $('#principalImage2Name').val();

    let imageName = $('#imageName').val();
    let imageSrc = $('#imagePreview').attr('src');


    if (!principalImage2Src || !principalImage2Name) {

      showToast('Por favor, suba una imagen.');
      // alert("Por favor, suba una imagen.");
      return;
    }

    $('#imagenFoto2').attr('src', principalImage2Src);
    $('#imagenFoto2Modal').modal('hide');
    $('#imagenPrincipal2Form')[0].reset();
    $('#principalImage2Preview').hide();
  });


  $('#limpiarFoto2Btn').on('click', function () {
    $('#imagenFoto2').attr('src', '/img/sin_imagen.jpg');
  });







  /******  videos */

  let videoStorage = {}; // Almacena los videos cargados

  $('#addVideoLink').on('click', function () {

    let videoName = $('#linkVideoName').val();
    let videoLink = $('#videoLink').val();

    if (!videoName || !videoLink) {
      showToast('Por favor, complete todos los campos *.');
      //alert("Por favor, complete todos los campos *.");
      return;
    }

    var urlInput = document.getElementById('videoLink').value;
    var message = document.getElementById('message');
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9]{1,}\\.)?[a-zA-Z0-9]{2,}\\.[a-zA-Z]{2,})|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // port and path
      '(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // query string
      '(\\#[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$', 'i'); // fragment locator

    if (!urlPattern.test(urlInput)) {
      showToast('URL no válida.');
      $('#videoLink').val("");
      return;
    }


    videoCounter2++;

    let newRow = `
          <tr>
              <td>${videoCounter2}</td>
              <td>${videoName}</td>
              <td><a href="${videoLink}" target="_blank">${videoLink}</a></td>
              <td>
                  <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${videoLink}">Ver</button> 
                  
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video1">
                  <i class="icon icon-bin"></i> 
              </td>
          </tr>
      `;

    $('#videoList2').append(newRow);
    $('#linkForm')[0].reset();
  });

  $(document).on('click', '.btn-delete-video1', function () {
    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas eliminar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {

          $(this).closest('tr').remove();
          contadorImagenes--;
          // Reordenar los números de la lista
          $('#videoList2 tr').each(function (index, tr) {
            $(tr).find('td:first').text(index + 1);
          });

        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    );

  });


  $(document).on('click', '.btn-view-video', function () {
    let videoLink = $(this).data('link');
    let embedLink = videoLink;

    if (videoLink.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(videoLink).search);
      const videoId = urlParams.get('v');
      embedLink = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoLink.includes('youtu.be')) {
      const videoId = videoLink.split('/').pop();
      embedLink = `https://www.youtube.com/embed/${videoId}`;
    }

    $('#videoPlayer').attr('src', embedLink);
    $('#videoModal').modal('show');
  });

  $('#videoModal').on('hidden.bs.modal', function () {
    $('#videoPlayer').attr('src', ''); // Limpiar el src del iframe cuando se cierre el modal
  });

  $('#uploadVideo').on('change', function () {
    let file = $(this).prop('files')[0];
    if (file) {
      let fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      $('#fileSize').text(`${fileSizeMB}mb`);
      if (file.size > 100 * 1024 * 1024) { // 100MB
        $('#uploadProgress').addClass('bg-danger').text('100%');
        $('#uploadProgress').css('width', '100%');
      } else {
        let progress = (file.size / (100 * 1024 * 1024) * 100).toFixed(0); // Percentage
        $('#uploadProgress').removeClass('bg-danger').addClass('bg-success').text(`${progress}%`);
        $('#uploadProgress').css('width', `${progress}%`);
      }
    } else {
      $('#fileSize').text('100mb');
      $('#uploadProgress').removeClass('bg-danger bg-success').text('0%');
      $('#uploadProgress').css('width', '0%');
    }
  });

  $('#cancelUpload').on('click', function () {
    $('#uploadVideo').val('');
    $('#fileSize').text('100mb');
    $('#uploadProgress').removeClass('bg-danger bg-success').text('0%');
    $('#uploadProgress').css('width', '0%');
  });


  $('#registerVideo').on('click', function () {
    let videoName = $('#videoName').val();
    let videoFile = $('#uploadVideo').prop('files')[0];

    if (!videoName || !videoFile) {
      showToast('Por favor, complete todos los campos *.');
      //alert("Por favor, complete todos los campos *.");
      return;
    }

    if (videoFile.size > 100 * 1024 * 1024) { // 100MB
      showToast('El archivo no debe pesar más de 100mb.');
      //alert("El archivo no debe pesar más de 100mb");
      return;
    }

    videoCounter++;

    // Aquí puedes enviar imagenesprincipalJSON al servidor o hacer algo con él
    //alert('Costos guardados en JSON:\n' + costosJSON);
    /****fin */
    var videoPreview = document.getElementById('videoPreview');

    // Obtener el valor del atributo src
    var video_Preview = videoPreview.src;
    let videoURL = video_Preview;
    //let videoURL = URL.createObjectURL(videoFile);
    videoStorage[videoCounter] = videoURL; // Almacena la URL del video

    let newRow = `
          <tr>
              <td>${videoCounter}</td>
              <td>${videoName}</td>
              <td><a href="${videoURL}" target="_blank">Video subido</a></td>
              <td>
                  <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${videoURL}">Ver</button>  
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video">
                  <i class="icon icon-bin"></i> 
              </td>
          </tr>
      `;

    $('#videoList').append(newRow);
    $('#videoForm')[0].reset();
    $('#fileSize').text('100mb');
    $('#uploadProgress').removeClass('bg-danger bg-success').text('0%');
    $('#uploadProgress').css('width', '0%');
  });


  $(document).on('click', '.btn-delete-video', function () {


    alertDialog.createAlertDialog(
      'confirm',
      'Confirmar Alerta',
      '¿Estás seguro de que deseas eliminar?',
      'Cancelar',
      'Continuar',
      async () => {
        try {

          $(this).closest('tr').remove();
          contadorImagenes--;

          // Reordenar los números de la lista
          $('#videoList tr').each(function (index, tr) {
            $(tr).find('td:first').text(index + 1);
          });

        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    );



  });





});

/******foto 1 */
document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
    fileInputId: 'uploadPrincipalImage',
    progressBarId: 'progressBar',
    statusElementId: 'status',
    uploadUrl: baseUrl + '/artesano/fileupload',
    callback: handleUploadResponseimgprincipal,
    folder: '/artesano/img/'
  });
});



function handleUploadResponseimgprincipal (response) {

  let file = $('#uploadPrincipalImage').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#principalImagePreview').attr('src', getBaseUrl(baseUrl) + '/' + response.path).show();
      $('#principalImageName').val(file.name);
    }
    reader.readAsDataURL(file);
    showToast('registro correcto.');
  } else {

    showToast('Por favor, seleccione un archivo para visualizar.');
    //alert("Por favor, seleccione un archivo para visualizar.");
  }

}


/******foto 2 */
document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
    fileInputId: 'uploadPrincipal2Image',
    progressBarId: 'progressBar2',
    statusElementId: 'status',
    uploadUrl: baseUrl + '/artesano/fileupload',
    callback: handleUploadResponseimgprincipal2,
    folder: '/artesano/img/'
  });
});


function handleUploadResponseimgprincipal2 (response) {

  let file = $('#uploadPrincipal2Image').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#principalImage2Preview').attr('src', getBaseUrl(baseUrl) + '/' + response.path).show();
      $('#principalImage2Name').val(file.name);
    }
    reader.readAsDataURL(file);
    showToast('registro correcto.');
  } else {
    showToast('Por favor, seleccione un archivo para visualizar.');
  }

}

document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
    fileInputId: 'uploadVideo',
    progressBarId: 'progressBar',
    statusElementId: 'status',
    uploadUrl: baseUrl + '/producto/fileupload',
    callback: handleUploadResponselistavideo,
    folder: '/producto/video/',
  });
});
function handleUploadResponselistavideo (response) {

  $('#videoPreview').attr('src', getBaseUrl(baseUrl) + '/' + response.path).show();

}


//carga de imagen de perfil de cliente
function initializeFileUploader ({ fileInputId, progressBarId, statusElementId, uploadUrl, folder, callback }) {

  const fileInput = document.getElementById(fileInputId);
  const inputName = fileInput.name;
  const progressBar = document.getElementById(progressBarId);
  const statusElement = document.getElementById(statusElementId);

  if (fileInput && progressBar && statusElement) {
    const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName, folder);
    uploader.attachToFileInput(fileInput);
  } else {
    console.error('Initialization failed: One or more elements not found.');
  }
}




// Obtener referencias a los elementos del DOM
const dniElement = document.getElementById('dni');
const nombresElement = document.getElementById('nombres');
const apellidosElement = document.getElementById('apellidos');

// Añadir un evento para actualizar el precio con descuento cuando el usuario ingrese un valor
dniElement.addEventListener('input', async function () {
  // Obtener el valor del porcentaje de descuento ingresado
  const dniValue = dniElement.value.trim(); // Trim para eliminar espacios en blanco al inicio y al final
  let valor = dniValue.length;
  if (valor == 8) {
    // Asume que buscarDNI es una función que retorna una promesa
    const artesanosDNI = await buscarDNI(dniValue);

    if (artesanosDNI != null) {
      nombresElement.value = artesanosDNI.nombres;
      apellidosElement.value = artesanosDNI.apellidoPaterno + ' ' + artesanosDNI.apellidoMaterno;
    } else {

      showToast('El DNI no esta registrado en reniec')

      $('#nombres').val('');
      $('#apellidos').val('');
    }
  }
  // Aquí puedes usar artesanosDNI como lo necesites 
});


document.getElementById('otro').addEventListener('change', function () {
  var checkbox = this;
  var input = document.getElementById('desotro');
  input.disabled = !checkbox.checked;
  $('#desotro').val('');
});