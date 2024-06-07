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

}
async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
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

  }
 

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
 
   