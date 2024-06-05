import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { FileUploader } from '../utils/upload.js';
import { guardarUsuario,geteditarArtesano, geteditarLogin, deleteUserCapacitacion, guardarArtesano, nuevoUserCapacitacion,buscarDNI } from './api';
import { showLoading, hideLoading, checkSession } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config'
import { showToast } from '../utils/toast';
import '../artesanos-detalle/style.css'
hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menuadmin.html', container: 'app-side' },
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
  checkadminsession(); 
  buscarUsuario();
  exportarExcel();
  nuevo();

}
async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}

 
 

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
 
var artesanoId=0;
var usuarioid=0;

 
let contadorContacto = 0; 
let contadorMedioPago = 0; 
let contadorreconocimiento = 0; 
let validar = 0; 

var editarartesano = null;
var editarlogin = null;
 


async function buscarUsuario () { 
  

/*********** */
  $('#btnguardarcambio').on('click', async function (e) {
    
  

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
      alert('Por favor, ingresa el DNI y todos los campos requeridos.');
      document.getElementById('dni').focus(); // Pone el foco en el campo del D
      
      return;
    } else   if (validar == "0" ) {
      alert("validar datos de usuario.");
      return;
    } else { 

      showLoading()
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
        ructaller: $('#ructaller').val() ,
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
        ceramica : $('#ceramica').is(':checked') ? 1 : 0, 
        piedra : $('#piedra').is(':checked') ? 1 : 0, 
        talabarteria : $('#talabarteria').is(':checked') ? 1 : 0, 
        otro : $('#otro').is(':checked') ? 1 : 0,
        desotro: $('#desotro').val()
    };
    listaespecialidad.push(especialidad);
 

let especialidadJSON = JSON.stringify(listaespecialidad);

let lst_especialidadtecnicas = especialidadJSON;



//****informacion del contacto */

let listacontacto = [];

$('#listaContacto tr').each(function() {
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

$('#listaMediopago tr').each(function() {
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

$('#listaReconocimiento tr').each(function() {
    let fila = $(this);
    let reconocimientos = {
        id: fila.find('td').eq(0).text(), 
        Título: fila.find('td').eq(1).text(),
        Entidad  : fila.find('td').eq(2).text(),
        Descripcion : fila.find('td').eq(3).text()
    };
    listareconocimientos.push(reconocimientos);
});

let reconocimientosJSON = JSON.stringify(listareconocimientos);

let lst_reconocimientos = reconocimientosJSON;


 
let usuario = $('#usuario').val(); 
let clave = $('#contrasena').val() ;


      let resultlogin = await guardarUsuario({ usuarioid,usuario,nombre_completo: nombres +' ' +apellidos,clave,rolid:2,tipousuario:2,estado:1  });
          if (resultlogin) {
            showToast('Se actualizo los datos correctamente')
            usuarioid=resultlogin.id

                let result = await guardarArtesano({ artesanoId,dni,ruc,nombres,apellidos,correo,celular,lugar_nacimiento,ubigeo,lengua_materna,foto1,foto2,lst_taller,lst_especialidadtecnicas,lst_contactos,lst_mediospago,lst_reconocimientos,usuario_id:usuarioid  });
                if (result) {
                  showToast('Se actualizo los datos correctamente')
        
                  if (artesanoId == 0) {
                    const url = new URL(window.location.href);
                    url.searchParams.set('id', result.id);
                    window.history.pushState({}, '', url);
                    artesanoId=result.id;
                  } 
                  
        
                  hideLoading()  
                  $('#myModal').css('display', 'none');
                } else {
                  showToast('Ocurrio un error.')
                }  
          } else {
            showToast('Ocurrio un error.')
          }    
      } 
    })

   


}

 
    
 

// calcular precios 

 
async function editarArtesano (id) {

  editarartesano =  await geteditarArtesano(id); 

      usuarioid=editarartesano.usuario_id


       $('#dni').val(editarartesano.dni)  
       $('#ruc').val(editarartesano.ruc) 
       $('#nombres').val(editarartesano.nombres) 
       $('#apellidos').val(editarartesano.apellidos) 
       $('#correo').val(editarartesano.correo) 
       $('#celular').val(editarartesano.celular)  
       $('#lugar_nacimiento').val(editarartesano.lugar_nacimiento) 
       $('#region').val(editarartesano.ubigeo.substring(0,2) ) 
       $('#provincia').val(editarartesano.ubigeo.substring(0,4)) 
       $('#distrito').val(editarartesano.ubigeo) 
       $('#lengua_materna').val(editarartesano.lengua_materna) 
       document.getElementById('imagenFoto1').src=editarartesano.foto1 
       document.getElementById('imagenFoto2').src=editarartesano.foto2  

        
 // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lsttaller2 = JSON.parse(editarartesano.lst_taller);
      const lsttaller = JSON.parse(lsttaller2); 

      lsttaller.forEach(item => {

          $('#nombretaller').val(item.nombretaller), 
          $('#horarioatencion').val(item.horarioatencion), 
          $('#ructaller').val(item.ructaller) ,
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

          if (item.ceramica===1){
            document.getElementById('ceramica').checked = true;  
          }else
          {
            document.getElementById('ceramica').checked = false;
          }
          if (item.piedra===1){
            document.getElementById('piedra').checked = true;  
          }else
          {
            document.getElementById('piedra').checked = false;
          }
          if (item.talabarteria===1){
            document.getElementById('talabarteria').checked = true;  
          }else
          {
            document.getElementById('talabarteria').checked = false;
          }
          if (item.otro===1){
            document.getElementById('otro').checked = true;  
          }else
          {
            document.getElementById('otro').checked = false;
          }
  
          $('#desotro').val(item.desotro)
          
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

        editarlogin =  await geteditarLogin(editarartesano.usuario_id); 

        $('#usuario').val(editarlogin.usuario) 
        $('#contrasena').val(editarlogin.clave) 
        $('#repetirContrasena').val(editarlogin.clave) 

}

 
$(document).ready(function() {

 
  document.getElementById('guardarMediopagoBtn').style.display = 'inline-block';
  document.getElementById('editarMediopagoBtn').style.display = 'none';

  
  document.getElementById('guardarreconocimientoBtn').style.display = 'inline-block';
  document.getElementById('editarreconocimientoBtn').style.display = 'none';

 ///editar formulario
 const urlParams = new URLSearchParams(window.location.search);
   artesanoId = urlParams.get('id');
 if(artesanoId!=0)
  { 
    editarArtesano(artesanoId);
  }
   



  /****** Contacto */
 

  $('#addcontactoButton').on('click', function() { 
 
     
    let tiporedsocial = $('#tiporedsocial').val();  

  

    let usuarionumero = $('#usuarionumero').val();  
    let enlacecontacto = $('#enlacecontacto').val();  

    if (tiporedsocial === "0" ) {
      alert("Por favor de seleccionar tipo.");
      return;
    } 
    if (usuarionumero === "" ) {
        alert("Por favor, ingresar usuario / número.");
        return;
    }
    if (enlacecontacto === "" ) {
      alert("Por favor, ingresar enlace de contacto");
        return;
    }

    const selectElement = document.getElementById('tiporedsocial');
    const opciones = selectElement.options;
    let texto="";
    let valor="";
    for (let i = 0; i < opciones.length; i++) {
         texto = opciones[i].text;
         valor = opciones[i].value;
        console.log(`Texto: ${texto}, Valor: ${valor}`);
    }
   
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

$(document).on('click', '.btn-delete-Contacto', function() {
    $(this).closest('tr').remove();
    contadorContacto--;

    // Reordenar los números de la lista
    $('#listaContacto tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
});








  /****** Medio de Pago */
 

  $('#guardarMediopagoBtn').on('click', function() { 
 
     
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
    

    if (tipomediopago === "0" ) {
      alert("Por favor de seleccionar tipo.");
      return;
    } 
    if (nombrebanco === "" || nombretitular === "" || cuentacorriente === ""  || cuentainterbancaria === "" ) {
        alert("Por favor, toda la información.");
        return;
    } 

    /*const selectElement = document.getElementById('tipomediopago');
    const opciones = selectElement.options;
    let texto="";
    let valor="";
    for (let i = 0; i < opciones.length; i++) {
         texto = opciones[i].text;
         valor = opciones[i].value;
        console.log(`Texto: ${texto}, Valor: ${valor}`);
    }*/

    let valor =  $('#tipomediopago').val();  
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


// Delegar el evento de clic para el botón editar
$('#listaMediopago').on('click', '.btn-edit-Mediopago', function() {
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

  if (boleta==1){
    document.getElementById('boleta').checked = true;  
  }else
  {
    document.getElementById('boleta').checked = false;
  }
  if (factura==1){
    document.getElementById('factura').checked = true;  
  }else
  {
    document.getElementById('factura').checked = false;
  }
  if (recibohonorario==1){
    document.getElementById('recibohonorario').checked = true;  
  }else
  {
    document.getElementById('recibohonorario').checked = false;
  }
  if (local==1){
    document.getElementById('local').checked = true;  
  }else
  {
    document.getElementById('local').checked = false;
  }
  if (departamental==1){
    document.getElementById('departamental').checked = true;  
  }else
  {
    document.getElementById('departamental').checked = false;
  }
  if (internacional==1){
    document.getElementById('internacional').checked = true;  
  }else
  {
    document.getElementById('internacional').checked = false;
  } 
 

  document.getElementById('guardarMediopagoBtn').style.display = 'none';
  document.getElementById('editarMediopagoBtn').style.display = 'inline-block';

  $('#addmediopagoModal').modal('show');
});

$(document).on('click', '.btn-delete-Mediopago', function() {
    $(this).closest('tr').remove();
    contadorMedioPago--;

    // Reordenar los números de la lista
    $('#listaMediopago tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
});

$('#editarMediopagoBtn').on('click', function() {  

  
 
  let nuevoValor =  $('#tipomediopago').val();  
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
});



  /****** Reconocimiento */
 

  $('#guardarreconocimientoBtn').on('click', function() { 
 
     
    let tituloreconocimiento = $('#tituloreconocimiento').val();  
    let entidadreconoce = $('#entidadreconoce').val();  
    let descripcionreconocimiento = $('#descripcionreconocimiento').val();  

    
    if (tituloreconocimiento === "" || entidadreconoce === "" || descripcionreconocimiento === ""   ) {
        alert("Por favor, toda la información.");
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
// Delegar el evento de clic para el botón editar
$('#listaReconocimiento').on('click', '.btn-edit-reconocimiento', function() {
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
});

$(document).on('click', '.btn-delete-reconocimiento', function() {
    $(this).closest('tr').remove();
    contadorMedioPago--;

    // Reordenar los números de la lista
    $('#listaReconocimiento tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
}); 


$('#editarreconocimientoBtn').on('click', function() {  

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
});









/******foto 1 */
  $('#guardarPrincipalBtn').on('click', function() {
    let principalImageSrc = $('#principalImagePreview').attr('src');
    let principalImageName = $('#principalImageName').val();

    let imageName = $('#imageName').val();
    let imageSrc = $('#imagePreview').attr('src'); 
    

    if (!principalImageSrc || !principalImageName) {
        alert("Por favor, suba una imagen.");
        return;
    }

    $('#imagenFoto1').attr('src', principalImageSrc);
    $('#imagenFoto1Modal').modal('hide');
    $('#imagenPrincipalForm')[0].reset();
    $('#principalImagePreview').hide();
  });
 

  $('#limpiarFoto1Btn').on('click', function() {
    $('#imagenFoto1').attr('src', 'placeholder.png');
  });

  /******foto 2 */
  $('#guardarPrincipal2Btn').on('click', function() {
    let principalImage2Src = $('#principalImage2Preview').attr('src');
    let principalImage2Name = $('#principalImage2Name').val();

    let imageName = $('#imageName').val();
    let imageSrc = $('#imagePreview').attr('src'); 
    

    if (!principalImage2Src || !principalImage2Name) {
        alert("Por favor, suba una imagen.");
        return;
    }

    $('#imagenFoto2').attr('src', principalImage2Src);
    $('#imagenFoto2Modal').modal('hide');
    $('#imagenPrincipal2Form')[0].reset();
    $('#principalImage2Preview').hide();
  });
 

  $('#limpiarFoto2Btn').on('click', function() {
    $('#imagenFoto2').attr('src', 'placeholder.png');
  });

});
 
/******foto 1 */
document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
      fileInputId: 'uploadPrincipalImage',
      progressBarId: 'progressBar',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileuploadimg',
      callback: handleUploadResponseimgprincipal
  });
});
 

function handleUploadResponseimgprincipal (response) { 

  let file = $('#uploadPrincipalImage').prop('files')[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#principalImagePreview').attr('src', 'http://localhost:3001/'+response.ruta).show();
            $('#principalImageName').val(file.name); 
        }
        reader.readAsDataURL(file); 
        alert('registro correcto')
    } else {
        alert("Por favor, seleccione un archivo para visualizar.");
    }
 
}

/******foto 2 */
document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
      fileInputId: 'uploadPrincipal2Image',
      progressBarId: 'progressBar2',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileuploadimg',
      callback: handleUploadResponseimgprincipal2
  });
});
 

function handleUploadResponseimgprincipal2 (response) { 

  let file = $('#uploadPrincipal2Image').prop('files')[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#principalImage2Preview').attr('src', 'http://localhost:3001/'+response.ruta).show();
            $('#principalImage2Name').val(file.name); 
        }
        reader.readAsDataURL(file); 
        alert('registro correcto')
    } else {
        alert("Por favor, seleccione un archivo para visualizar.");
    }
 
}
/******Generarl para la carga */
function initializeFileUploader ({ fileInputId, progressBarId, statusElementId, uploadUrl, callback }) {

  const fileInput = document.getElementById(fileInputId);
  const inputName = fileInput.name;
  const progressBar = document.getElementById(progressBarId);
  const statusElement = document.getElementById(statusElementId);

  if (fileInput && progressBar && statusElement) {
      const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName);
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
dniElement.addEventListener('input', async function() {
    // Obtener el valor del porcentaje de descuento ingresado
    const dniValue = parseFloat(dniElement.value);

    // Asume que buscarDNI es una función que retorna una promesa
    const artesanosDNI = await buscarDNI(dniValue);

    if (artesanosDNI != null) {  
        nombresElement.value = artesanosDNI.nombres;
        apellidosElement.value = artesanosDNI.apellidoPaterno + ' ' + artesanosDNI.apellidoMaterno;
    }
    // Aquí puedes usar artesanosDNI como lo necesites 
});

document.getElementById("registroForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el envío predeterminado del formulario

  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById("contrasena").value;
  var repetirContrasena = document.getElementById("repetirContrasena").value;
  var usuarioError = document.getElementById("usuarioError");
  var contrasenaError = document.getElementById("contrasenaError");
  var repetirContrasenaError = document.getElementById("repetirContrasenaError");
  var errores = false;

   
  // Validar usuario
  if (usuario.trim() === "") {
    
    showToast('El campo usuario es obligatorio')
    //usuarioError.textContent = "El campo usuario es obligatorio";
    errores = true; 
    validar=0;
    return;
} else if (!/^\w+$/.test(usuario)) {
  
  showToast('El usuario solo puede contener letras, números y guiones bajos')
    //usuarioError.textContent = "El usuario solo puede contener letras, números y guiones bajos";
    errores = true; 
    validar=0;
    return;
} else {
    usuarioError.textContent = "";
}

  // Validar contraseña
  if (contrasena.trim() === "") {
    
    showToast('El campo contraseña es obligatorio')
      //contrasenaError.textContent = "El campo contraseña es obligatorio";
      errores = true; 
      validar=0;
      return;
 
  } else if (!/^\w+$/.test(contrasena)) {
    
    showToast('El contraseña solo puede contener letras, números y guiones bajos')
      //usuarioError.textContent = "El usuario solo puede contener letras, números y guiones bajos";
      errores = true; 
      validar=0;
      return;
  }  else {
      contrasenaError.textContent = "";
  }

  // Validar repetir contraseña
  if (repetirContrasena.trim() === "") {
    showToast('Debe repetir la contraseña')
      //repetirContrasenaError.textContent = "Debe repetir la contraseña";
      errores = true; 
      validar=0;
      return;
  } else if (repetirContrasena !== contrasena) {
    showToast('Las contraseñas no coinciden')
      //repetirContrasenaError.textContent = "Las contraseñas no coinciden";
      errores = true; 
      validar=0;
      return;
  } else {
      repetirContrasenaError.textContent = "";
  }

  if (!errores) {
      // No hay errores, mostrar alerta de éxito
    showToast('Se valido con exito') 
    validar=1;
      // Aquí podrías realizar alguna otra acción, como redireccionar a otra página
  }
});