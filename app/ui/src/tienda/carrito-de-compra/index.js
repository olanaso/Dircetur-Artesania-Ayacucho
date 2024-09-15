

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortadaBusqueda, busquedaProductos } from './api.js';
import { custom } from '../utils/common.js';


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
    obtenerUrlProducto();
    crearListaInicial();
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
}

function crearListaInicial () {

    // generarDatosDummy(); // Generar datos dummy
    generarInterfaz();
}

function obtenerUrlProducto () {
    const queryString = window.location.search;

    // Parsear la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtener el valor del parámetro 'data'
    const data = urlParams.get('producto');

    // Decodificar y convertir el objeto JSON nuevamente
    if (data) {
        const artesaniaenviada = JSON.parse(decodeURIComponent(data));

        // Mostrar el objeto en el DOM
        console.log(artesaniaenviada)

        guardarArtesania(
            artesaniaenviada.artesano_id + '' + artesaniaenviada.id + '' + artesaniaenviada.categoria_id,
            artesaniaenviada.datos,
            artesaniaenviada.artesano,
            artesaniaenviada.artesano_id,
            1
        );


    } else {
        console.log('Ningun Objeto recibido')
    }
    generarInterfaz();
}

function generarURL () {

    const formulario = $('#miFormulario');
    const formData = new FormData(formulario[0]);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
        if (value) {  // Solo agregar a la URL si el valor no está vacío
            params.append(key, value);
        }
    });

    // Redirige a la misma página con los nuevos parámetros en la URL
    window.location.href = '?' + params.toString();

    // Previene el submit tradicional
    return false;
}

// Asigna la función generarURL al evento submit del formulario
$('#miFormulario').submit(generarURL);

// Rellena el formulario con los valores de la URL
function rellenarFormulario () {

    setTimeout(function () {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            const campo = $(`[name=${key}]`);

            if (campo.is('input') || campo.is('select')) {
                campo.val(value);
            }
        });
    }, 1000)


}

// Rellena el formulario con los valores de la URL


