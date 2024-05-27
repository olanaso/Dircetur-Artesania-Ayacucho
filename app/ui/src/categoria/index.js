import { listarCategorias, guardarCategoria, filtrarCategorias, borrarCategoria, actualizarCategoria } from './api';


document.getElementById('fotoReferente').addEventListener('change', function () {
  var file = this.files[0];
  var fileType = file.type;
  var allowedTypes = ['image/png', 'image/jpeg'];

  if (!allowedTypes.includes(fileType)) {
    alert('Solo se permiten archivos PNG o JPG');
    this.value = '';
  }
});
document.getElementById('visualizar').addEventListener('click', function () {
  var imagen = document.getElementById('fotoReferente').files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var imagenSrc = event.target.result;
    var newTab = window.open();
    newTab.document.write('<img src="' + imagenSrc + '">');
  };
  reader.readAsDataURL(imagen);
});

async function cargarCategoria() {
  try {
    const categorias = await listarCategorias();
    cargarTabla(categorias);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarTabla(categorias){
  const tablaCategoriaBody = document.getElementById('tablaCategoria').getElementsByTagName('tbody')[0];

  // Limpiar el contenido existente del tbody
  tablaCategoriaBody.innerHTML = '';
  categorias.forEach(categoria => {
    const row = tablaCategoriaBody.insertRow();

    const cellID = row.insertCell(0);
    const cellImagen = row.insertCell(1);
    const cellDenominacion = row.insertCell(2);
    const cellAbreviatura = row.insertCell(3);
    const cellDescripcion = row.insertCell(4);
    const cellAcciones = row.insertCell(5);

    cellID.textContent = categoria.id;
    cellImagen.innerHTML = `<img src="${categoria.imagen}" alt="${categoria.denominacion}" width="100">`;
    cellDenominacion.textContent = categoria.denominacion;
    cellAbreviatura.textContent = categoria.abreviatura;
    cellDescripcion.textContent = categoria.descripcion;

    //botones de editar y eliminar con eventos asociados
    const editarBtn = document.createElement('button');
    editarBtn.type = 'button';
    editarBtn.className = 'btn btn-info btn-sm';
    editarBtn.innerHTML = '<i class="icon icon-edit2"></i>';
    editarBtn.addEventListener('click', () => editarCategoria(categoria));
    
    const eliminarBtn = document.createElement('button');
    eliminarBtn.type = 'button';
    eliminarBtn.className = 'btn btn-primary btn-sm ml-2';
    eliminarBtn.innerHTML = '<i class="icon icon-bin"></i>';
    eliminarBtn.addEventListener('click', () => eliminarCategoria(categoria.id));
    cellAcciones.appendChild(editarBtn);
    cellAcciones.appendChild(eliminarBtn);
  });
}
async function eliminarCategoria(id) {
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    try {
      const result = await borrarCategoria(id);
      if (result) {

          console.log("categoria eliminado exitosamente");
          // Recargar la tabla de categorias
          await cargarCategoria();
      } else {
          console.error("Error al eliminar la categoria");
      }
    } catch (error) {
        console.error('Error:', error);
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

}

async function editarCategoria(categoria) {
  // Llenar el modal con los datos de la categoría seleccionada
  const modal = document.getElementById('modalCategoriaEditar');
  const abreviaturaInput = document.getElementById('abreviatura-editar');
  const denominacionInput = document.getElementById('denominacion-editar');
  const descripcionInput = document.getElementById('descripcion-editar');

  abreviaturaInput.value = categoria.abreviatura;
  denominacionInput.value = categoria.denominacion;
  descripcionInput.value = categoria.descripcion;

  // Mostrar el modal
  $(modal).modal('show');

  const guardarBtn = document.getElementById('guardarCambios');
  guardarBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      // Actualizar los datos de la categoría en tu estructura de datos
      categoria.abreviatura = abreviaturaInput.value;
      categoria.denominacion = denominacionInput.value;
      categoria.descripcion = descripcionInput.value;

      try {
          const result = await actualizarCategoria(categoria.id, 
            {
              abreviatura: categoria.abreviatura,
              denominacion: categoria.denominacion,
              descripcion: categoria.descripcion
              // agregar después el campo para actualizar la imagen
          });

          console.log('Categoría actualizada:', result);
          await cargarCategoria();
          $(modal).modal('hide');

      } catch (error) {
          console.error('Error al actualizar la categoría:', error);
      }
  });
}


async function registrarCategoria() {
  const btnRegistrar = document.getElementById('modalCategoria');
  const modal = document.getElementById('modalCategoriaEditar');

  btnRegistrar.addEventListener('click', async (event) => {
    try {
      // Obtener los valores del formulario
      const abreviatura = document.getElementById('abreviatura').value;
      const denominacion = document.getElementById('denominacion').value;
      const descripcion = document.getElementById('descripcion').value;
      const fotoReferente = document.getElementById('fotoReferente').value;

      const formData = {
        abreviatura: abreviatura,
        denominacion: denominacion,
        descripcion: descripcion,
        // foto_referente: fotoReferente
      }
      const response = await guardarCategoria(formData);
      console.log(response)
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
      id:id,
      abreviatura:abreviatura,
      denominacion:denominacion
    };
    const categorias = await filtrarCategorias(filtro);
    cargarTabla(categorias);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  cargarCategoria();
  registrarCategoria();
  filtrarCategoriasAction();
});