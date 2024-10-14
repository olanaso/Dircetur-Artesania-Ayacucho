import './styles.css';

import { loadPartials } from "../../utils/viewpartials.js";
import { obtenerArtesanoById, buscarDNI, registrarPedidoCompra } from './api.js';
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
    obtenerProductos()
    showStep(currentStep);     // crearListaInicial();
    adEventBusqDNI()
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
    //obtenerDatosArtesano();
    asignarEventosFormulario();
    iniciarComponenteSubida();
    eventDesactivarSubida();
    eventEnviarCompra();

}

function eventEnviarCompra () {
    $('#btnfinalizarcompra').on('click', async function (e) {

        e.preventDefault();
        let correos = obtenerCorreoEnviar();
        let datosCliente = obtenerdatosCliente();
        let pedido = obtenerPedido();
        try {
            let resultado = await registrarPedidoCompra(correos, datosCliente, pedido)
            if (resultado) {
                eliminarCarritoCompras(ARTESANO.id)
                location.href = "finalizacion-de-compra.html?pedido=" + resultado.num_pedido;


            }
        } catch (error) {
            alert('Ocurrio un error al registrar.')
        }

    })
}

function eliminarCarritoCompras (artesano_id) {

    const dataGuardada = localStorage.getItem('artesanias');
    let artesanias = dataGuardada ? JSON.parse(dataGuardada) : [];
    const artesaniasFiltradas = artesanias.filter(artesania => artesania.id_artesano != artesano_id); // Filtrar el producto a eliminarnue
    localStorage.setItem('artesanias', artesaniasFiltradas);
}



function obtenerCorreoEnviar () {

    let correos = [];
    correos.push($('#correo').val());
    correos.push(ARTESANO.correo)
    return correos.join(',');

}

function obtenerdatosCliente () {
    let cliente = null
    if (formData) {
        cliente =
        {
            "id": 1,
            "nombres": formData.nombres || $('#nombres').val(),
            "apellidos": formData.apellidos || $('#apellidos').val(),
            "correo": formData.correo || $('#correo').val(),
            "telefono": $('#countryCode option:selected').val() + formData.telefono,
            "direccion": formData.direccion_envio || $('#direccion_envio').val(),
            "pais": formData.pais || $('#pais').val(),
            "region": formData.region || $('#region').val(),
            "ciudad": formData.ciudad || $('#ciudad').val(),
            "tipo_documento": "DNI",
            "numero_documento": formData.dni || $('#dni').val(),
            "direccion_envio": formData.mensaje || $('#mensaje').val(),
            "usuario_id": 2,
            "estado": true
        }
    }
    return cliente;
}

function obtenerPedido () {
    let pedido = null
    if (formData && ARTESANO) {
        let artesanias_comprar = listarArtesanias(ARTESANO.id);

        let lst_productos = artesanias_comprar.map(row => ({
            nombre: row.objeto.descripcion_es,
            precio_unitario: row.objeto.precio,
            cantidad: row.cantidad,
            subtotal: row.cantidad * row.objeto.precio,
            descripcion: row.objeto.cualidades_es
        }))

        pedido =
        {
            "artesano_id": ARTESANO.id,
            "cliente_id": null,
            "fecha_pedido": null,
            "list_productos": lst_productos,
            "imagen_pago": JSON.stringify({ "url": urlFileComprobante }),
            "lst_reclamo": [],
            "comprobante_solic": formData.pais,
            "estado": 'pendiente',
            "lst_atencion": []

        }



        pedido.productos = artesanias_comprar.map(row => ({
            nombre: row.objeto.descripcion_es,
            cantidad: row.cantidad,
            precioUnitario: row.objeto.precio
        }));
    }



    return pedido;
}

function validateFile () {

    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    // Verificar si hay un archivo seleccionado
    if (!file) {
        alert('Por favor, selecciona un archivo.');
        return;
    }

    // Verificar el tipo de archivo
    var allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos PNG, JPG, JPEG o PDF.');
        fileInput.value = ''; // Limpiar el input si el archivo no es válido
        return;
    }

    // Verificar el tamaño del archivo (máximo 10 MB)
    var maxSize = 10 * 1024 * 1024; // 10 MB en bytes
    if (file.size > maxSize) {
        alert('El archivo no debe exceder los 10 MB.');
        fileInput.value = ''; // Limpiar el input si el archivo excede el tamaño
        return;
    }

    // Si el archivo es válido
    alert('El archivo es válido y cumple con los requisitos.');
}

window.validateFile = validateFile

