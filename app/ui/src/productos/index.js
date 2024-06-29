import { loadPartials } from '../utils/viewpartials';
import { validarHTML5 } from '../utils/validateForm';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();
import { buscarProducto, getusuariocapacitacion, deleteProducto, saveUserCapacitacion, nuevoUserCapacitacion } from './api';
import { showLoading, hideLoading, checkSession,llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config'
import { showToast } from '../utils/toast';
import '../productos/style.css'

 
   

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
  //checkadminsession(); 
  setTimeout(function() {
    llenarinformacionIESTPProg();
   // marcarSubMenuSeleccionado();
}, 500);  
iniciarcarga();
} 

var lstproductos = null;
var idactualizar = null;
const currentPage = 1; // Reset to the first page
const rowsPerPage = 10; 

 
 

async function buscarUsuario22 () {
  
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
  const data = await buscarProducto(filtro);

    //currentPage = 1; // Reset to the first page
    displayTable(data, rowsPerPage, currentPage);
    displayPagination(data, rowsPerPage);
    

}

document.getElementById('filtrar-producto').addEventListener('click', async  function(e) {
      e.preventDefault();

      buscarUsuario22 ()
});


async function buscarUsuario () {

  $('#filtrar-producto').on('click', async function (e) {

    //e.preventDefault(); 

   
   /* buscarUsuario22()
    
      $('[data-toggle="tooltip"]').tooltip();
      hideLoading()*/
      e.preventDefault();
        currentPage = 1; // Reset to the first page
        displayTable(data, rowsPerPage, currentPage);
        displayPagination(data, rowsPerPage);
 

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

  alertDialog.createAlertDialog(
    'confirm',
    'Confirmar Alerta',
    '¿Estás seguro de que deseas eliminar el producto?',
    'Cancelar',
    'Continuar',
    async() => {
        try {
              
                e.preventDefault();
                /*var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
                if (respuesta) {*/
                  let id = $(this).data('id');  
              
                  let result = await deleteProducto({ id });
                  if (result) {
                    showToast('Se elimino los datos correctamente')
                    buscarUsuario22();
                    await buscarUser();

                  } else {
                    showToast('Ocurrio un error.')
                  }
                /*} else {
                  console.log("El usuario canceló la acción.");
                }*/

              } catch (error) {
                console.error('Error al eliminar la foto de perfil:', error);
              }
      }
      );  
});
 
   

/****crear paginacion */   

 // Datos de ejemplo para llenar la tabla
  
  



async function iniciarcarga(){
  
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
  const data = await buscarProducto(filtro);
  
  // Inicializar la tabla y la paginación 
  displayTable(data, rowsPerPage, currentPage);
  displayPagination(data, rowsPerPage);
  }





async function displayTable(data, rowsPerPage, page) {
  /*const table = document.getElementById('tablaproducto').getElementsByTagName('tbody')[0];
  table.innerHTML = '';*/

 

  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, data.length);
  const paginatedData = data.slice(start, end);
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
  for (let prog of paginatedData) {
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
 

  updateInfo(start + 1, end, data.length);
}

function displayPagination(data, rowsPerPage) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const pageCount = Math.ceil(data.length / rowsPerPage);
  const prevButton = document.createElement('li');
  prevButton.classList.add('paginate_button', 'page-item', 'previous');
  prevButton.innerHTML = `<a href="#" class="page-link">Siguiente</a>`;
  prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
          currentPage--;
          displayTable(data, rowsPerPage, currentPage);
          displayPagination(data, rowsPerPage);
      }
  });
  pagination.appendChild(prevButton);

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(pageCount, currentPage + 2);

  if (startPage > 1) {
      pagination.appendChild(createPageButton(1));
      if (startPage > 2) {
          pagination.appendChild(createEllipsis());
      }
  }

  for (let i = startPage; i <= endPage; i++) {
      pagination.appendChild(createPageButton(i));
  }

  if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
          pagination.appendChild(createEllipsis());
      }
      pagination.appendChild(createPageButton(pageCount));
  }

  const nextButton = document.createElement('li');
  nextButton.classList.add('paginate_button', 'page-item', 'next');
  nextButton.innerHTML = `<a href="#" class="page-link">Anterior</a>`;
  nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < pageCount) {
          currentPage++;
          displayTable(data, rowsPerPage, currentPage);
          displayPagination(data, rowsPerPage);
      }
  });
  pagination.appendChild(nextButton);

  updatePaginationButtons();
}

function createPageButton(page) {
  const button = document.createElement('li');
  button.classList.add('paginate_button', 'page-item');
  button.innerHTML = `<a href="#" class="page-link">${page}</a>`;
  if (page === currentPage) button.classList.add('active');
  button.addEventListener('click', function(e) {
      e.preventDefault();
      currentPage = page;
      displayTable(data, rowsPerPage, currentPage);
      displayPagination(data, rowsPerPage);
  });
  return button;
}

function createEllipsis() {
  const ellipsis = document.createElement('li');
  ellipsis.classList.add('paginate_button', 'page-item', 'disabled');
  ellipsis.innerHTML = `<a href="#" class="page-link">…</a>`;
  return ellipsis;
}

function updatePaginationButtons() {
  const paginationButtons = document.querySelectorAll('.pagination .page-item');
  paginationButtons.forEach(button => button.classList.remove('active'));

  paginationButtons.forEach(button => {
      if (parseInt(button.innerText) === currentPage) {
          button.classList.add('active');
      }
  });
}

function updateInfo(start, end, total) {
  const info = document.getElementById('basicExample_info');
  info.textContent = `Mostrando del ${start} a ${end} de ${total} resultados`;
}

// Inicializar la tabla y la paginación
//displayTable(data, rowsPerPage, currentPage);
//displayPagination(data, rowsPerPage);