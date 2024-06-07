import { listarClientes, filtrarClientes, borrarCliente, actualizarCliente } from './api';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();
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
      actualizarControlesPaginacion(totalPages, clientes.totalItems);
  } catch (error) {
      console.error('Error:', error);
  }
}

//controles de paginación:
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
//fin controles de paginación

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
    const apellido = document.getElementById('apellido-Cliente').value;
    const correo = document.getElementById('correo-Cliente').value;

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