function eventDesactivarSubida () {

    $('.custom-file-input').on('change', function (event) {
        var inputFile = event.currentTarget;
        $(inputFile).parent()
            .find('.custom-file-label')
            .html(inputFile.files[0].name);
    });

    // Función para habilitar/deshabilitar el bloque de subida de archivo
    document.getElementById('directPaymentCheck').addEventListener('change', function () {

        const fileUploadBlock = document.getElementById('fileUploadBlock');
        const fileInput = document.getElementById('uploadPrincipalImage');
        const viewBtn = document.getElementById('viewComprobanteBtn');

        if (this.checked) {
            fileUploadBlock.classList.add('disabled'); // Agrega la clase disabled
            fileInput.disabled = true;
            viewBtn.disabled = true;
            fileInput.value = ""; // Limpia el archivo seleccionado
            document.querySelector('.custom-file-label').innerHTML = "Elige el archivo";
        } else {
            fileUploadBlock.classList.remove('disabled'); // Remueve la clase disabled
            fileInput.disabled = false;
            viewBtn.disabled = false;
        }
    });
}



//carga de imagen de perfil de cliente
function initializeFileUploader ({ fileInputId, progressBarId, statusElementId, uploadUrl, folder, callback }) {

    const fileInput = document.getElementById(fileInputId);
    const inputName = fileInput.name;
    const progressBar = document.getElementById(progressBarId);
    const statusElement = document.getElementById(statusElementId);

    if (fileInput && progressBar && statusElement) {
        const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName, folder);
        uploader.attachToFileInput(fileInput);
    } else {
        console.error('Initialization failed: One or more elements not found.');
    }
}

var urlFileComprobante = ""
function handleUploadResponseimgprincipal (response) {

    $('#viewComprobanteBtn').attr('href', getBasePathWithPort() + '/' + response.path)
    urlFileComprobante = getBasePathWithPort() + '/' + response.path
    $('#viewComprobanteBtn').show();

}


function iniciarComponenteSubida () {
    initializeFileUploader({
        fileInputId: 'uploadPrincipalImage',
        progressBarId: 'progressBar',
        statusElementId: 'status',
        uploadUrl: baseUrl + '/artesano/fileupload',
        callback: handleUploadResponseimgprincipal,
        folder: '/proceso-compra/'
    });
}


function adEventBusqDNI () {
    $('#btn_buscar_dni').click(async function () {
        let $btn = $(this); // Obtener el botón
        let dni = $('#dni').val();

        // Deshabilitar el botón y agregar loading
        $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span>');

        try {
            let data = await buscarDNI(dni);
            console.log(data);
            $('#nombres').val(data.nombres);
            $('#apellidos').val(data.apellidoPaterno + ' ' + data.apellidoMaterno);
        } catch (error) {
            console.error("Error en la búsqueda", error);
            // Aquí puedes mostrar un mensaje de error al usuario si es necesario
        } finally {
            // Rehabilitar el botón y restaurar el texto
            $btn.prop('disabled', false).html(`<i
										class= "fa fa-search" ></i > `);
        }
    });
}



