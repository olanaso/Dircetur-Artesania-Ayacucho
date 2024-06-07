import {guardarSlider, listarSliders, eliminarSlider, obtenerSlider, actualizarSlider} from './api';
import { FileUploader } from '../utils/upload.js';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();
let imagen_principal = null;
//carga de imagenes
document.addEventListener('DOMContentLoaded', () => {
  cargarTablaSliders();
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
  //alert('registro correcto')
  //alert(response.ruta)

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
    alertDialog.createAlertDialog(
      'warning',
      'Warning Alert',
      'Por favor, seleccione un archivo para visualizar.',
      'Aceptar',
      'Cerrar',
      () => { }
    );
    //alert("Por favor, seleccione un archivo para visualizar.");
  }
}
//fin carga de imagen

document.getElementById('myfile').addEventListener('change', function() {
    var file = this.files[0];
    var fileType = file.type;
    var allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(fileType)) {
        alert('Solo se permiten archivos PNG o JPG');
        this.value = '';
    }
});


//cargar datos a la tabla:
async function cargarTablaSliders() {
  try {
      const sliders = await listarSliders();
      $('#listaSlider').empty()
      let filas = ''
      for (let data of sliders) {
          filas += `<tr>
                <td class="border-b border-gray-200 bg-white text-sm">
                  <img src="${data.imagen}" alt="Imagen del slider" width="100">
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
  } catch (error) {
    console.error('Error:', error);
  }
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
    console.log(result)
    if (result) {
        $('#frase').val('')
        $('#imgSlider').val('')
        $('#modalSliderC').modal('hide');
        cargarTablaSliders();
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
  /*
  alertDialog.createAlertDialog(
    'confirm',
    'Confirm Alert',
    '¿Estás seguro de que deseas eliminar?',
    'No',
    'Si',
    (inputValue) => {
        return true;
    }
  );*/
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    try {
      const result = await eliminarSlider(id);
      if (result) {
          console.log("Slider eliminado exitosamente");
          // Recargar la tabla de sliders
          await cargarTablaSliders();
      } else {
          console.error("Error al eliminar el slider:");
      }
    } catch (error) {
        console.error('Error:', error);
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

});

//editar slider
$(document).on('click', '.btn-editarS', async function (e) {
  const id = $(this).data('id');
  try {
      const slider = await obtenerSlider(id);
      $('#fraseE').val(slider.descripcion);
      $('#SliderImagePreviewEdit').attr('src', slider.imagen).show();
      $('#formSliderE').attr('data-id', slider.id);
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
        cargarTablaSliders();
    } else {
        console.error("Error al actualizar el slider:", result.message);
    }
  } catch (error) {
      console.error('Error:', error);
  }
});
