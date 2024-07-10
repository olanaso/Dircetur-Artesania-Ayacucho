import {guardarSlider, listarSliders, eliminarSlider, obtenerSlider, actualizarSlider} from './api';
import { FileUploader } from '../utils/uploadVictor.js';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();


import { loadPartials } from '../utils/viewpartials';   
import {  hideLoading, llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init'; 


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

}
/*async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}*/
 












let imagen_principal = null;

//var de paginación
const DEFAULT_PAGE_LIMIT = 10;
let currentPage = 1;
let totalPages = 0; // Declarar totalPages para que esté accesible globalmente

 

//carga de imagenes
document.addEventListener('DOMContentLoaded', () => {
  //cargarTablaSliders();
  listarSlider()
  initializeFileUploader({
      fileInputId: 'myfile',
      progressBarId: 'progressBar',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileupload4',
      folder: '/slider/img/',
      callback: handleUploadResponse
  });
  initializeFileUploader({
    fileInputId: 'myfile-editar',
    progressBarId: 'progressBar-editar',
    statusElementId: 'status-editar',
    folder: '/slider/img/',
    uploadUrl: 'http://localhost:3001/api/fileupload4',
    callback: handleEditUploadResponse
  });
});

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

function handleUploadResponse(response) {

  let file = $('#myfile').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#principalImagePreview').attr('src', 'http://localhost:3001/' + response.ruta).show();
      $('#principalImageName').val(file.name);
    }
    reader.readAsDataURL(file);

    imagen_principal = 'http://localhost:3001/' + response.ruta;
  } else {
    alert("Por favor, seleccione un archivo para visualizar.");
  }
}

function handleEditUploadResponse(response) {
  let file = $('#myfile-editar').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#SliderImagePreviewEdit').attr('src', 'http://localhost:3001/' + response.ruta).show();
    }
    reader.readAsDataURL(file);

    imagen_principal = 'http://localhost:3001/' + response.ruta;

    alert('Actualización de la imagen correctamente');
  } else {
    alert("Por favor, seleccione un archivo para visualizar.");
  }
}
//fin carga de imagen

//verificador de imágenes
document.getElementById('myfile').addEventListener('change', function() {
    var file = this.files[0];
    var fileType = file.type;
    var allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(fileType)) {
        alert('Solo se permiten archivos PNG o JPG');
        this.value = '';
    }
});
document.getElementById('myfile-editar').addEventListener('change', function() {
  var file = this.files[0];
  var fileType = file.type;
  var allowedTypes = ['image/png', 'image/jpeg'];

  if (!allowedTypes.includes(fileType)) {
      alert('Solo se permiten archivos PNG o JPG');
      this.value = '';
  }
});
//fi verificador de imágenes

