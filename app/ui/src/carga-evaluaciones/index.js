import { loadPartials } from '../utils/viewpartials';
import { saveUser, getprogramasbyIESTP, getusuarioDNI, deleteUser,importarNotas } from './api';
import { hideLoading, showLoading, checkSession, llenarinformacionIESTPProg } from '../utils/init';
import { showToast } from '../utils/toast';
import { getDataFromLocalStorage, } from '../utils/config'
 
hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menuadmin.html', container: 'app-side' },


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
  checkadminsession()
  //setDrp()
  //cargarDatosusuario();
  // buscarlibro();
  cargarcomboprogramas()
  //eventorol()
  buscarUsuario()
  llenarinformacionIESTPProg();
  guardarUsuario()
  cambiarClave()
  importarUsuariosacction()

}

async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}

function eventorol () {
 /* $('#drprol').change((e) => {
    let valor = $('#drprol option:selected').val()
    if (valor != 3) {
      $('#drpprogramas').val(0)
    }
  })*/
}

async function cargarcomboprogramas () {
  let usuario = getDataFromLocalStorage('session').usuario;
  $('#txt_iestpid_upload').text(usuario.iestpid)
  let result = await getprogramasbyIESTP(usuario.iestpid)
  $('#drpprogramas').empty()
  $('#drpprogramascodigo').empty()
  $('#drpprogramas').append(`<option value="0">TODOS</option>`)
  for (let prog of result) {
    $('#drpprogramas').append(`<option value="${prog.id}">${prog.denominacion}</option>`)
    $('#drpprogramascodigo').append(`<option value="${prog.id}">${prog.id} - ${prog.denominacion}</option>`)

  }


}



async function buscarUsuario () {

  $('#btn_buscar_usuario').on('click', async function (e) {
    e.preventDefault();

    $("#btn_buscar_usuario").prop("disabled", true);
    let dni = $('#txt-dni').val()
    let usuario = await getusuarioDNI(dni)
    if (usuario) {
      showToast(' Se encontro en DNI en el Sistema.')
      $('#txt-dni').val(usuario.dni)
      $('#txt-nombres').val(usuario.nombres)
      $('#txt-apellidos').val(usuario.apellidos)
      $('#txt-correo').val(usuario.correo)
      $('#txt-telefonos').val(usuario.telefonos)
      $('#txt-telefonos').val(usuario.telefonos)
      $('#drpprogramas').val(usuario.programaid)
      $('#drprol').val(usuario.rolid)
      $('#btnactualizar').prop("disabled", false);
      $('#btneliminar').prop("disabled", false);
      $('#btnguardar').prop("disabled", true);
    } else {
      showToast('DNI no se encuentra en el Sistema.')
      //$('#txt-dni').val('')
      $('#txt-nombres').val('')
      $('#txt-apellidos').val('')
      $('#txt-correo').val('')
      $('#txt-telefonos').val('')
      $('#txt-telefonos').val('')
      $('#drpprogramas').val('')
      $('#drprol').val('')

      $('#btnactualizar').prop("disabled", true);
      $('#btneliminar').prop("disabled", true);
      $('#btnguardar').prop("disabled", false);
    }
    $("#btn_buscar_usuario").prop("disabled", false);

  })


}

async function cargarDatosusuario () {
  let usuario = getDataFromLocalStorage('session').usuario;
  console.log(usuario)
  $('#txt-dni').val(usuario.dni)
  $('#txt-nombres').val(usuario.nombres)
  $('#txt-apellidos').val(usuario.apellidos)
  $('#txt-correo').val(usuario.correo)
  $('#txt-telefonos').val(usuario.telefonos)
  let rol = "";
  if (usuario.rolid == 1) {
    rol = "ADMINISTRADOR"
  }
  if (usuario.rolid == 2) {
    rol = "DOCENTE"
  }
  if (usuario.rolid == 3) {
    rol = "ESTUDIANTE"
  }
  $('#txt-rol').val(rol)

  let programas = usuario.programas.map(item => item.denominacion).join(', ');
  $('#txt-programa').val(programas)

}

