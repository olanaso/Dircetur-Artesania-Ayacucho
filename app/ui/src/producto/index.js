import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { buscarProducto, getusuariocapacitacion, deleteProducto, saveUserCapacitacion, nuevoUserCapacitacion } from './api';
import { showLoading, hideLoading, checkSession } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config'
import { showToast } from '../utils/toast';
import '../productos/style.css'
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
  buscarUsuario22();
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

async function buscarUsuario22 () {



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
    nombres_es: Nombreproducto,
    nombre_completo: Nombreartesano,
    precio: Preciosid,
    cantidad: Cantidadesid
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
    fila += `<a href="javascript:void(0);"  data-toggle="tooltip"  title="Eliminar" data-id="${prog.id}" class="btn btn_Eliminar btn-primary btn-sm">  <i class="icon icon-bin"></i></a>`;
    fila += `</td>`;


    fila += '</tr>';
    // Agregar la fila a la tabla
    tabla.innerHTML += fila;
    // Incrementar el correlativo
    correlativo++;
  }
  $('[data-toggle="tooltip"]').tooltip();
  hideLoading()

}
var lstproductos = null;
var idactualizar = null;
async function buscarUsuario () {

  $('#filtrar-producto').on('click', async function (e) {

    e.preventDefault();


    buscarUsuario22()

    $('[data-toggle="tooltip"]').tooltip();
    hideLoading()


  })


  async function buscarUsuario2 () {

    const Nombreproducto = document.getElementById('nombre-producto').value;
    const Nombreartesano = document.getElementById('nombre-artesano').value;
    const Preciosid = document.getElementById('precios-id').value;
    const Cantidadesid = document.getElementById('cantidades-id').value;
    const filtro = {
      nombres_es: Nombreproducto,
      nombre_completo: Nombreartesano,
      precio: Preciosid,
      cantidad: Cantidadesid
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

  }




  $('#btnactualizar').on('click', async function (e) {

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
      alert('Por favor, completa todos los campos requeridos.');
    } else {
      //$("#btnactualizar").prop("disabled", true).text("Actualizando..."); 

      let dni = $('#txt-dni').val()
      let nombres = $('#txt-nombres').val()
      let cod_curso = $('#txt-cod_curso').val()
      let nota = $('#txt-nota').val()
      let cant_horas = $('#txt-cant_horas').val()
      let fecha_inicio = $('#txt-fecha_inicio').val()
      let fecha_fin = $('#txt-fecha_fin').val()
      let fecha_emision = $('#txt-fecha_emision').val()
      let instructor = $('#txt-instructor').val()
      let temario = $('#txt-temario').val()
      let curso = $('#txt-curso').val()

      let ubicacion = $('#txt-ubicacion').val()
      let institucion_solicitante = $('#txt-institucion_solicitante').val()


      let result = await saveUserCapacitacion({ fecha_emision, id: idactualizar, dni, nombres, cod_curso, curso, nota, cant_horas, fecha_inicio, fecha_fin, instructor, temario, ubicacion, institucion_solicitante });
      if (result) {
        showToast('Se actualizo los datos correctamente')
        buscarUsuario2();
        $('#myModal').css('display', 'none');
      } else {
        showToast('Ocurrio un error.')
      }
      //$("#btnactualizar").prop("disabled", false).text("Actualizar");
    }

  })


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
      alert('Por favor, completa todos los campos requeridos.');

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

  e.preventDefault();
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    let id = $(this).data('id');

    let result = await deleteProducto({ id });
    if (result) {
      showToast('Se elimino los datos correctamente')
      buscarUsuario22();
      await buscarUser();

    } else {
      showToast('Ocurrio un error.')
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

});


$(document).on('click', '.open-modal', async function () {

  var id = $(this).data('id'); // Obtén el ID
  idactualizar = $(this).data('id');

  openModal(id); // Llama a la función que abre el modal y pasa el ID

  let usuario = await getusuariocapacitacion(id)

  if (usuario) {
    $('#txt-dni').val(usuario.dni)
    $('#txt-nombres').val(usuario.nombres)
    $('#txt-cod_curso').val(usuario.cod_curso)
    $('#txt-nota').val(usuario.nota)
    $('#txt-cant_horas').val(usuario.cant_horas)

    $('#txt-fecha_inicio').val(usuario.fecha_inicio)

    $('#txt-fecha_fin').val(usuario.fecha_fin)
    $('#txt-fecha_emision').val(usuario.fecha_emision)

    $('#txt-instructor').val(usuario.instructor)
    $('#txt-temario').val(usuario.temario)
    $('#txt-curso').val(usuario.curso)
    $('#txt-ubicacion').val(usuario.ubicacion)
    $('#txt-institucion_solicitante').val(usuario.institucion_solicitante)
  }
  else {
    $('#txt-dni').val('')
    $('#txt-nombres').val('')
    $('#txt-cod_curso').val('')
    $('#txt-nota').val('')
    $('#txt-cant_horas').val('')
    $('#txt-fecha_inicio').val('')
    $('#txt-fecha_fin').val('')
    $('#txt-instructor').val('')
    $('#txt-temario').val('')
    $('#txt-curso').val('')
    $('#txt-ubicacion').val('')
    $('#txt-institucion_solicitante').val('')

  }

});





function openModal (id) {
  // Aquí puedes configurar los datos en el modal basado en el ID
  console.log("Abrir modal para el ID:", id);
  $('#myModal').find('.modal-content p');

  // Muestra el modal
  $('#myModal').css('display', 'block');

  // Configura el cierre del modal al hacer clic en el span de cierre
  $('#closeButton').click(function () {
    $('#myModal').css('display', 'none');
  });

  // También cierra el modal si se hace clic fuera de él
  $(window).click(function (event) {
    if (event.target.id == 'myModal') {
      $('#myModal').css('display', 'none');
    }
  });
}


function openModalNuevo (id) {
  // Aquí puedes configurar los datos en el modal basado en el ID
  console.log("Abrir modal para el ID:", id);
  $('#myModalNuevo').find('.modal-content p');

  // Muestra el modal
  $('#myModalNuevo').css('display', 'block');

  // Configura el cierre del modal al hacer clic en el span de cierre
  $('#closeButtonNuevo').click(function () {
    $('#myModalNuevo').css('display', 'none');
  });

  // También cierra el modal si se hace clic fuera de él
  $(window).click(function (event) {
    if (event.target.id == 'myModalNuevo') {
      $('#myModalNuevo').css('display', 'none');
    }
  });
}









function createXLS (data, reportfilename) {
  var resultgeojson = alasql(`SELECT *
  FROM ? `, [data])
  var opts = [{
    sheetid: 'Reporte',
    headers: true
  }];
  var res = alasql(`SELECT INTO XLSX("${reportfilename}.xlsx",?) FROM ?`, [opts, [resultgeojson]]);
}