function formatearNumero (numero) {
    return numero.toLocaleString('es-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function asignarEventosFormulario () {
    $('input, textarea, select').on('input change', handleChange);
}

var formData = {};

// Función para manejar los cambios y actualizar el objeto
function handleChange (event) {
    var elementId = $(this).attr('id'); // Obtener el id del elemento
    var value = $(this).val();          // Obtener el valor ingresado
    formData[elementId] = value;        // Actualizar el objeto con el id y valor

    // Actualizar el contenido de la sección donde se mostrará el objeto
    // console.log(formData)
}

// Asignar el evento de cambio a todos los inputs, textareas y selects


function obtenerProductos () {

    const queryString = window.location.search;
    // Parsear la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtener el valor del parámetro 'data'
    const artesano_id = urlParams.get('artesano');
    setArtesano(artesano_id)
    // alert(artesano_id)
    let artsanias_comprar = listarArtesanias(artesano_id);
    console.log(artsanias_comprar)
    listarProductosComprar(artsanias_comprar)
}

var ARTESANO = null;
async function setArtesano (artesano_id) {

    $('#link_artesano').attr('href', 'artesano.html?id=' + artesano_id)
    debugger
    ARTESANO = await obtenerArtesanoById(artesano_id)

    console.log(ARTESANO)

    ARTESANO.lst_mediospago = JSON.parse(JSON.parse(ARTESANO.lst_mediospago))
    console.log(ARTESANO.lst_mediospago)
    showCuentasArtesano(ARTESANO.lst_mediospago)
    $('#nombre_artesano').text(ARTESANO.nombres + ' ' + ARTESANO.apellidos)

}

function getIcon (pago) {
    switch (pago) {
        case 'BCP':
            return '<i class="fas fa-university"></i>'; // Ícono para BCP
        case 'YAPE':
            return '<i class="fas fa-mobile-alt"></i>'; // Ícono para Yape
        default:
            return '<i class="fas fa-credit-card"></i>'; // Ícono genérico
    }
}

function showCuentasArtesano (datos) {

    const container = document.getElementById('datos-container');
    datos.forEach(dato => {
        const div = document.createElement('div');
        div.classList.add('form-check');

        // Crear la etiqueta principal con el tipo de pago
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', `step4${dato.Pago}`);
        label.innerHTML = `  <span class="highlight-text">${dato.Pago}</span>`;

        // Crear el pequeño texto con el número de cuenta y CCI
        const small = document.createElement('small');
        small.classList.add('form-text');
        small.innerHTML = `Titular: <strong>${dato.Titular}</strong><br>Nº cuenta: <strong>${dato.Corriente}</strong><br>CCI: <strong>${dato.Interbancaria || 'N/A'}</strong>`;

        // Añadir elementos al div
        div.appendChild(label);
        div.appendChild(small);

        // Añadir el div al contenedor
        container.appendChild(div);
    });
}


function listarProductosComprar (artsanias_comprar) {

    let total = 0
    $('#listproducts').html('')
    let filas = ''
    for (let artesania of artsanias_comprar) {
        filas += `
<tr>
									<td class="d-flex align-items-center">
										<img style="height: 100px;    max-height: 100%;   max-width: 100%;    object-fit: cover;" src="${artesania.objeto.imagen_principal || 'https://via.placeholder.com/80'}" class="rounded mr-3" alt="Producto 1">
										${artesania.objeto.descripcion_es}
									</td>
									<td>${artesania.cantidad}</td>
									<td>${formatearNumero(artesania.objeto.precio)}</td>
									<td>${formatearNumero(artesania.cantidad * artesania.objeto.precio)} </td>
								</tr>
`
        total += artesania.cantidad * artesania.objeto.precio
    }


    $('#listproducts').html(filas)

    filas = ''
    $('#lista-resumen-prod-final').html('')
    for (let artesania of artsanias_comprar) {
        filas += `

        <tr>
												<td>${artesania.objeto.descripcion_es} (${artesania.cantidad} unidad)</td>
												<td>${formatearNumero(artesania.objeto.precio)}</td>
											</tr>


`

    }

    $('#lista-resumen-prod-final').html(filas)

    $('#total_precio_carrito').text('S/.' + formatearNumero(total))
    $('#total_final').text('S/.' + formatearNumero(total))

}


function listarArtesanias (artesano_id) {

    const dataGuardada = localStorage.getItem('artesanias');
    let artesanias = dataGuardada ? JSON.parse(dataGuardada) : [];

    const artesaniasFiltradas = artesanias.filter(artesania => artesania.id_artesano == artesano_id); // Filtrar el producto a eliminarnue
    if (artesaniasFiltradas.length == 0) {
        alert('No se encontro ningun producto del artesano.')
        location.href = "/tienda/"
    }
    return artesaniasFiltradas
}

// pasos de la compra
var currentStep = 1;

function showStep (step) {

    $('.step').removeClass('active');
    $('#step' + step).addClass('active');
    $('.stepper-item').removeClass('active');
    $('.stepper-item').slice(0, step).addClass('active');
}

function validateStep (step) {
    var isValid = true;

    // Validar los campos del formulario
    $('#step' + step + ' .form-control').each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Validar el checkbox en el paso 4
    if (step === 3) {
        var checkboxTerminos = $('#terminos');
        var checkboxPrivacidad = $('#privacidad');
        var isValid = true;

        if (!checkboxTerminos.is(':checked')) {
            isValid = false;
            checkboxTerminos.addClass('is-invalid');
            alert("Debe aceptar los Términos y Condiciones antes de continuar.");
        } else {
            checkboxTerminos.removeClass('is-invalid');
        }

        if (!checkboxPrivacidad.is(':checked')) {
            isValid = false;
            checkboxPrivacidad.addClass('is-invalid');
            alert("Debe aceptar la Política de Privacidad antes de continuar.");
        } else {
            checkboxPrivacidad.removeClass('is-invalid');
        }

        return isValid;
    }


    return isValid;
}

$('.next').click(function () {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    } else {
        if (currentStep !== 4) {
            showToast("Por favor, complete los campos antes de continuar.");
        }
    }
});

$('.prev').click(function () {
    currentStep--;
    showStep(currentStep);
});




