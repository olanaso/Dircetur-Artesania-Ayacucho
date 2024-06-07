import {guardarSlider, listarSliders, eliminarSlider, obtenerSlider, actualizarSlider} from './api';
import { FileUploader } from '../utils/upload.js';

//carga de imagenes
document.addEventListener('DOMContentLoaded', () => {
  cargarTablaSliders();
  initializeFileUploader({
      fileInputId: 'myfile',
      progressBarId: 'progressBar',
      statusElementId: 'status',
      uploadUrl: 'http://localhost:3001/api/fileupload2',
      callback: handleUploadResponse
  });
});

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

function handleUploadResponse(response) {
  // Manejar la respuesta del servidor
  //console.log('Server response:', response);
  alert('registro correcto')

  alert(response.ruta)

  let file = $('#myfile').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log("response.ruta: ", response.ruta)
      $('#principalImagePreview').attr('src', 'http://localhost:3001/' + response.ruta).show();
      $('#principalImageName').val(file.name);
    }
    reader.readAsDataURL(file);

    imagen_principal = 'http://localhost:3001/' + response.ruta;

    alert('registro correcto')
  } else {
    alert("Por favor, seleccione un archivo para visualizar.");
  }

  // Ejemplo: Usar el resultado en otro lugar
  // document.getElementById('someElement').innerText = response.someValue;
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

document.getElementById('visualizar').addEventListener('click', function() {
    var imagen = document.getElementById('myfile').files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var imagenSrc = event.target.result;
      var newTab = window.open();
      newTab.document.write('<img src="' + imagenSrc + '">');
    };
    reader.readAsDataURL(imagen);
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
  const imagenInput = document.getElementById('myfile').value;
  const formData = {
    descripcion: frase,
    imagen: imagenInput
  };
  try {
    const result = await guardarSlider(formData);
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

      $('#modalSliderE #fraseE').val(slider.descripcion);
      $('#modalSliderE #imgSliderE').val(slider.frase);

      // $('#formSliderE').data('id', slider.id);
      $('#formSliderE').attr('data-id', slider.id);
  } catch (error) {
      console.error('Error:', error);
  }
});

$(document).on('submit', '#formSliderE', async function (e) {
  e.preventDefault();
    const id = $(this).data('id');
    const fraseE = document.getElementById('fraseE').value;
    const imagenInputE = document.getElementById('imgSliderE').value;
    
    const formDataE = {
      descripcion: fraseE,
      imagen: imagenInputE
    };
    console.log("datos de guardado:"+id, formDataE);
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
