import {listarCategorias,listarProductos} from './api'

import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'

//  href = /clientes-detalle.html?id=${data.id}
document.addEventListener('DOMContentLoaded', () => {
    cargarSelectorCategoria();
    productos()
});

async function cargarProductos(productos) {
    $('#contenedorProductos').empty();
    let cards = '';
    let productCount = 0; // Initialize product count
    for (let data of productos) {
        cards += `
            <div class="col-md-4 col-sm-6">
                <div class="car-item wow fadeIn animated" data-wow-duration="0.75s" style="visibility: visible;-webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s;">
                    <div class="thumb-content">
                        <div class="car-banner">
                            <a href="principal-detalle.html?id=${data.id}">En Venta</a>
                        </div>
                        <div class="thumb-inner">
                            <a href="principal-detalle.html?id=${data.id}"><img src=${data.imagen_principal} alt=""></a>
                        </div>
                    </div>
                    <div class="down-content">
                        <a href="principal-detalle.html?id=${data.id}"><h4>${data.nombres_es}</h4></a>
                        <span>S/. ${data.precio} </span>
                        <p>${data.resumen_es}</p>
                        <div class="similar-info">
                            <div class="primary-button">
                                <a href="principal-detalle.html?id=${data.id}">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        productCount++; // Increment product count
    }
    $('#contenedorProductos').append(cards);
    console.log(`Total products: ${productCount}`); // Log the total number of products

    // Update the product count in the specified HTML element
    const textContentElement = document.querySelector('.contador-productos');
    textContentElement.innerHTML = `
        <h2>${productCount}</h2>
        <span>Resultados de busqueda</span>
    `;

    return productCount; // Return the total number of products
}
async function productos() {
    const formData = {
        categoria: $('#brand').prop('selectedIndex') == "0" ? '': $('#brand option:selected').val(),
        oferta: '',
        precio_min: '',
        precio_max: ''
    }
    const productos = await listarProductos(formData);
    cargarProductos(productos)
    console.log("producto: ", productos);

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
        correo: correo
      };
      try {
        // Filtrar pedidos con los parámetros actuales
        const filtro = {
          ...currentFilter,
          page: currentPage,
          limit: DEFAULT_PAGE_LIMIT
        };
        //console.log("filtro:", filtro)
        const clientesFiltrados = await filtrarClientes(filtro);

        cargarTabla(clientesFiltrados.clientes);

        totalPages = Math.ceil(clientesFiltrados.totalItems / DEFAULT_PAGE_LIMIT);
        actualizarControlesPaginacion(totalPages, clientesFiltrados.totalItems);
      } catch (error) {
        console.error('Error al filtrar pedidos:', error);
      }

    });
  }

async function cargarSelectorCategoria() {
    const categorias = await listarCategorias()
    let insertOptions = '';
    const Select = document.getElementById('brand');
    categorias.forEach(cat => {
      insertOptions += `<option value="${cat.id}">${cat.denominacion}</option>`;
    });
    let options = `<option value ="0">Seleccione Categoría</option>` + insertOptions
    Select.innerHTML = options;
  }