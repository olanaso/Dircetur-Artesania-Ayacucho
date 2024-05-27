import {guardarSlider, listarSliders, eliminarSlider, obtenerSlider, actualizarSlider} from './api';


document.getElementById('imgSlider' || 'imgSliderE').addEventListener('change', function() {
    var file = this.files[0];
    var fileType = file.type;
    var allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(fileType)) {
        alert('Solo se permiten archivos PNG o JPG');
        this.value = '';
    }
});
document.getElementById('visualizar').addEventListener('click', function() {
    var imagen = document.getElementById('imgSlider' || 'imgSliderE').files[0];
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
      const tablaSliderBody = document.getElementById('tablaSlider').getElementsByTagName('tbody')[0];

      // Limpiar el contenido existente del tbody
      tablaSliderBody.innerHTML = '';

      // Iterar sobre los sliders y crear las filas de la tabla
      sliders.forEach(slider => {
          const row = tablaSliderBody.insertRow();

          const cellImagen = row.insertCell(0);
          const cellFrase = row.insertCell(1);
          const cellAcciones = row.insertCell(2);

          cellImagen.innerHTML = `<img src="${slider.imagen}" alt="Imagen del slider" width="100">`;
          cellFrase.textContent = slider.descripcion;

          cellAcciones.innerHTML = `
              <button type="button" class="btn btn-info btn-sm btn-editarS" data-toggle="modal" data-target="#modalSliderE" data-id="${slider.id}"><i class="icon icon-edit2"></i></button>
              <button type="button" class="btn btn-primary btn-sm btn-eliminarS" data-id="${slider.id}"><i class="icon icon-bin"></i></button>
          `;
      });
  } catch (error) {
      console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarTablaSliders();
});

//nuevo slider
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formSliderC').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const frase = document.getElementById('frase').value;
      const imagenInput = document.getElementById('imgSlider').value;
      
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