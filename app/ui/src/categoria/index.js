import { listarCategorias, guardarCategoria, filtrarCategorias, borrarCategoria, actualizarCategoria } from './api';
import { FileUploader } from '../utils/upload.js';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();

let imagen_principal = "";
async function cargarCategoria() {
  try {
    const categorias = await listarCategorias();
    cargarTabla(categorias);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarTabla(categorias) {
  const tablaCategoria = document.getElementById('tablaCategoria');
  const tablaCategoriaBody = tablaCategoria.getElementsByTagName('tbody')[0];

  tablaCategoriaBody.innerHTML = '';

  categorias.forEach(categoria => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${categoria.id}</td>
      <td><img src="${categoria.foto_referente}" alt="${categoria.denominacion}" width="100"></td>
      <td>${categoria.denominacion}</td>
      <td>${categoria.abreviatura}</td>
      <td>${categoria.descripcion}</td>
      <td>
        <button type="button" class="btn btn-info btn-editar-categoria btn-sm">
          <i class="icon icon-edit2"></i>
        </button>
        <button type="button" class="btn btn-primary btn-eliminar-categoria btn-sm">
          <i class="icon icon-bin"></i>
        </button>
      </td>
    `;

    // Agregar eventos a los botones
    const btnEditar = row.querySelector('.btn-editar-categoria');
    btnEditar.addEventListener('click', () => editarCategoria(categoria));

    const btnEliminar = row.querySelector('.btn-eliminar-categoria');
    btnEliminar.addEventListener('click', () => eliminarCategoria(categoria.id));

    tablaCategoriaBody.appendChild(row);
  });
}

async function eliminarCategoria(id) {

  alertDialog.createAlertDialog(
    'confirm',
    'Confirmar',
    '¿Estás seguro que quieres eliminar la categoria?',
    'Cancelar',
    'Continuar',
    async () => {
      try {
        const result = await borrarCategoria(id);
        if (result) {
          await cargarCategoria();
        } else {
          console.error("Error al eliminar la categoria");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  );

}

async function editarCategoria(categoria) {
  const form = document.getElementById('actualizar-categoria-form');
  const modal = document.getElementById('modalCategoriaEditar');
  const abreviaturaInput = document.getElementById('abreviatura-editar');
  const denominacionInput = document.getElementById('denominacion-editar');
  const descripcionInput = document.getElementById('descripcion-editar');
  const fileInput = document.getElementById('myfile-editar');

  abreviaturaInput.value = categoria.abreviatura;
  denominacionInput.value = categoria.denominacion;
  descripcionInput.value = categoria.descripcion;
  $('#CategoriaImagePreviewEdit').attr('src', categoria.foto_referente).show();

  $(modal).modal('show');

  const guardarBtn = document.getElementById('guardarCambios');
  guardarBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const formData = {
      abreviatura: abreviaturaInput.value,
      denominacion: denominacionInput.value,
      descripcion: descripcionInput.value
    }
    
    if (fileInput.files[0]) {
      formData.foto_referente = imagen_principal
    } else {
      formData.foto_referente = categoria.foto_referente;
    }
    // Verificar si el formulario es válido antes de continuar
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const result = await actualizarCategoria(categoria.id, formData);
      console.log('Categoría actualizada:', result);
      await cargarCategoria();
      $(modal).modal('hide');
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  });
}

async function registrarCategoria() {
  const btnRegistrar = document.getElementById('registrar-categoria');


  const modal = document.getElementById('modalCategoria');

  btnRegistrar.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      // Obtener los valores del formulario
      const abreviatura = document.getElementById('abreviatura').value;
      const denominacion = document.getElementById('denominacion').value;
      const descripcion = document.getElementById('descripcion').value;


      var principalImagePreview = document.getElementById('principalImagePreview');

      // Obtener el valor del atributo src
      var foto_referente = principalImagePreview.src;

      const formData = {
        abreviatura: abreviatura,
        denominacion: denominacion,
        descripcion: descripcion,
        foto_referente: foto_referente
      }
      const response = await guardarCategoria(formData);
      console.log(response);
      await cargarCategoria();
      $(modal).modal('hide');
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

async function filtrarCategoriasAction() {
  const btnFiltrar = document.getElementById('filtrar-categoria');

  btnFiltrar.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = document.getElementById('id-categoria').value;
    const abreviatura = document.getElementById('abreviatura-categoria').value;
    const denominacion = document.getElementById('denominacion-categoria').value;
    const filtro = {
      id: id,
      abreviatura: abreviatura,
      denominacion: denominacion
    };
    const categorias = await filtrarCategorias(filtro);
    cargarTabla(categorias);
  });
}
document.addEventListener('DOMContentLoaded', () => {

  initializeFileUploader({
    fileInputId: 'myfile',
    progressBarId: 'progressBar',
    statusElementId: 'status',
    uploadUrl: 'http://localhost:3001/api/fileupload4',
    folder: '/categorias/',
    callback: handleUploadResponse
  });
  initializeFileUploader({
    fileInputId: 'myfile-editar',
    progressBarId: 'progressBar-editar',
    statusElementId: 'status-editar',
    uploadUrl: 'http://localhost:3001/api/fileupload4',
    folder: '/categorias/',
    callback: handleEditUploadResponse
  });


  cargarCategoria();
  registrarCategoria();
  filtrarCategoriasAction();


});


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

function initializeFileUploader({ fileInputId, progressBarId, statusElementId, uploadUrl, folder, callback }) {


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
  
  let file = $('#myfile').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#principalImagePreview').attr('src', 'http://localhost:3001/' + response.ruta).show();
      $('#principalImageName').val(file.name);
    }
    reader.readAsDataURL(file);

    imagen_principal = 'http://localhost:3001/' + response.ruta;

    alert('registro de la imagen correctamente')
  } else {
    alert("Por favor, seleccione un archivo para visualizar.");
  }

}

function handleEditUploadResponse(response) {
  let file = $('#myfile-editar').prop('files')[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $('#CategoriaImagePreviewEdit').attr('src', 'http://localhost:3001/' + response.ruta).show();
    }
    reader.readAsDataURL(file);

    imagen_principal = 'http://localhost:3001/' + response.ruta;

    alert('Actualización de la imagen correctamente');
  } else {
    alert("Por favor, seleccione un archivo para visualizar.");
  }
}
