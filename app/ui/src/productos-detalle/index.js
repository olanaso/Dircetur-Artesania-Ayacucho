import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { FileUploader } from '../utils/upload.js';
import { buscarProducto,geteditarproducto, getusuariocapacitacion, deleteUserCapacitacion, guardarProducto, nuevoUserCapacitacion,buscarartesanoDNI,buscarartesanoid } from './api';
import { showLoading, hideLoading, checkSession } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config'
import { showToast } from '../utils/toast';
import '../productos-detalle/style.css'
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


var lstproductos = null;
var editarproductos = null;
var idactualizar = null;
var productId=0;

let contadorImagenes = 0;
let videoCounter = 0; 
let videoCounter2 = 0; 
let contadorColores = 0;
let contadorTalla = 0;
let contadorOfertas = 0;
let contadorCostos = 0;


var artesano_id=0;


async function buscarUsuario () {

  $('#filtrar-producto').on('click', async function (e) {

    e.preventDefault(); 

   
      showLoading()
      //let certificados = buscarProducto($('#searchBox').val())
      //console.log(certificados) 
      // Obtener la lista de certificados
      //certificados = await buscarProducto($('#searchBox').val());

      const Nombreproducto = document.getElementById('nombre-producto').value;
      const Nombreartesano = document.getElementById('nombre-artesano').value;
      const Preciosid = document.getElementById('precios-id').value;
      const Cantidadesid = document.getElementById('cantidades-id').value;
      const filtro = {
        nombres_es:Nombreproducto,
        nombre_completo:Nombreartesano,
        precio:Preciosid,
        cantidad:Cantidadesid
      }; 
      lstproductos = await buscarProducto(filtro);

      // Obtener la referencia del elemento HTML donde se insertará la tabla
      let tabla = document.getElementById('tablaproducto');

      // Limpiar la tabla antes de insertar nuevos datos
      tabla.innerHTML = '';

      // Crear una fila para los encabezados de la tabla
      let encabezados = '<tr><th>N°</th><th>Imagen</th><th>Producto</th><th>Nombre Artesano</th><th>Precio S/.</th><th>Stock</th> <th  style="text-align: center;">Acciones</th></tr>';

      // Agregar los encabezados a la tabla
      tabla.innerHTML += encabezados;

      // Recorrer la lista de certificados y pintar los datos en la tabla

      // Inicializar el contador
      let correlativo = 1;
      for (let prog of lstproductos) {
        // Crear una fila para cada certificado

        let fila = '<tr>';
        // Agregar las celdas con los datos del certificado
        fila += `<td>${correlativo}</td>`; 
        fila += `<td style="text-align: center;"><img src="${prog.imagen_principal}" alt="Imagen" style="width: 150px;ali height: auto;"></td>`;
        fila += `<td>${prog.nombres_es}</td>`;
        fila += `<td>${prog.nombre_completo}</td>`;
        fila += `<td>${prog.precio}</td>`;
        fila += `<td>${prog.cantidad}</td>`;
        fila += `<td style="text-align: center;"><a href="/productos-detalle.html?id=${prog.id}" data-toggle="tooltip" title="Editar" data-id="${prog.id}" class="btn btn-info btn-sm" > <i class="icon icon-edit2"></i></a> `;
        fila += `<a href="javascript:void(0);"  data-toggle="tooltip" title="Eliminar" data-id="${prog.id}" class="btn btn-primary btn-sm">  <i class="icon icon-bin"></i></a>`;
        fila += `</td>`;
   

        fila += '</tr>';
        // Agregar la fila a la tabla
        tabla.innerHTML += fila;
        // Incrementar el correlativo
        correlativo++;
      }
      $('[data-toggle="tooltip"]').tooltip();
      hideLoading()
 

  })


  async function buscarUsuario2 () {

    certificados = await buscarProducto($('#searchBox').val());
    // Obtener la referencia del elemento HTML donde se insertará la tabla
    let tabla = document.getElementById('tablaCertificados');
    // Limpiar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';
    // Crear una fila para los encabezados de la tabla
    let encabezados = '<tr><th>N°</th><th>Nombres Completos</th><th>Curso</th><th>Fecha Emisión</th><th>Código</th> <th colspan="3" style="text-align: center;">Certificado</th></tr>';
    // Agregar los encabezados a la tabla
    tabla.innerHTML += encabezados;
    // Recorrer la lista de certificados y pintar los datos en la tabla
    // Inicializar el contador
    let correlativo = 1;

    for (let prog of certificados) {
      // Crear una fila para cada certificado

      let fila = '<tr>';
      // Agregar las celdas con los datos del certificado
      fila += `<td>${correlativo}</td>`;
      fila += `<td>${prog.nombres}</td>`;
      fila += `<td>${prog.curso}</td>`;
      fila += `<td>${prog.fecha_fin}</td>`;
      fila += `<td>${prog.cod_curso}</td>`;
      fila += `<td><a href="javascript:void(0);"   class="open-modal" data-toggle="tooltip" title="Editar" data-id="${prog.id}" style="color: blue; text-decoration: underline;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg></a></td>`;

      fila += `<td><a href="javascript:void(0);" class="btn_Eliminar" data-toggle="tooltip" title="Eliminar" data-id="${prog.id}" style="color: blue; text-decoration: underline;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg></a></td>`;



      fila += `<td><a href="${prog.certificado}" target="_blank" data-toggle="tooltip" title="Ver certificado" style="color: blue; text-decoration: underline;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg></a></td>`;


      fila += '</tr>';
      // Agregar la fila a la tabla
      tabla.innerHTML += fila;
      // Incrementar el correlativo
      correlativo++;
    }
    $('[data-toggle="tooltip"]').tooltip();


  }


  function isInteger(value) {
    return /^\d+$/.test(value);
  }

  function isDecimal(value) {
      return /^\d+(\.\d+)?$/.test(value);
  }

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
      //alert('Por favor, ingresa el DNI y todos los campos requeridos.');
      showToast('Por favor, ingresa el DNI y todos los campos requeridos.');
      document.getElementById('dni').focus(); // Pone el foco en el campo del D
      
      return;
    } else {
      //$("#btnactualizar").prop("disabled", true).text("Actualizando..."); 

      showLoading()
      let nombres_es = $('#idespanolNombre').val()  
      let nombres_eng = $('#idinglesNombre').val() 
      let resumen_es = $('#idespanolResumen').val() 
      let resumen_eng = $('#idinglesResumen').val() 
      let descripcion_es = $('#idespanolDescripcion').val() 
      let descripcion_eng = $('#idinglesDescripcion').val() 
      let cualidades_es = $('#idespanolCualidades').val() 
      let cualidades_eng = $('#idinglesCualidades').val() 
      let palabra_clave_es = $('#idespanolPalabras').val() 
      let palabra_clave_eng = $('#idinglesPalabras').val() 
      let numero_piezas_es = $('#idespanolPiezas').val() 
      let numero_piezas_eng = $('#idinglesPiezas').val() 
      let alto = $('#idalto').val() 
      let ancho = $('#idancho').val() 
      let materiales_es = $('#idespanolMateriales').val() 
      let materiales_eng = $('#idinglesMateriales').val() 
      let precio = $('#precioproducto').val() 
      let peso = $('#pesokilogramos').val() 
      let tecnicas_es = $('#idespanolTecnicas').val() 
      let tecnicas_eng = $('#idinglesTecnicas').val() 
      
      let cantidad = $('#cantidad').val() 
      let cantidad_minima = $('#cantidadMinima').val()  
      let restar_stock = $('#restarStock').is(':checked') ? 1 : 0;
      let tipo_estado = $('#estadoAgotado').val() 
      let fecha_disponible = $('#fechaDisponible').val()  

   
      alto = alto === "" ? 0 : (isDecimal(alto) ? parseFloat(alto) : NaN);
      ancho = ancho === "" ? 0 : (isDecimal(ancho) ? parseFloat(ancho) : NaN);
      precio = precio === "" ? 0 : (isDecimal(precio) ? parseFloat(precio) : NaN);
      peso = peso === "" ? 0 : (isDecimal(peso) ? parseFloat(peso) : NaN);
      cantidad = cantidad === "" ? 0 : (isInteger(cantidad) ? parseInt(cantidad, 10) : NaN);
      cantidad_minima = cantidad_minima === "" ? 0 : (isInteger(cantidad_minima) ? parseInt(cantidad_minima, 10) : NaN);
      fecha_disponible = fecha_disponible === "" ? null : fecha_disponible;
      tipo_estado = parseInt(tipo_estado, 10);

 
      let igv = $('#impuestoIGV').is(':checked') ? 1 : 0;      
      let precios_envio = $('#precioEnvio').is(':checked') ? 1 : 0;
      let precio_local = $('#envioLocal').val() 
      let precio_nacional = $('#envioNacional').val() 
      let precio_extranjero =  $('#envioExtranjero').val()  
      let tiempo_elaboracion = $('#tiemposElaboracion').val()
      let tiempo_envio = $('#tiemposEnvio').val()   
      let preventas = $('#preventas').is(':checked') ? 1 : 0;



      precio_local = precio_local === "" ? 0 : (isDecimal(precio_local) ? parseFloat(precio_local) : NaN);
      precio_nacional = precio_nacional === "" ? 0 : (isDecimal(precio_nacional) ? parseFloat(precio_nacional) : NaN);
      precio_extranjero = precio_extranjero === "" ? 0 : (isDecimal(precio_extranjero) ? parseFloat(precio_extranjero) : NaN);      
      tiempo_elaboracion = tiempo_elaboracion === "" ? 0 : (isInteger(tiempo_elaboracion) ? parseInt(tiempo_elaboracion, 10) : NaN);
      tiempo_envio = tiempo_envio === "" ? 0 : (isInteger(tiempo_envio) ? parseInt(tiempo_envio, 10) : NaN); 
      /***otros costos */

      let listaCostos = [];

      $('#listaCostos tr').each(function() {
          let fila = $(this);
          let costo = {
              id: fila.find('td').eq(0).text(),
              nombre: fila.find('td').eq(1).text(),
              precio: fila.find('td').eq(2).text()
          };
          listaCostos.push(costo);
      });

      let costosJSON = JSON.stringify(listaCostos);
      
      let lst_otros_costos = costosJSON;

      // Aquí puedes enviar costosJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
      let listaOfertas = [];

      $('#listaOfertas tr').each(function() {
          let fila = $(this);
          let oferta = {
              id: fila.find('td').eq(0).text(),
              porcentajeDescuento: parseInt(fila.find('td').eq(1).text(), 10),
              precioOfertado: parseFloat(fila.find('td').eq(2).text()),
              fechaInicio: fila.find('td').eq(3).text(),
              fechaFin: fila.find('td').eq(4).text()
          };
          listaOfertas.push(oferta);
      });

      let ofertasJSON = JSON.stringify(listaOfertas);
      let lst_ofertas = ofertasJSON;


    // Aquí puedes enviar coloresJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
         
      let listaColores = [];

      $('#listaColores tr').each(function() {
          let fila = $(this);
          let oferta = {
              id: fila.find('td').eq(0).text(), 
              color: fila.find('td').eq(1).text() 
          };
          listaColores.push(oferta);
      });

      let ColoresJSON = JSON.stringify(listaColores);
      let lst_colores = ColoresJSON;

       // Aquí puedes enviar tallaJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
         
      let listaTalla = [];

      $('#listaTalla tr').each(function() {
          let fila = $(this);
          let talla = {
              id: fila.find('td').eq(0).text(), 
              talla: parseInt(fila.find('td').eq(1).text(), 10)
          };
          listaTalla.push(talla);
      });

      let TallaJSON = JSON.stringify(listaTalla);
      let lst_talla = TallaJSON;
// Aquí puedes enviar imagenesprincipalJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
      var principalImagePreview = document.getElementById('imagenPrincipal');

      // Obtener el valor del atributo src
      var imagen_principal = principalImagePreview.src;


   // Aquí puedes enviar imagenesJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
      let listaImagenes = []; 
      $('#listaImagenes tr').each(function() {
          let fila = $(this);
          let imagen = {
              id: fila.find('td').eq(0).text(),
              src: fila.find('img').attr('src'),
              srcv: fila.find('img').attr('src'),
              nombre: fila.find('td').eq(2).text()
          }; 
          listaImagenes.push(imagen);
      });

      let imagenesJSON = JSON.stringify(listaImagenes);
      let lst_imagenes = imagenesJSON;
  


       // Aquí puedes enviar videosJSON al servidor o hacer algo con él
      //alert('Costos guardados en JSON:\n' + costosJSON);
      /****fin */
      let listavideos = []; 
      $('#videoList tr').each(function() {
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
      $('#videoList2 tr').each(function() {
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
  

  

      //let imagen_principal = "/img/olla.jpg"  
      

      let result = await guardarProducto({ productId,nombres_es,nombres_eng,resumen_es,resumen_eng,descripcion_es,descripcion_eng,cualidades_es,cualidades_eng,palabra_clave_es,palabra_clave_eng,numero_piezas_es,numero_piezas_eng,alto,ancho,materiales_es,materiales_eng,precio,peso,tecnicas_es,tecnicas_eng,cantidad,cantidad_minima,restar_stock,tipo_estado,fecha_disponible,imagen_principal,lst_otros_costos,lst_ofertas,lst_colores,lst_talla,lst_imagenes,lst_videos,lst_videoenlace,precios_envio,igv,precio_local,precio_nacional,precio_extranjero,tiempo_elaboracion,tiempo_envio,preventas,artesano_id  });
      if (result) {
        showToast('Se actualizo los datos correctamente')

        if (productId == 0) {
          const url = new URL(window.location.href);
          url.searchParams.set('id', result.id);
          window.history.pushState({}, '', url);
          productId=result.id;
        } 
        

        hideLoading() 
        buscarUsuario();
        $('#myModal').css('display', 'none');
      } else {
        showToast('Ocurrio un error.')
      }
      //$("#btnactualizar").prop("disabled", false).text("Actualizar");
    }

  })


  function validarCantidad() {
      var cantidad = document.getElementById('cantidad').value;
      var cantidadMinima = document.getElementById('cantidadMinima').value;
      var errorMessage = document.getElementById('error-message');

       
      if (cantidad && cantidadMinima) {
        if (parseFloat(cantidad) < parseFloat(cantidadMinima)) {
          
      showToast('La cantidad minima no puede ser mayor.');
          //alert('La cantidad minima no puede ser mayor');
          document.getElementById('cantidadMinima').focus(); 
           document.getElementById('cantidadMinima').value=""; 
          return
        }
    } else {
        errorMessage.style.display = 'none';
    }
  }

  

  
document.getElementById('cantidad').addEventListener('input', validarCantidad);
document.getElementById('cantidadMinima').addEventListener('input', validarCantidad);




  $('#btnuevo').on('click', async function (e) {
    e.preventDefault();

    var isValid = true;

    // Itera sobre todos los campos requeridos para verificar si están vacíos
    $('#form2 .form-control[required]').each(function () {
      if ($(this).val() === '') {
        isValid = false;
        $(this).css('border-color', 'red'); // Marca los campos vacíos
      } else {
        $(this).css('border-color', ''); // Restablece a la normalidad si se corrige
      }
    });

    if (!isValid) {
      showToast('Por favor, completa todos los campos requeridos.');
      //alert('Por favor, completa todos los campos requeridos.');

    } else {
      //$("#btnactualizar").prop("disabled", true).text("Actualizando..."); 

      let dni = $('#txt-dni1').val()
      let nombres = $('#txt-nombres1').val()
      let cod_curso = $('#txt-cod_curso1').val()
      let nota = $('#txt-nota1').val()
      let cant_horas = $('#txt-cant_horas1').val()
      let fecha_inicio = $('#txt-fecha_inicio1').val()
      let fecha_fin = $('#txt-fecha_fin1').val()
      let fecha_emision = $('#txt-fecha_emision1').val()
      let instructor = $('#txt-instructor1').val()
      let temario = $('#txt-temario1').val()
      let curso = $('#txt-curso1').val()

      let ubicacion = $('#txt-ubicacion1').val()
      let institucion_solicitante = $('#txt-institucion_solicitante1').val()


      let result = await nuevoUserCapacitacion({ fecha_emision, dni, nombres, cod_curso, curso, nota, cant_horas, fecha_inicio, fecha_fin, instructor, temario, ubicacion, institucion_solicitante });
      if (result) {
        showToast('Se registro los datos correctamente')
        buscarUsuario2();
        $('#myModalNuevo').css('display', 'none');
      } else {
        showToast('Ocurrio un error.')
      }
      //$("#btnactualizar").prop("disabled", false).text("Actualizar");
    }

  })



}




 
$(document).on('click', '.btn_Eliminar', async function (e) {
 
  
  async function buscarUser () {
    // Inicializar el contador

    certificados = await buscarProducto($('#searchBox').val());
    // Obtener la referencia del elemento HTML donde se insertará la tabla
    let tabla = document.getElementById('tablaCertificados');
    // Limpiar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';
    // Crear una fila para los encabezados de la tabla
    let encabezados = '<tr><th>N°</th><th>Nombres Completos</th><th>Curso</th><th>Fecha Emisión</th><th>Código</th> <th colspan="3" style="text-align: center;">Certificado</th></tr>';
    // Agregar los encabezados a la tabla
    tabla.innerHTML += encabezados;
    // Recorrer la lista de certificados y pintar los datos en la tabla
    // Inicializar el contador
    let correlativo = 1;
    for (let prog of certificados) {
      // Crear una fila para cada certificado

      let fila = '<tr>';
      // Agregar las celdas con los datos del certificado
      fila += `<td>${correlativo}</td>`;
      fila += `<td>${prog.nombres}</td>`;
      fila += `<td>${prog.curso}</td>`;
      fila += `<td>${prog.fecha_fin}</td>`;
      fila += `<td>${prog.cod_curso}</td>`;
      fila += `<td><a href="javascript:void(0);"   class="open-modal" data-toggle="tooltip" title="Editar" data-id="${prog.id}" style="color: blue; text-decoration: underline;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg></a></td>`;

      fila += `<td><a href="javascript:void(0);" class="btn_Eliminar" data-toggle="tooltip" title="Eliminar" data-id="${prog.id}" style="color: blue; text-decoration: underline;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg></a></td>`;



      fila += `<td><a href="${prog.certificado}" target="_blank" data-toggle="tooltip" title="Ver certificado" style="color: blue; text-decoration: underline;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg></a></td>`;


      fila += '</tr>';
      // Agregar la fila a la tabla
      tabla.innerHTML += fila;
      // Incrementar el correlativo
      correlativo++;
    }
    $('[data-toggle="tooltip"]').tooltip();

  }

  e.preventDefault();
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    let id = $(this).data('id');
    let usuario = await getusuariocapacitacion(id)
    let dni = usuario.dni;
    let nombres = usuario.nombres;
    let cod_curso = usuario.cod_curso;
    let nota = usuario.nota;
    let cant_horas = usuario.cant_horas;
    let fecha_inicio = usuario.fecha_inicio;
    let fecha_fin = usuario.fecha_fin;
    let instructor = usuario.instructor;
    let temario = usuario.temario;
    let curso = usuario.curso;



    let ubicacion = usuario.ubicacion;
    let institucion_solicitante = usuario.institucion_solicitante;

    let result = await deleteUserCapacitacion({ id, dni, nombres, cod_curso, curso, nota, cant_horas, fecha_inicio, fecha_fin, instructor, temario, ubicacion, institucion_solicitante });
    if (result) {
      showToast('Se elimino los datos correctamente')
      await buscarUser();

    } else {
      showToast('Ocurrio un error.')
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

});

   


function createXLS (data, reportfilename) {
  var resultgeojson = alasql(`SELECT *
  FROM ? `, [data])
  var opts = [{
    sheetid: 'Reporte',
    headers: true
  }];
  var res = alasql(`SELECT INTO XLSX("${reportfilename}.xlsx",?) FROM ?`, [opts, [resultgeojson]]);
}

 

// calcular precios 


// Obtener referencias a los elementos del DOM
const descuentoInput = document.getElementById('porcentajeDescuento');
const precioDisplaySpan = document.getElementById('precioDisplay');
const precioOfertadoInput = document.getElementById('precioOfertado');

// Añadir un evento para actualizar el precio con descuento cuando el usuario ingrese un valor
descuentoInput.addEventListener('input', function() {
    // Obtener el valor del porcentaje de descuento ingresado
    const porcentajeDescuento = parseFloat(descuentoInput.value);

    // Obtener el valor del precio original
    const precioOriginal = parseFloat(precioDisplaySpan.innerText) || parseFloat(precioDisplaySpan.textContent);

    // Validar que los valores sean números válidos
    if (!isNaN(porcentajeDescuento) && !isNaN(precioOriginal)) {
        // Calcular el precio con descuento
        const descuento = (precioOriginal * porcentajeDescuento) / 100;
        const precioConDescuento = precioOriginal - descuento;

        // Actualizar el valor del input
        precioOfertadoInput.value = precioConDescuento.toFixed(2);
    } else {
        // Manejo de errores si los valores no son válidos
        showToast('Completar el precio actual, registrar en la pestaña "datos generales - Precio del producto".');

        $('#porcentajeDescuento').val("");
        $('#precioOfertado').val("");
        //alert("Por favor, complete todos los campos *.");
        return;
    }
});

 

// validar fechas 
 // Obtener referencias a los elementos del DOM
 const fechaInicioInput = document.getElementById('fechaInicio');
 const fechaFinInput = document.getElementById('fechaFin');
 const errorMensaje = document.getElementById('errorMensaje');

 // Establecer la fecha actual en el campo de fecha de fin
 const hoy = new Date().toISOString().split('T')[0];
 fechaFinInput.value = hoy;

 // Función para validar las fechas
 function validarFechas() {
     const fechaInicio = new Date(fechaInicioInput.value);
     const fechaFin = new Date(fechaFinInput.value);

     if (fechaFin < fechaInicio) {
      
      showToast('La fecha de fin no puede ser menor que la fecha de inicio.');
         //alert("La fecha de fin no puede ser menor que la fecha de inicio.");
         fechaFinInput.value = fechaInicioInput.value;
     }
 }

 // Añadir eventos para validar las fechas cuando cambian
 fechaInicioInput.addEventListener('input', validarFechas);
 fechaFinInput.addEventListener('input', validarFechas);


// mostrar el precio

const precioInput = document.getElementById('precioproducto');
const precioDisplay = document.getElementById('precioDisplay');

// Añadir un evento para actualizar el span cuando el usuario ingrese un valor
precioInput.addEventListener('input', function() {
    // Obtener el valor ingresado
    const precio = precioInput.value;
    // Actualizar el contenido del span
    precioDisplay.textContent = precio;
});

async function editarProducto (id) {

  editarproductos =  await geteditarproducto(id); 
      $('#idespanolNombre').val(editarproductos.nombres_es)  
      $('#idinglesNombre').val( editarproductos.nombres_eng) 
      $('#idespanolResumen').val(editarproductos.resumen_es ) 
      $('#idinglesResumen').val(editarproductos.resumen_eng) 
      $('#idespanolDescripcion').val(editarproductos.descripcion_es) 
      $('#idinglesDescripcion').val(editarproductos.descripcion_eng) 
      $('#idespanolCualidades').val(editarproductos.cualidades_es) 
      $('#idinglesCualidades').val(editarproductos.cualidades_eng) 
      $('#idespanolPalabras').val(editarproductos.palabra_clave_es) 
      $('#idinglesPalabras').val(editarproductos.palabra_clave_eng ) 
      $('#idespanolPiezas').val(editarproductos.numero_piezas_es) 
      $('#idinglesPiezas').val(editarproductos.numero_piezas_eng) 
      $('#idalto').val(editarproductos.alto ) 
      $('#idancho').val(editarproductos.ancho) 
      $('#idespanolMateriales').val(editarproductos.materiales_es) 
      $('#idinglesMateriales').val(editarproductos.materiales_eng) 
      $('#precioproducto').val( editarproductos.precio) 
      precioDisplay.textContent = editarproductos.precio;
      $('#pesokilogramos').val(editarproductos.peso) 
      $('#idespanolTecnicas').val(editarproductos.tecnicas_es) 
      $('#idinglesTecnicas').val(editarproductos.tecnicas_eng) 

      $('#cantidad').val(editarproductos.cantidad ) 
      $('#cantidadMinima').val(editarproductos.cantidad_minima)  
      if (editarproductos.restar_stock===1){
        document.getElementById('restarStock').checked = true;  
        }else
        {
          document.getElementById('restarStock').checked = false;
        }
      
      $('#estadoAgotado').val(editarproductos.tipo_estado) 
      $('#fechaDisponible').val(editarproductos.fecha_disponible ) 


      
      document.getElementById('imagenPrincipal').src=editarproductos.imagen_principal 

 
     // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lstimagenes2 = JSON.parse(editarproductos.lst_imagenes);
      const lstimagenes = JSON.parse(lstimagenes2); 
      console.log('lst_imagenes:', lstimagenes);  // Verificar el contenido de lstimagenes 
          lstimagenes.forEach(item => {
              contadorImagenes++;
              let nuevaFila = `
                  <tr>
                      <td>${contadorImagenes}</td>
                      <td>
                          <div class="d-flex align-items-center">
                              <img src="${item.src}" alt="Imagen ${contadorImagenes}" class="img-thumbnail" style="width: 100px; height: 75px;">
                          </div>
                      </td>
                      <td>${item.nombre}</td>
                      <td>
                          <button type="button" data-toggle="tooltip" title="Eliminar" class="btn btn-primary btn-sm btn-delete-imagen">
                              <i class="icon icon-bin"></i>
                          </button>
                      </td>
                  </tr>
              `; 
              document.getElementById('listaImagenes').insertAdjacentHTML('beforeend', nuevaFila);
          });
    
          
     // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lstvideos1 = JSON.parse(editarproductos.lst_videos);
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
      const lstvideoenlace1 = JSON.parse(editarproductos.lst_videoenlace);
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

           

                // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lstcolores1 = JSON.parse(editarproductos.lst_colores);
      const lstcolores = JSON.parse(lstcolores1); 
      //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
      lstcolores.forEach(item => {
        contadorColores++;
              let nuevaFila = `
              <tr>
                  <td>${contadorColores}</td>
                  <td>${item.color} <label id="color-label" style="background:${item.color} ; width: 10%;height: 25px;"></label></td> 
                  <td>
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-colores">
                      <i class="icon icon-bin"></i>
                      </button> 

                  </td>
              </tr>
              `; 
              document.getElementById('listaColores').insertAdjacentHTML('beforeend', nuevaFila);
          });
 
                  // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lsttalla1 = JSON.parse(editarproductos.lst_talla);
      const lsttalla = JSON.parse(lsttalla1); 
      //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
      lsttalla.forEach(item => {
        contadorTalla++;
              let nuevaFila = `
              <tr>
                  <td>${contadorTalla}</td>
                  <td>${item.talla}</td> 
                  <td>
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Talla">
                      <i class="icon icon-bin"></i>
                      </button> 

                  </td>
              </tr>
              `; 
              document.getElementById('listaTalla').insertAdjacentHTML('beforeend', nuevaFila);
          });
  
                     // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lstofertas1 = JSON.parse(editarproductos.lst_ofertas);
      const lstofertas = JSON.parse(lstofertas1); 
      //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
      lstofertas.forEach(item => {
        contadorOfertas++;
              let nuevaFila = `
              <tr>
                  <td>${contadorOfertas}</td>
                  <td>${item.porcentajeDescuento}</td>
                  <td>${item.precioOfertado.toFixed(2)}</td>
                  <td>${item.fechaInicio}</td>
                  <td>${item.fechaFin}</td>
                  <td>
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm  btn-delete-offer">
                      <i class="icon icon-bin"></i>
                      </button>
                  </td>
              </tr>
              `; 
              document.getElementById('listaOfertas').insertAdjacentHTML('beforeend', nuevaFila);
          });
  
                     // Parsear el JSON
      // Parsear el JSON y asegurarse de que es un arreglo
      const lstotroscostos1 = JSON.parse(editarproductos.lst_otros_costos);
      const lstotroscostos = JSON.parse(lstotroscostos1); 
      //console.log('videoList:', lst_videos);  // Verificar el contenido de lstimagenes 
      lstotroscostos.forEach(item => {
        contadorCostos++;
              let nuevaFila = `
              <tr>
                  <td>${contadorCostos}</td>
                  <td>${item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-cost">
                      <i class="icon icon-bin"></i>
                      </button> 
    
                  </td>
              </tr>
              `; 
              document.getElementById('listaCostos').insertAdjacentHTML('beforeend', nuevaFila);
          });
 
          var input = document.getElementById('envioLocal');
          var input2 = document.getElementById('envioNacional');
          var input3 = document.getElementById('envioExtranjero');
          if (editarproductos.precios_envio===1){
            document.getElementById('precioEnvio').checked = true;  
            input.disabled = false;
            input2.disabled = false;
            input3.disabled = false;
            
          $('#envioLocal').val(editarproductos.precio_local) 
          $('#envioNacional').val(editarproductos.precio_nacional) 
          $('#envioExtranjero').val(editarproductos.precio_extranjero) 
            }else
            {
              document.getElementById('precioEnvio').checked = false; 
              input.disabled = true;
              input2.disabled = true;
              input3.disabled = true;
            }
            
             
 
          if (editarproductos.igv===1){
            document.getElementById('impuestoIGV').checked = true;  
            }else
            {
              document.getElementById('impuestoIGV').checked = false;
            }


          $('#tiemposElaboracion').val(editarproductos.tiempo_elaboracion) 
          $('#tiemposEnvio').val(editarproductos.tiempo_envio) 
          
          if (editarproductos.preventas===1){
            document.getElementById('preventas').checked = true;  
            }else
            {
              document.getElementById('preventas').checked = false;
            }



            /*****buscar artesanod */

            const artesanosid = await buscarartesanoid(editarproductos.artesano_id); 
            $('#dni').val(artesanosid.dni);
            $('#nombrecompleto').val(artesanosid.nombres + ' ' + artesanosid.apellidos); 

}

$(document).ready(function() {

   

 ///editar formulario
 const urlParams = new URLSearchParams(window.location.search);
   productId = urlParams.get('id');
 if(productId!=0)
  { 
    editarProducto(productId);
  }
   
//******traductor */

$('#ingles-tab').on('shown.bs.tab', function (e) {
    const textInSpanish = $('#idespanolNombre').val();
    if (textInSpanish === "") {
      $('#idinglesNombre').val(""); // Clear the English field if Spanish field is empty
      
      showToast('Por favor, ingrese un nombre de producto en español antes de traducir.');
     // alert("Por favor, ingrese un nombre de producto en español antes de traducir.");
      return; // Exit the function if the Spanish field is empty
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "text": textInSpanish });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
      .then(response => response.json()) // assuming the API returns JSON
      .then(result => {
        $('#idinglesNombre').val(result.translatedText); // assuming the JSON response has a "translatedText" field
      })
      .catch(error => console.error('Error:', error));
});

$('#ingles-tab-resumen').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolResumen').val();
  if (textInSpanish === "") {
    $('#idinglesResumen').val(""); // Clear the English field if Spanish field is empty
    
    showToast('Por favor, ingrese el resumen de producto en español antes de traducir.');
    //alert("Por favor, ingrese el resumen de producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesResumen').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});

$('#ingles-tab-descripcion').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolDescripcion').val();
  if (textInSpanish === "") {
    $('#idinglesDescripcion').val(""); // Clear the English field if Spanish field is empty
    
    showToast('Por favor, ingrese la descripción del producto en español antes de traducir.');
    //alert("Por favor, ingrese la descripción del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesDescripcion').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});

$('#ingles-tab-cualidades').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolCualidades').val();
  if (textInSpanish === "") {
    $('#idinglesCualidades').val(""); // Clear the English field if Spanish field is empty
    
    showToast('Por favor, ingrese las cualidades del producto en español antes de traducir.');
   //alert("Por favor, ingrese las cualidades del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesCualidades').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});

$('#ingles-tab-palabras').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolPalabras').val();
  if (textInSpanish === "") {
    $('#idinglesPalabras').val(""); // Clear the English field if Spanish field is empty
    showToast('Por favor, ingrese palabra clave del producto en español antes de traducir.');
    //alert("Por favor, ingrese palabra clave del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesPalabras').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});


$('#ingles-tab-piezas').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolPiezas').val();
  if (textInSpanish === "") {
    $('#idinglesPiezas').val(""); // Clear the English field if Spanish field is empty
    showToast('Por favor, ingrese numero de piezas del producto en español antes de traducir.');
    //alert("Por favor, ingrese numero de piezas del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesPiezas').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});



$('#ingles-tab-materiales').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolMateriales').val();
  if (textInSpanish === "") {
    $('#idinglesMateriales').val(""); // Clear the English field if Spanish field is empty
    showToast('Por favor, ingrese descripción de materiales del producto en español antes de traducir.');
    //alert("Por favor, ingrese descripción de materiales del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesMateriales').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});



$('#ingles-tab-tecnicas').on('shown.bs.tab', function (e) {
  const textInSpanish = $('#idespanolTecnicas').val();
  if (textInSpanish === "") {
    $('#idinglesTecnicas').val(""); // Clear the English field if Spanish field is empty
    showToast('Por favor, ingrese técnicas empleadas del producto en español antes de traducir.');
    //alert("Por favor, ingrese técnicas empleadas del producto en español antes de traducir.");
    return; // Exit the function if the Spanish field is empty
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "text": textInSpanish });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://dni.biblio-ideas.com/api/translate", requestOptions)
    .then(response => response.json()) // assuming the API returns JSON
    .then(result => {
      $('#idinglesTecnicas').val(result.translatedText); // assuming the JSON response has a "translatedText" field
    })
    .catch(error => console.error('Error:', error));
});


//**fin*** */



   /******otros costos */

  $('#addCostoButton').on('click', function() {
      let nombreCosto = $('#nombreCosto').val();
      let precioCosto = $('#precioCosto').val();

      if (nombreCosto === "" || precioCosto === "") {
        showToast('Por favor, complete todos los campos *.');
          //alert("Por favor, complete todos los campos *.");
          return;
      }

      contadorCostos++;

      let nuevaFila = `
          <tr>
              <td>${contadorCostos}</td>
              <td>${nombreCosto}</td>
              <td>${precioCosto}</td>
              <td>
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-cost">
                  <i class="icon icon-bin"></i>
                  </button> 

              </td>
          </tr>
      `;

      $('#listaCostos').append(nuevaFila);

      $('#nombreCosto').val('');
      $('#precioCosto').val('');
  });

  $(document).on('click', '.btn-delete-cost', function() {
      $(this).closest('tr').remove();
      contadorCostos--;

      // Reordenar los números de la lista
      $('#listaCostos tr').each(function(index, tr) {
          $(tr).find('td:first').text(index + 1);
      });
  });


    /******ofertas */

    function isInteger(value) {
        return /^\d+$/.test(value);
    }

    function isDecimal(value) {
        return /^\d+(\.\d+)?$/.test(value);
    }
    
    $('#addOfferButton').on('click', function() {
      let porcentajeDescuento = $('#porcentajeDescuento').val();
      let precioOfertado = $('#precioOfertado').val();
      let fechaInicio = $('#fechaInicio').val();
      let fechaFin = $('#fechaFin').val(); 
 

      const precioOriginal = parseFloat(precioDisplaySpan.innerText) || parseFloat(precioDisplaySpan.textContent);

    // Validar que los valores sean números válidos
    if (isNaN(precioOriginal)) { 
        // Manejo de errores si los valores no son válidos
        showToast('Completar el precio actual, registrar en la pestaña "datos generales - Precio del producto".');

        $('#porcentajeDescuento').val("");
        $('#precioOfertado').val("");
        //alert("Por favor, complete todos los campos *.");
        return;
    }

      if (porcentajeDescuento === "" || precioOfertado === "" || fechaInicio === "" || fechaFin === "") {
        showToast('Por favor, complete todos los campos *.');
          //alert("Por favor, complete todos los campos *.");
          return;
      }

      porcentajeDescuento = porcentajeDescuento === "" ? 0 : (isInteger(porcentajeDescuento) ? parseInt(porcentajeDescuento, 10) : NaN);
      precioOfertado = precioOfertado === "" ? 0 : (isDecimal(precioOfertado) ? parseFloat(precioOfertado) : NaN);

      if (isNaN(porcentajeDescuento) || isNaN(precioOfertado)) {
        showToast('Por favor, ingrese valores válidos.');
         //alert("Por favor, ingrese valores válidos.");
          return;
      }

      contadorOfertas++;

      let nuevaFila = `
          <tr>
              <td>${contadorOfertas}</td>
              <td>${porcentajeDescuento}</td>
              <td>${precioOfertado.toFixed(2)}</td>
              <td>${fechaInicio}</td>
              <td>${fechaFin}</td>
              <td>
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm  btn-delete-offer">
                  <i class="icon icon-bin"></i>
                  </button>
              </td>
          </tr>
      `;
 

      $('#listaOfertas').append(nuevaFila);

      $('#porcentajeDescuento').val('');
      $('#precioOfertado').val('');
      $('#fechaInicio').val('');
      $('#fechaFin').val('');
  });

  $(document).on('click', '.btn-delete-offer', function() {
      $(this).closest('tr').remove();
      contadorOfertas--;

      // Reordenar los números de la lista
      $('#listaOfertas tr').each(function(index, tr) {
          $(tr).find('td:first').text(index + 1);
      });
  });


  /******otros Colores */
  

  $('#addcolorbtn').on('click', function() { 
      let colorinput = $('#color-input').val(); 

      if (colorinput === "" ) {
        showToast('Por favor, complete todos los campos *.');
          //alert("Por favor, complete todos los campos *.");
          return;
      }

      contadorColores++;

      let nuevaFila = `
          <tr>
              <td>${contadorColores}</td> 
              <td>${colorinput} <label  style="background: ${colorinput};width: 10%; height: 25px;"></label></td> 
              <td>
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-colores">
                  <i class="icon icon-bin"></i>
                  </button> 

              </td>
          </tr>
      `;

      $('#listaColores').append(nuevaFila);

      $('#color-input').val(''); 
  });

  $(document).on('click', '.btn-delete-colores', function() {
      $(this).closest('tr').remove();
      contadorColores--;

      // Reordenar los números de la lista
      $('#listaColores tr').each(function(index, tr) {
          $(tr).find('td:first').text(index + 1);
      });
  });


  
  /****** Talla */
 

  $('#addtallabtn').on('click', function() { 
      let tallainput = $('#talla-input').val(); 

      if (tallainput === "" ) {
        showToast('Por favor, complete todos los campos *.');
          //alert("Por favor, complete todos los campos *.");
          return;
      }

     /* tallainput = tallainput === "" ? 0 : (isInteger(tallainput) ? parseInt(tallainput, 10) : NaN); 

      if (isNaN(tallainput)) {
        showToast('Por favor, ingrese valores válidos.');
        $('#talla-input').focus(); 
          //alert("Por favor, ingrese valores válidos.");
          return;
      }*/

      contadorTalla++;

      let nuevaFila = `
          <tr>
              <td>${contadorTalla}</td>
              <td>${tallainput}</td> 
              <td>
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Talla">
                  <i class="icon icon-bin"></i>
                  </button> 

              </td>
          </tr>
      `;

      $('#listaTalla').append(nuevaFila);

      $('#talla-input').val(''); 
  });

  $(document).on('click', '.btn-delete-Talla', function() {
      $(this).closest('tr').remove();
      contadorTalla--;

      // Reordenar los números de la lista
      $('#listaTalla tr').each(function(index, tr) {
          $(tr).find('td:first').text(index + 1);
      });
  });
 
 


  /******  Imagenes */
   
  //let contadorImagenes = 0;

   $('#guardarBtn').on('click', function() {
                let imageName = $('#imageName').val();
                let imageSrc = $('#imagePreview').attr('src');

                if (!imageName || !imageSrc) {
                  showToast('Por favor, suba una imagen.');
                    //alert("Por favor, suba una imagen.");
                    return;
                }

                contadorImagenes++;

                let nuevaFila = `
                    <tr>
                        <td>${contadorImagenes}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${imageSrc}" alt="Imagen ${contadorImagenes}" class="img-thumbnail" style="width: 100px; height: 75px;"> 
                            </div>
                        </td>
                        <td>${imageName}</td>
                        <td>
                        <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-imagen">
                          <i class="icon icon-bin"></i> 
                    </tr>
                `;

                $('#listaImagenes').append(nuevaFila);
                $('#imagenModal').modal('hide');
                $('#imagenForm')[0].reset();
                $('#imagePreview').hide();
            });

  $(document).on('click', '.btn-delete-imagen', function() {

    $(this).closest('tr').remove();
    contadorImagenes--;

    // Reordenar los números de la lista
    $('#listaImagenes tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
     
  });
 


  $('#guardarPrincipalBtn').on('click', function() {
    let principalImageSrc = $('#principalImagePreview').attr('src');
    let principalImageName = $('#principalImageName').val();

    let imageName = $('#imageName').val();
    let imageSrc = $('#imagePreview').attr('src'); 
    

    if (!principalImageSrc || !principalImageName) {
      showToast('Por favor, suba una imagen.');
       // alert("Por favor, suba una imagen.");
        return;
    }

    $('#imagenPrincipal').attr('src', principalImageSrc);
    $('#imagenPrincipalModal').modal('hide');
    $('#imagenPrincipalForm')[0].reset();
    $('#principalImagePreview').hide();
  });
 

  $('#limpiarPrincipalBtn').on('click', function() {
    $('#imagenPrincipal').attr('src', '/img/sin_imagen.jpg');
  });



  
  /******  videos */
  
  let videoStorage = {}; // Almacena los videos cargados

  $('#addVideoLink').on('click', function() {

    let videoName = $('#linkVideoName').val();
    let videoLink = $('#videoLink').val();

    if (!videoName || !videoLink) {
      showToast('Por favor, complete todos los campos *.');
        //alert("Por favor, complete todos los campos *.");
        return;
    }

    var urlInput = document.getElementById('videoLink').value;
    var message = document.getElementById('message');
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-zA-Z0-9]{1,}\\.)?[a-zA-Z0-9]{2,}\\.[a-zA-Z]{2,})|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // port and path
        '(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // query string
        '(\\#[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$','i'); // fragment locator

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

  $(document).on('click', '.btn-delete-video1', function() {
    
    $(this).closest('tr').remove();
    contadorImagenes--;

    // Reordenar los números de la lista
    $('#videoList2 tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
});


  $(document).on('click', '.btn-view-video', function() {
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

  $('#videoModal').on('hidden.bs.modal', function() {
      $('#videoPlayer').attr('src', ''); // Limpiar el src del iframe cuando se cierre el modal
  });

  $('#uploadVideo').on('change', function() {
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

  $('#cancelUpload').on('click', function() {
      $('#uploadVideo').val('');
      $('#fileSize').text('100mb');
      $('#uploadProgress').removeClass('bg-danger bg-success').text('0%');
      $('#uploadProgress').css('width', '0%');
  });

  $('#registerVideo').on('click', function() {
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


  $(document).on('click', '.btn-delete-video', function() {
    $(this).closest('tr').remove();
    contadorImagenes--;

    // Reordenar los números de la lista
    $('#videoList tr').each(function(index, tr) {
        $(tr).find('td:first').text(index + 1);
    });
}); 



});

 
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
         

       
        showToast('Registro correcto.');
        //showToast('Registro correcto.');
    } else {
      showToast('Por favor, seleccione un archivo para visualizar.');
        //alert("Por favor, seleccione un archivo para visualizar.");
    }

  // Ejemplo: Usar el resultado en otro lugar
   /*document.getElementById('someElement').innerText = response.name;*/
}

document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
      fileInputId: 'uploadImage',
      progressBarId: 'progressBar',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileuploadimg',
      callback: handleUploadResponselistaimg
  });
});

function handleUploadResponselistaimg (response) {
  // Manejar la respuesta del servidor
  /*showToast('Registro correcto.');;
  console.log('Server response:', response);
  alert(response.ruta)
  showToast('Registro correcto.');*/ 

    let file = $('#uploadImage').prop('files')[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').attr('src', 'http://localhost:3001/'+response.ruta).show();
            $('#imageName').val(file.name);
        }
        reader.readAsDataURL(file);
        showToast('Registro correcto.');
    } else {
      showToast('Por favor, seleccione un archivo para visualizar.');
        //alert("Por favor, seleccione un archivo para visualizar.");
    }

  // Ejemplo: Usar el resultado en otro lugar
   /*document.getElementById('someElement').innerText = response.name;*/
}



document.addEventListener('DOMContentLoaded', () => {
  initializeFileUploader({
      fileInputId: 'uploadVideo',
      progressBarId: 'progressBar',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileuploadvideo',
      callback: handleUploadResponselistavideo
  });
});

function handleUploadResponselistavideo (response) {
  // Manejar la respuesta del servidor
  /*showToast('Registro correcto.');;
  console.log('Server response:', response);
  alert(response.ruta)
  showToast('Registro correcto.');*/ 

  showToast('Registro correcto.');
  $('#videoPreview').attr('src', 'http://localhost:3001/'+response.ruta).show();

   /* let file = $('#uploadImage').prop('files')[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').attr('src', 'http://localhost:3001/'+response.ruta).show();
            $('#imageName').val(file.name);
        }
        reader.readAsDataURL(file);
        showToast('Registro correcto.');
    } else {
        alert("Por favor, seleccione un archivo para visualizar.");
    }*/

  // Ejemplo: Usar el resultado en otro lugar
   /*document.getElementById('someElement').innerText = response.name;*/
}



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
const nombrecompletoElement = document.getElementById('nombrecompleto');  

// Añadir un evento para actualizar el precio con descuento cuando el usuario ingrese un valor
dniElement.addEventListener('input', async function() {
    // Obtener el valor del porcentaje de descuento ingresado
    const dniValue = dniElement.value.trim(); // Trim para eliminar espacios en blanco al inicio y al final
    let valor = dniValue.length;
    if (valor == 8) {
        // Asume que buscarDNI es una función que retorna una promesa
        const artesanosDNI = await buscarartesanoDNI(dniValue);
    

        if (artesanosDNI != null) {   
            nombrecompletoElement.value = artesanosDNI.nombres + ' ' + artesanosDNI.apellidos;
            artesano_id=artesanosDNI.id;
        } else {  
            showToast('No existe registro de artesano');
            $('#dni').val('');
            $('#nombrecompleto').val('');
        }
    }
    
    // Aquí puedes usar artesanosDNI como lo necesites 
});

document.getElementById('precioEnvio').addEventListener('change', function() {
  var checkbox = this;
  var input = document.getElementById('envioLocal');
  var input2 = document.getElementById('envioNacional');
  var input3 = document.getElementById('envioExtranjero');
  input.disabled = !checkbox.checked;
  input2.disabled = !checkbox.checked;
  input3.disabled = !checkbox.checked; 
  $('#envioLocal').val('');
  $('#envioNacional').val('');
  $('#envioExtranjero').val(''); 
});