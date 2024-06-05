import { listarClientes, filtrarClientes, borrarCliente, actualizarCliente } from './api';

const DEFAULT_PAGE_LIMIT = 10;
let currentPage = 1;
let totalPages = 0; // Declarar totalPages para que esté accesible globalmente

let currentFilter = {}; // Objeto para almacenar el filtro actual

async function cargarCliente() {
  try {
    let clientes;

      // Determinar si se está filtrando o no
      if (Object.keys(currentFilter).length === 0) {
          clientes = await listarClientes(currentPage, DEFAULT_PAGE_LIMIT);
      } else {
          const filtro = {
              ...currentFilter,
              page: currentPage,
              limit: DEFAULT_PAGE_LIMIT
          };
          clientes = await filtrarClientes(filtro);
      }

      //const clientes = await listarClientes(currentPage, DEFAULT_PAGE_LIMIT);
      console.log(clientes)
      cargarTabla(clientes.clientes);
      totalPages = Math.ceil(clientes.totalItems / DEFAULT_PAGE_LIMIT);
      actualizarControlesPaginacion(totalPages);
  } catch (error) {
      console.error('Error:', error);
  }
}

function actualizarControlesPaginacion(totalPages) {
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const currentPageDisplay = document.getElementById('currentPageDisplay');

  prevPageBtn.addEventListener('click', onClickPrevPage);
  nextPageBtn.addEventListener('click', onClickNextPage);

  currentPageDisplay.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = 'page-item';
      const link = document.createElement('a');
      link.className = 'page-link';
      link.href = '#';
      link.textContent = i;
      if (i === currentPage) {
          li.classList.add('active');
      }
      link.addEventListener('click', () => cambiarPagina(i));
      li.appendChild(link);
      currentPageDisplay.appendChild(li);
  }

  // Deshabilitar botones de navegación según la página actual
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

async function cambiarPagina(page) {
  if (page !== currentPage) {
      currentPage = page;
      await cargarCliente();
  }
}

async function onClickNextPage(event) {
  event.preventDefault();
  if (currentPage < totalPages) {
      currentPage++;
      await cargarCliente();
  }
}

async function onClickPrevPage(event) {
  event.preventDefault();
  if (currentPage > 1) {
      currentPage--;
      await cargarCliente();
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
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
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
  } else {
    console.log("El usuario canceló la acción.");
  }

}


async function filtrarClientesAction() {
  const btnFiltrar = document.getElementById('filtrar-Cliente');

  btnFiltrar.addEventListener('click', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre-Cliente').value;
    const apellido = document.getElementById('apellido-Cliente').value;
    const correo = document.getElementById('correo-Cliente').value;

    currentPage = 1;


    // Construir el objeto de filtro
    currentFilter = {
      nombres: nombre,
      apellidos: apellido,
      correo, correo
    };
    /*
    const filtro = {
      nombres:nombre,
      apellidos:apellido,
      correo:correo,
      page:currentPage, 
      limit:DEFAULT_PAGE_LIMIT
    };*/
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
      actualizarControlesPaginacion(totalPages);
    } catch (error) {
      console.error('Error al filtrar pedidos:', error);
    }
    
  });
}
document.addEventListener('DOMContentLoaded', () => {
  cargarCliente();
  filtrarClientesAction();
});
