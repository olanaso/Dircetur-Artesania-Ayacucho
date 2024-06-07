import { listarClientes, filtrarClientes, borrarCliente, actualizarCliente } from './api';


async function cargarCliente() {
  try {
    const Clientes = await listarClientes();
    cargarTabla(Clientes);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarTabla(Clientes){
  $('#listaClientes').empty()
  let filas = ''
  for (let data of Clientes) {
    let estado = '';
    if (data.estado) {
      estado = '<span class="badge badge-pill badge-success">Activo</span>';
    } else {
      estado = '<span class="badge badge-pill badge-danger">Desactivo</span>';
    }
      filas += `<tr>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${data.id}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${data.nombres + " " + data.apellidos}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${data.correo}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${estado}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              <button type="button" class="btn btn-light btn-sm">
                <a href="/detalle-cliente.html?id=${data.id}"><i class="icon icon-eye2"></i></a>
              </button>
              <button type="button" class="btn btn-primary btn-sm ml-2" data-id="${data.id}">
                <i class="icon icon-bin"></i>
              </button>
            </td>
          </tr>`
  }
  let tabla_resultado = `
    <table class="table m-0" id="tablaCliente"">
        <thead class="thead-default">
          <tr>
            <th>
              ID
            </th>
            <th>
              Nombres y Apellidos
            </th>
            <th>
              Correo
            </th>
            <th>
              Estado
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>`+ filas + `
          
        </tbody>
      </table>`
  $('#listaClientes').append(tabla_resultado)
  document.querySelectorAll('.btn-primary.btn-sm.ml-2').forEach(button => {
    button.addEventListener('click', () => {
      //const id = button.getAttribute('data-id');
      eliminarCliente(button.getAttribute('data-id'));
    });
  });
}



async function eliminarCliente(id) {
  //var respuesta = confirm("¿Estás seguro de que deseas eliminar?");

  alertDialog.createAlertDialog(
    'confirm',
    'Confirm Alert',
    '¿Estás seguro de que deseas eliminar el slider?',
    'Cancelar',
    'Continuar',
    async() => {
      try {
        const result = await borrarCliente(id);
        if (result) {
  
            console.log("Cliente eliminado exitosamente");
            // Recargar la tabla de Clientes
            await cargarCliente();
        } else {
            console.error("Error al eliminar la Cliente");
        }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  );

}

//filtro
async function filtrarClientesAction() {
  const btnFiltrar = document.getElementById('filtrar-Cliente');

  btnFiltrar.addEventListener('click', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre-Cliente').value;
    const correo = document.getElementById('correo-Cliente').value;
    const filtro = {
      nombres:nombre,
      correo:correo
    };
    const Clientes = await filtrarClientes(filtro);
    cargarTabla(Clientes);

    currentPage = 1;


    // Construir el objeto de filtro
    currentFilter = {
      nombres: nombre,
      apellidos: apellido,
      correo, correo
    };
    try {
      // Filtrar pedidos con los parámetros actuales
      const filtro = {
        ...currentFilter,
        page: currentPage,
        limit: DEFAULT_PAGE_LIMIT
      };
      console.log("filtro:", filtro)
      const clientesFiltrados = await filtrarClientes(filtro);
      //const Clientes = await filtrarClientes(filtro);
      console.log("aaaaaaaa:" ,clientesFiltrados.clientes)
      cargarTabla(clientesFiltrados.clientes);
      
      totalPages = Math.ceil(clientesFiltrados.totalItems / DEFAULT_PAGE_LIMIT);
      actualizarControlesPaginacion(totalPages, clientesFiltrados.totalItems);
    } catch (error) {
      console.error('Error al filtrar pedidos:', error);
    }
    
  });
}
document.addEventListener('DOMContentLoaded', () => {
  cargarCliente();
  filtrarClientesAction();
});
