

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
    // crearListaInicial();
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

    console.log(data)

    // Decodificar y convertir el objeto JSON nuevamente
    if (data) {
        const artesaniaenviada = JSON.parse(data);

        // Mostrar el objeto en el DOM
        console.log(artesaniaenviada)

        guardarArtesania(artesaniaenviada);


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

function listarProductosDeseados () {
    const dataGuardada = localStorage.getItem('artesaniasdeseadas');
    return dataGuardada ? JSON.parse(dataGuardada) : [];
}

function guardarArtesania ({ id, artesania, artesano }) {



    const artesanias = listarProductosDeseados(); // Obtener la lista de artesanías

    // Verificar si el producto ya existe por su ID
    const index = artesanias.findIndex(item => item.id === id);

    if (index !== -1) {
        // Si ya existe, incrementar la cantidad en 1
        // artesanias[index].cantidad += 1;
    } else {
        // Si no existe, agregar la nueva artesanía
        const nuevaArtesania = { id, artesania, artesano };
        artesanias.push(nuevaArtesania);
    }

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('artesaniasdeseadas', JSON.stringify(artesanias));


    // const artesanias = listarArtesanias();
    // const nuevaArtesania = { id, objeto, artesano, id_artesano, cantidad };
    // artesanias.push(nuevaArtesania);
    // localStorage.setItem('artesanias', JSON.stringify(artesanias));
}
// Función para modificar la cantidad de un producto


// Función para eliminar un producto por ID con confirmación
function eliminarArtesania (id) {
    const confirmacion = confirm('¿ Estás seguro de que deseas eliminar el producto deseado ?');
    if (!confirmacion) {
        return; // Si el usuario cancela, no se elimina el producto
    }

    const artesanias = listarProductosDeseados(); // Obtener la lista de productos
    const nuevasArtesanias = artesanias.filter(artesania => artesania.id !== id); // Filtrar el producto a eliminar
    localStorage.setItem('artesaniasdeseadas', JSON.stringify(nuevasArtesanias)); // Guardar la nueva lista
    generarInterfaz(); // Volver a renderizar la interfaz
}

window.eliminarArtesania = eliminarArtesania

// Generar datos dummy y generar la interfaz al cargar la página

function generarInterfaz () {
    const artesanias = listarProductosDeseados(); // Obtener las artesanías desde localStorage

    const contenedor = document.getElementById('contenedor-deseados'); // Contenedor donde se va a mostrar la interfaz

    contenedor.innerHTML = ''; // Limpiar el contenido del contenedor

    // Iterar sobre cada artesano y sus productos
    for (let item of artesanias) {
        let { id, artesania, artesano } = item;
        const grupoHTML = `
        
       <div class="row product-card">
				<div class="col-md-3">
					<a href="detalle-producto.html" title="Ver detalle del producto">

                    <div class="product-image">
                    <img style="height:150px; width:100%; object-fit: cover; border:none; "  src="${artesania.imagen_principal || 'https://via.placeholder.com/150'}" alt="Imagen del producto">
                    </img>
                    </div>
						
					</a>
				</div>
				<div class="col-md-6">
					<a href="busqueda.html?nombre_producto=${artesania.nombre_es}" title="Ver detalle del producto">
						<h4>${artesania.nombre_es}</h4>
					</a>
					<div class="artesano-info">
						<img src="${artesano.foto1 || 'https://via.placeholder.com/150'}" alt="Foto del artesano" class="artesano-photo">
						<a href="artesano.html?id=${artesano.id}"><span style="color:#757575">${artesano.nombres}</span></a>
					</div>


				</div>
				<div class="col-md-3 text-right">
					<p><strong><b>Precio:</b> S/.  ${formatearNumero(artesania.precio)}</strong></p>
					<div class="product-actions">

						<a href="carrito-de-compra.html?producto=${artesania.url_carrito}"><button class="btn " style="background-color: rgb(252, 0, 172); color: #FFF;" type="button"
							title="Añadir al carrito">
							<i class="fa fa-cart-plus" aria-hidden="true"></i>
						</button>
                        </a>
						<button class="btn btn-danger" style="background-color: rgb(246, 9, 9);" type="button"
							title="Eliminar producto"
                            onclick="eliminarArtesania('${id}')"
                            >
							<i class="fa fa-trash" aria-hidden="true"></i>
						</button>
					</div>
				</div>
			</div>
                   
                `;

        // Insertar el HTML generado en el contenedor
        contenedor.innerHTML += grupoHTML;

    }
}
