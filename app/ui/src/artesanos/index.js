import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { buscarArtesano,  deleteArtesano } from './api';
import { showLoading, hideLoading, checkSession } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config'
import { showToast } from '../utils/toast';
import '../artesanos/style.css'
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
  buscarArtesano22();
  buscarUsuario();
  exportarExcel(); 

}
async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}
 
 
 

async function buscarArtesano22 () {
  

   
      showLoading() 

      const Nombre = document.getElementById('nombre').value;
      const Correo = document.getElementById('correo').value; 
      const filtro = {
        nombre:Nombre,
        correo:Correo 
      }; 
      lstartesanos = await buscarArtesano(filtro);
      
    

      // Obtener la referencia del elemento HTML donde se insertará la tabla
      let tabla = document.getElementById('tablaartesano');

      // Limpiar la tabla antes de insertar nuevos datos
      tabla.innerHTML = '';

      // Crear una fila para los encabezados de la tabla
      let encabezados = '<tr> <th>N°</th><th>Nombre y Apellidos</th><th>Correo</th><th>Tipo</th> <th  style="text-align: center;">Acciones</th></tr>';

      // Agregar los encabezados a la tabla
      tabla.innerHTML += encabezados;

      // Recorrer la lista de certificados y pintar los datos en la tabla

      // Inicializar el contador
      let correlativo = 1;
      for (let prog of lstartesanos) {
        // Crear una fila para cada certificado

        let fila = '<tr>';
        // Agregar las celdas con los datos del certificado
        fila += `<td>${correlativo}</td>`;  
        fila += `<td>${prog.completo}</td>`;
        fila += `<td>${prog.correo}</td>`;
        fila += `<td>${prog.tipousuario}</td>`; 
        fila += `<td style="text-align: center;"><a href="/artesanos-detalle.html?id=${prog.id}" data-toggle="tooltip" title="Editar" data-id="${prog.id}" class="btn btn-info btn-sm" > <i class="icon icon-edit2"></i></a> `;
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
var lstartesanos = null; 
var idactualizar = null;
async function buscarUsuario () {

  $('#filtrar-artesano').on('click', async function (e) {

    e.preventDefault(); 

   
    buscarArtesano22()
    
      $('[data-toggle="tooltip"]').tooltip();
      hideLoading()
 

  })


  async function buscarUsuario2 () {
 
    showLoading() 

    const Nombre = document.getElementById('nombre').value;
    const Correo = document.getElementById('correo').value; 
    const filtro = {
      nombre:Nombre,
      correo:Correo 
    }; 
    lstartesanos = await buscarArtesano(filtro);
 

    // Obtener la referencia del elemento HTML donde se insertará la tabla
    let tabla = document.getElementById('tablaartesano');

    // Limpiar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';

    // Crear una fila para los encabezados de la tabla
    let encabezados = '<tr> <th>N°</th><th>Nombre y Apellidos</th><th>Correo</th><th>Tipo</th> <th  style="text-align: center;">Acciones</th></tr>';

    // Agregar los encabezados a la tabla
    tabla.innerHTML += encabezados;

    // Recorrer la lista de certificados y pintar los datos en la tabla

    // Inicializar el contador
    let correlativo = 1;
    for (let prog of lstartesanos) {
      // Crear una fila para cada certificado

      let fila = '<tr>';
      // Agregar las celdas con los datos del certificado
      fila += `<td>${correlativo}</td>`;  
      fila += `<td>${prog.completo}</td>`;
      fila += `<td>${prog.correo}</td>`;
      fila += `<td>${prog.tipousuario}</td>`; 
      fila += `<td style="text-align: center;"><a href="/artesanos-detalle.html?id=${prog.id}" data-toggle="tooltip" title="Editar" data-id="${prog.id}" class="btn btn-info btn-sm" > <i class="icon icon-edit2"></i></a> `;
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
 

}

 


$(document).on('click', '.btn_Eliminar', async function (e) { 

  e.preventDefault();
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    let id = $(this).data('id');  
 
    let result = await deleteArtesano({ id });
    if (result) {
      showToast('Se elimino los datos correctamente')
      buscarArtesano22();
      await buscarUser();

    } else {
      showToast('Ocurrio un error.')
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

});
 
   