import './styles.css';

import { loadPartials } from "../../utils/viewpartials.js";
import { obtenerPedidoById } from './api.js';
import { custom } from '../utils/common.js';
import { FileUploader } from '../../utils/uploadJorge.js';
import { baseUrl, getBasePathWithPort } from '../../utils/config.js';

(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        // import('../utils/common');
        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
        setTimeout(function () {
            custom()
        }, 1000)

    } catch (e) {
        console.error(e);
    }
})();



function startApp () {

    cargaInformacionPedido()
}

async function cargaInformacionPedido () {

    const queryString = window.location.search;
    // Parsear la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtener el valor del parámetro 'data'
    const pedido_id = urlParams.get('pedido');

    let data = await obtenerPedidoById(pedido_id)
    // console.log(datosPedido)
    $('#artesano-vendido').text(data.artesano.nombres + ' ' + data.artesano.apellidos)
    $('#artesano-vendido').attr("href", "artesano.html?id=" + data.artesano.id)



    // Insertar información básica del pedido
    document.getElementById("order-number").textContent = data.num_pedido;
    $("#nropedido").text(data.num_pedido);
    const formattedDate = new Date(data.fecha_pedido).toLocaleString();
    document.getElementById("order-date").textContent = formattedDate;

    // Parsear productos
    const productos = JSON.parse(data.list_productos);
    const total = productos.reduce((acc, prod) => acc + prod.subtotal, 0);
    document.getElementById("order-total").textContent = total.toFixed(2);
    document.getElementById("products-total").textContent = total.toFixed(2);

    // Insertar productos en la tabla
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiar la tabla antes de agregar los productos
    productos.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${product.nombre}</td>
                <td>${product.cantidad}</td>
                <td>S/. ${product.precio_unitario.toFixed(2)}</td>
                <td>S/. ${product.subtotal.toFixed(2)}</td>
            `;
        productList.appendChild(row);
    });

    // Insertar estado del pedido (Atenciones)
    const statusList = document.getElementById("order-status-list");
    statusList.innerHTML = ""; // Limpiar la lista antes de agregar los estados
    const atenciones = JSON.parse(data.list_atencion);
    atenciones.forEach((atencion, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
                ${index + 1}. Estado: ${atencion.estado}
                <span class="text-muted ${colorEstado(atencion.estado)}" >${atencion.fecha_atencion}</span>
            `;
        statusList.appendChild(li);
    });



    // Opcional: Mostrar el botón para contactar al artesano
    $('#contact-artist-btn').attr("href", "https://wa.me/+51" + data.artesano.celular)

}

function colorEstado (selectedValue) {
    let retorno = "estado-pendiente"
    switch (selectedValue) {
        case "pendiente":
            retorno = "estado-pendiente"
            break;
        case "pagado":
            retorno = "estado-pagado"
            break;
        case "enviado":
            retorno = "estado-enviado"
            break;
        case "finalizado":
            retorno = "estado-finalizado"
            break;
        case "anulado":
            retorno = "estado-anulado"
            break;
    }
    return retorno
}