async function guardarUsuario () {

  let usuario = getDataFromLocalStorage('session').usuario;

  //Registrando usuario
  $('#btnguardar').on('click', async function (e) {
    e.preventDefault();
    $("#btnguardar").prop("disabled", true).text("Registrando...");
    let dni = $('#txt-dni').val()
    let clave = $('#txt-dni').val()
    let nombres = $('#txt-nombres').val()
    let apellidos = $('#txt-apellidos').val()
    let correo = $('#txt-correo').val()
    let telefonos = $('#txt-telefonos').val()
    let programaid = $('#drpprogramas option:selected').val()
    let rolid = $('#drprol option:selected').val()
    let iestpid = usuario.iestpid
    let result = await saveUser({ dni, nombres, apellidos, correo, telefonos, programaid, rolid,clave,iestpid });
    if (result) {
      showToast('Se guardo los datos correctamente')
    } else {
      showToast('Ocurrio un error.')
    }
    $("#btnguardar").prop("disabled", false).text("Registrar");

  })


  //actualiando usuarios

  $('#btnactualizar').on('click', async function (e) {
    e.preventDefault();
    $("#btnactualizar").prop("disabled", true).text("Actualizando...");
    let dni = $('#txt-dni').val()
    let clave = $('#txt-dni').val()
    let nombres = $('#txt-nombres').val()
    let apellidos = $('#txt-apellidos').val()
    let correo = $('#txt-correo').val()
    let telefonos = $('#txt-telefonos').val()
    let programaid = $('#drpprogramas option:selected').val()
    let rolid = $('#drprol option:selected').val()
    let iestpid = usuario.iestpid
    let result = await saveUser({ dni, nombres, apellidos, correo, telefonos, programaid, rolid });
    if (result) {
      showToast('Se actualizo los datos correctamente')
    } else {
      showToast('Ocurrio un error.')
    }
    $("#btnactualizar").prop("disabled", false).text("Actualizar");

  })

  //Eliminando usuarios

  $('#btneliminar').on('click', async function (e) {
    e.preventDefault();
    var respuesta = confirm("¿Estás seguro de que deseas eliminar?");

    // Verifica la respuesta del usuario
    if (respuesta) {
      $("#btneliminar").prop("disabled", true).text("Eliminando...");
      
      let dni = $('#txt-dni').val()
      let nombres = $('#txt-nombres').val()
      let apellidos = $('#txt-apellidos').val()
      let correo = $('#txt-correo').val()
      let telefonos = $('#txt-telefonos').val()
      let programaid = $('#drpprogramas option:selected').val()

      let rolid = $('#drprol option:selected').val()
      let result = await deleteUser({ dni, nombres, apellidos, correo, telefonos, programaid, rolid });
      if (result) {
        showToast('Se actualizo los datos correctamente')
      } else {
        showToast('Ocurrio un error.')
      }
      $("#btneliminar").prop("disabled", false).text("Eliminar");
    } else {
      console.log("El usuario canceló la acción.");
    }



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

function IMportar () {
  $('#btnbuscarlibro').on('click', function (e) {
    $("#btnbuscarlibro").prop("disabled", true).text("Buscando...");
    createPaginate()
    $("#btnbuscarlibro").prop("disabled", false).text("Búscar");
  })
}


function importarUsuariosacction(){
  $('#btnimportarusuarios').on('click', async function (e) {
   
    await subirExcel ()
   
  })
}

async function subirExcel () {
  $("#btnbuscarlibro").prop("disabled", true).text("Importando...");
  var file = document.getElementById('inputGroupFile02').files[0];
  if (file) {
    let result = await leerXLSX(file);
    console.log(result)

    let resultimportacion= await importarNotas(result)
    createXLS (resultimportacion, 'Reporte-importacion')
    $("#btnbuscarlibro").prop("disabled", false).text("Importar");
    return result
  }
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




function leerXLSX (file) {
  return new Promise((resolve, reject) => {

    console.log('Archivo seleccionado:', file.name);

    const reader = new FileReader();

    reader.onload = (e) => {

      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, { type: 'array' });

      // Leer la primera hoja de cálculo
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convertir los datos a un arreglo de objetos
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length == 0) {

        alert("Archivo Vacio", `El archivo no tiene ningúna fila registrada.`)
        return;
      }

      return resolve(jsonData);



      //console.log(jsonData)

      // Imprimir los datos

    };

    reader.onerror = (e) => {
      // Rechazar la promesa con el error
      reject(e);
    };

    reader.readAsArrayBuffer(file);
  });
}