//cargar datos a la tabla:
async function listarSlider() {
  try {
    let sliders = await listarSliders(currentPage, DEFAULT_PAGE_LIMIT);
    cargarTabla(sliders.sliders);
    totalPages = Math.ceil(sliders.totalItems / DEFAULT_PAGE_LIMIT);
    actualizarControlesPaginacion(totalPages, sliders.totalItems);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarTabla(sliders){
  $('#listaSlider').empty()
  let filas = ''
  for (let data of sliders) {
    let cleanUrl = data.imagen.replace(/"/g, '');
      filas += `<tr>
            <td class="border-b border-gray-200 bg-white text-sm">
              <img src="${cleanUrl}" alt="Imagen del slider" width="100">
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${data.descripcion}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
            <button type="button" class="btn btn-info btn-sm btn-editarS" data-toggle="modal" data-target="#modalSliderE" data-id="${data.id}"><i class="icon icon-edit2"></i></button>
            <button type="button" class="btn btn-primary btn-sm btn-eliminarS" data-id="${data.id}"><i class="icon icon-bin"></i></button>
            </td>
          </tr>`
  }
  let tabla_resultado = `
    <table class="table m-0" id="tablaCliente"">
        <thead class="thead-default">
          <tr>
            <th>
              Imagen
            </th>
            <th>
              Frase
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>`+ filas + `
          
        </tbody>
      </table>`
  $('#listaSlider').append(tabla_resultado)
}

//nuevo slider
document.getElementById('formSliderC').addEventListener('submit', async (event) => {
  event.preventDefault();
  const frase = document.getElementById('frase').value;

  //imagen
  var principalImagePreview = document.getElementById('principalImagePreview');
    // Obtener el valor del atributo src
  var foto_referente = principalImagePreview.src;
  
  const formData = {
    descripcion: frase,
    imagen: foto_referente
  };
  
  const form = document.getElementById('formSliderC')
  try {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const result = await guardarSlider(formData);
    if (result) {
        $('#frase').val('')
        $('#imgSlider').val('')
        $('#modalSliderC').modal('hide');
        listarSlider();
        limpiar();
    } else {
        console.error('Error al guardar el slider');
    }
  } catch (error) {
      console.error('Error:', error);
  }
});




//eliminar un slider
$(document).on('click', '.btn-eliminarS', async function (e) {
  const id = $(this).data('id');
  alertDialog.createAlertDialog(
    'confirm',
    'Confirmar Alerta',
    '¿Estás seguro de que deseas eliminar el slider?',
    'Cancelar',
    'Continuar',
    async() => {
      try {
        const result = await eliminarSlider(id);
        if (result) {
            console.log("Slider eliminado exitosamente");
            // Recargar la tabla de sliders
            await listarSlider();
        } else {
            console.error("Error al eliminar el slider:");
        }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  );
});

//editar slider
$(document).on('click', '.btn-editarS', async function (e) {
  const id = $(this).data('id');
  
  try {
      const slider = await obtenerSlider(id);
      let cleanUrl = slider.imagen.replace(/"/g, '');
      $('#SliderImagePreviewEdit').attr('src', cleanUrl).show();
      $('#formSliderE').attr('data-id', slider.id);

      $('#fraseE').val(slider.descripcion); 
      $('#myfile-editar').val(slider.imagen);    


  } catch (error) {
      console.error('Error:', error);
  }
});

$(document).on('submit', '#formSliderE', async function (e) {
  e.preventDefault();
    const id = $(this).data('id');
    const fraseE = document.getElementById('fraseE').value;
    const fileInput = document.getElementById('myfile-editar');

    const formDataE = {
      descripcion: fraseE
    };

    if (fileInput.files[0]) {
      formDataE.imagen= imagen_principal
    } else {
      formDataE.imagen = $('#SliderImagePreviewEdit').attr('src');
    }
  try {
    
    const result = await actualizarSlider(id, formDataE);
    if (result) { 
        $('#fraseE').val('')
        $('#imgSliderE').val('')
        console.log("Slider actualizado exitosamente");
        $('#modalSliderE').modal('hide');
        listarSlider();
    } else {
        console.error("Error al actualizar el slider:", result.message);
    }
  } catch (error) {
      console.error('Error:', error);
  }
});



// controles de paginación:
function actualizarControlesPaginacion(totalPages, totalItems) {
  // Calculamos el rango mostrado actualmente
  const fromItem = (currentPage - 1) * DEFAULT_PAGE_LIMIT + 1;
  let toItem = currentPage * DEFAULT_PAGE_LIMIT;
  if (toItem > totalItems) {
      toItem = totalItems;
  }

  // Actualizamos la información de paginación
  const paginationInfo = document.getElementById('paginationInfo');
  paginationInfo.innerHTML = `Viendo del ${fromItem} a ${toItem} de un total de ${totalItems} resultados`;

  // Limpiamos y generamos los controles de paginación
  const paginationControls = document.getElementById('paginationControls');
  paginationControls.innerHTML = '';

  // Crear botón Previous
  const previousBtn = document.createElement('li');
  previousBtn.className = 'paginate_button page-item previous';
  previousBtn.id = 'apiCallbacks_previous';
  if (currentPage === 1) {
      previousBtn.classList.add('disabled');
  }
  const previousLink = document.createElement('a');
  previousLink.className = 'page-link';
  previousLink.href = '#';
  previousLink.textContent = 'Anterior';
  previousLink.addEventListener('click', () => cambiarPagina(currentPage - 1));
  previousBtn.appendChild(previousLink);
  paginationControls.appendChild(previousBtn);

  // Lógica para generar páginas intermedias con puntos suspensivos
  const maxVisiblePages = 3; // Número máximo de páginas visibles antes de mostrar los puntos suspensivos

  if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement('li');
          pageBtn.className = 'paginate_button page-item';
          if (i === currentPage) {
              pageBtn.classList.add('active');
          }
          const pageLink = document.createElement('a');
          pageLink.className = 'page-link';
          pageLink.href = '#';
          pageLink.textContent = i;
          pageLink.addEventListener('click', () => cambiarPagina(i));
          pageBtn.appendChild(pageLink);
          paginationControls.appendChild(pageBtn);
      }
  } else {
      // Mostrar la primera página
      const firstPageBtn = document.createElement('li');
      firstPageBtn.className = 'paginate_button page-item';
      if (currentPage === 1) {
          firstPageBtn.classList.add('active');
      }
      const firstPageLink = document.createElement('a');
      firstPageLink.className = 'page-link';
      firstPageLink.href = '#';
      firstPageLink.textContent = 1;
      firstPageLink.addEventListener('click', () => cambiarPagina(1));
      firstPageBtn.appendChild(firstPageLink);
      paginationControls.appendChild(firstPageBtn);

      // Agregar puntos suspensivos al inicio si no se muestra la primera página
      if (currentPage > Math.floor(maxVisiblePages / 2) + 1) {
          const ellipsisStart = document.createElement('li');
          ellipsisStart.className = 'paginate_button page-item disabled';
          ellipsisStart.id = 'apiCallbacks_ellipsis';
          const ellipsisLinkStart = document.createElement('a');
          ellipsisLinkStart.className = 'page-link';
          ellipsisLinkStart.href = '#';
          ellipsisLinkStart.textContent = '…';
          ellipsisStart.appendChild(ellipsisLinkStart);
          paginationControls.appendChild(ellipsisStart);
      }

      // Mostrar las páginas visibles
      let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
          const pageBtn = document.createElement('li');
          pageBtn.className = 'paginate_button page-item';
          if (i === currentPage) {
              pageBtn.classList.add('active');
          }
          const pageLink = document.createElement('a');
          pageLink.className = 'page-link';
          pageLink.href = '#';
          pageLink.textContent = i;
          pageLink.addEventListener('click', () => cambiarPagina(i));
          pageBtn.appendChild(pageLink);
          paginationControls.appendChild(pageBtn);
      }

      // Agregar puntos suspensivos al final si no se muestra la última página
      if (endPage < totalPages - 1) {
          const ellipsisEnd = document.createElement('li');
          ellipsisEnd.className = 'paginate_button page-item disabled';
          ellipsisEnd.id = 'apiCallbacks_ellipsis';
          const ellipsisLinkEnd = document.createElement('a');
          ellipsisLinkEnd.className = 'page-link';
          ellipsisLinkEnd.href = '#';
          ellipsisLinkEnd.textContent = '…';
          ellipsisEnd.appendChild(ellipsisLinkEnd);
          paginationControls.appendChild(ellipsisEnd);
      }

      // Mostrar la última página
      const lastPageBtn = document.createElement('li');
      lastPageBtn.className = 'paginate_button page-item';
      if (currentPage === totalPages) {
          lastPageBtn.classList.add('active');
      }
      const lastPageLink = document.createElement('a');
      lastPageLink.className = 'page-link';
      lastPageLink.href = '#';
      lastPageLink.textContent = totalPages;
      lastPageLink.addEventListener('click', () => cambiarPagina(totalPages));
      lastPageBtn.appendChild(lastPageLink);
      paginationControls.appendChild(lastPageBtn);
  }

  // Crear botón Next
  const nextBtn = document.createElement('li');
  nextBtn.className = 'paginate_button page-item next';
  nextBtn.id = 'apiCallbacks_next';
  if (currentPage === totalPages) {
      nextBtn.classList.add('disabled');
  }
  const nextLink = document.createElement('a');
  nextLink.className = 'page-link';
  nextLink.href = '#';
  nextLink.textContent = 'Siguiente';
  nextLink.addEventListener('click', () => cambiarPagina(currentPage + 1));
  nextBtn.appendChild(nextLink);
  paginationControls.appendChild(nextBtn);
}

async function cambiarPagina(page) {
  if (page !== currentPage) {
      currentPage = page;
      await listarSlider();
  }
}

async function onClickNextPage(event) {
  event.preventDefault();
  if (currentPage < totalPages) {
      currentPage++;
      await listarSlider();
  }
}

async function onClickPrevPage(event) {
  event.preventDefault();
  if (currentPage > 1) {
      currentPage--;
      await listarSlider();
  }
}

$('#modalSliderC').on('shown.bs.modal', function () {
  $('#frase').val(''); 
  $('#myfile').val('');
  $('#status').html('');

  
  $('#principalImagePreview').attr('src', '').css('display', 'none');
});

function limpiar()
{
  $('#frase').val(''); 
  $('#myfile').val('');
  $('#status').html('');

  
  $('#principalImagePreview').attr('src', '').css('display', 'none');

}