function formatearNumero (numero) {
    return numero.toLocaleString('es-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}




/*Para manejar el carrito de compras*/


function generarUUID6 () {
    // Caracteres permitidos para el UUID
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uuid = '';

    // Generar una cadena de 6 caracteres
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        uuid += caracteres[randomIndex];
    }

    return uuid;
}


// Función para listar las artesanías desde localStorage
function listarArtesanias () {
    const dataGuardada = localStorage.getItem('artesanias');
    return dataGuardada ? JSON.parse(dataGuardada) : [];
}


function generarDatosDummy () {
    const artesaniasDummy = [
        { id: '1', objeto: { nombre: 'Jarrón de barro', caracteristica: 'Rojo, 30x30cm', precio: 40, imagen: '' }, artesano: 'Nombre del artesano 1', id_artesano: 1, cantidad: 1 },
        { id: '2', objeto: { nombre: 'Cuadro pintado', caracteristica: 'Acrílico, 50x70cm', precio: 120, imagen: '' }, artesano: 'Nombre del artesano 1', id_artesano: 1, cantidad: 1 },
        { id: '3', objeto: { nombre: 'Cartera de cuero', caracteristica: 'Negra, cuero auténNegra, cuero auténNegra, cuero auténNegra, cuero auténtico', precio: 40, imagen: '' }, artesano: 'Nombre del artesano 2', id_artesano: 2, cantidad: 1 },

    ];
    localStorage.setItem('artesanias', JSON.stringify(artesaniasDummy));
}
// Función para generar la interfaz agrupando por artesano
function generarInterfaz () {
    const artesanias = listarArtesanias(); // Obtener las artesanías desde localStorage

    const artesanosAgrupados = agruparPorArtesano(artesanias); // Agrupar productos por artesano
    console.log(artesanosAgrupados)
    const contenedor = document.getElementById('contenedor-carrito'); // Contenedor donde se va a mostrar la interfaz

    contenedor.innerHTML = ''; // Limpiar el contenido del contenedor
    let contador = 1
    // Iterar sobre cada artesano y sus productos
    for (const artesano in artesanosAgrupados) {
        let subtotal = 0;
        const productos = artesanosAgrupados[artesano];
        const artesano_id = productos[0]?.id_artesano;
        // Crear la estructura del grupo por artesano
        const grupoHTML = `
       
                    <div class="card mb-4">
                        <div class="card-header" style="background:#ea0397; color:#fff">
                         
                            <div class="d-flex align-items-center mt-3" title="Artesano">
									
										<span class="text-dark"> 
                                        <a style="color:#fff !important" href="../principal-artesano.html?id=50">
                               <h3>Artesano ${contador}: ${artesano}</h3>
                                        </a></span>

                                        
	
                                        	<div class="line-dec2" style:"float:right"=""></div>
								
									</div>
                        </div>
                        <div class="card-body">
                            ${productos.map(producto => {

            subtotal += producto.cantidad * producto.objeto.precio; // Calcular subtotal
            return `
                                    <div class="row mb-3">
                                        <div class="col-md-2">
                                            <img src="${producto.objeto.imagen_principal || 'https://via.placeholder.com/150'}" class="img-fluid" alt="imagen producto">
                                        </div>
                                        <div class="col-md-8">
                                            <h5>${producto.objeto.descripcion_es}</h5>
                                            <p><b>Descripción:</b> ${producto.objeto.cualidades_es}</p>
                                            <p><b>Precio:</b> S/. ${formatearNumero(producto.objeto.precio)}</p>
                                            <p><b>Cantidad: </b>  
                                                <button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad('${producto.id}', ${producto.cantidad - 1})">-</button>
                                                ${producto.cantidad}
                                                <button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad('${producto.id}', ${producto.cantidad + 1})">+</button>
                                            </p>
                                        </div>
                                        <div class="col-md-2 text-right">
                                            <button class="btn btn-danger" onclick="eliminarArtesania('${producto.id}')" title="Eliminar artesania"><i class="fa fa-trash fa-2" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <hr>`;
        }).join('')}
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <strong><b>Subtotal:</b> S/. ${subtotal.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <strong>Total a pagar (incluye impuestos): S/. ${(subtotal).toFixed(2)}</strong>
                                   <a href="proceso-de-compra.html?artesano=${artesano_id || '0'}"> <button   class="btn btn-primary ml-2">Realizar compra</button>
                                   </a>
                                </div>
                            </div>
                        </div>
                    </div>
                     <br/>
                `;

        // Insertar el HTML generado en el contenedor
        contenedor.innerHTML += grupoHTML;
        contador++
    }
}

// Función para agrupar las artesanías por artesano
function agruparPorArtesano (artesanias) {
    return artesanias.reduce((grupo, item) => {
        (grupo[item.artesano] = grupo[item.artesano] || []).push(item);
        return grupo;
    }, {});
}

function guardarArtesania (id, objeto, artesano, id_artesano, cantidad) {



    const artesanias = listarArtesanias(); // Obtener la lista de artesanías

    // Verificar si el producto ya existe por su ID
    const index = artesanias.findIndex(artesania => artesania.id === id);

    if (index !== -1) {
        // Si ya existe, incrementar la cantidad en 1
        artesanias[index].cantidad += 1;
    } else {
        // Si no existe, agregar la nueva artesanía
        const nuevaArtesania = { id, objeto, artesano, id_artesano, cantidad };
        artesanias.push(nuevaArtesania);
    }

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('artesanias', JSON.stringify(artesanias));


    // const artesanias = listarArtesanias();
    // const nuevaArtesania = { id, objeto, artesano, id_artesano, cantidad };
    // artesanias.push(nuevaArtesania);
    // localStorage.setItem('artesanias', JSON.stringify(artesanias));
}
// Función para modificar la cantidad de un producto
function modificarCantidad (id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarArtesania(id); // Si la cantidad es 0 o menor, eliminar el producto
        return;
    }

    const artesanias = listarArtesanias(); // Obtener la lista de productos
    const index = artesanias.findIndex(artesania => artesania.id === id); // Encontrar el producto por ID

    if (index !== -1) {
        artesanias[index].cantidad = nuevaCantidad; // Modificar la cantidad
        localStorage.setItem('artesanias', JSON.stringify(artesanias)); // Guardar en localStorage
        generarInterfaz(); // Volver a renderizar la interfaz
    }
}

window.modificarCantidad = modificarCantidad

// Función para eliminar un producto por ID con confirmación
function eliminarArtesania (id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
    if (!confirmacion) {
        return; // Si el usuario cancela, no se elimina el producto
    }

    const artesanias = listarArtesanias(); // Obtener la lista de productos
    const nuevasArtesanias = artesanias.filter(artesania => artesania.id !== id); // Filtrar el producto a eliminarnue
    if (nuevasArtesanias.length == 0) {
        location.href = "/tienda/"
    }
    localStorage.setItem('artesanias', JSON.stringify(nuevasArtesanias)); // Guardar la nueva lista
    generarInterfaz(); // Volver a renderizar la interfaz
}

window.eliminarArtesania = eliminarArtesania

// Generar datos dummy y generar la interfaz al cargar la página
