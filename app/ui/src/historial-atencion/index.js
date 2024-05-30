import { obtenerPedido, actualizarPedido } from '../historial-atencion/api';


// Tab Información
const numPedido = document.getElementById('num-pedido');
const fechaPedido = document.getElementById('fecha-pedido');
const imagenCompra = document.getElementById('imagen-compra');
const btnImagenCompra = document.getElementById('button-imagen-compra');

const nombreArtesano = document.getElementById('nombre-artesano');

const nombreCliente = document.getElementById('nombre-cliente');
const tipoDocumentoCliente = document.getElementById('tipo-doc-cliente');
const numeroDocumentoCliente = document.getElementById('numDocum-cliente');
const correoCliente = document.getElementById('correo-cliente');
const telefonoCliente = document.getElementById('telefono-cliente');
const wspCliente = document.getElementById('wsp-cliente');


const paisRecepcion = document.getElementById('pais-recepcion');
const regionRecepcion = document.getElementById('region-recepcion');
const ciudadRecepcion = document.getElementById('ciudad-recepcion');
const direccionRecepcion = document.getElementById('direccion-recepcion');

const montoTotal = document.getElementById('total-pedido');

// Tab Atención
const formAtencion = document.getElementById('form-actualizar-historia');
// Tab Reclamo


async function cargarCampos(idPedido) {
    const pedido = await obtenerPedido(idPedido);

    cargarTablaProductos(pedido);
    // cargarTablaHistoriaPedido(pedido);
    // Tab Información
    numPedido.value = pedido.num_pedido;
    fechaPedido.value = formatearFecha(pedido.fecha_pedido);
    nombreArtesano.value = pedido.artesano['nombres'] + ' ' + pedido.artesano['apellidos'];
    nombreCliente.value = pedido.cliente['nombres'] + ' ' + pedido.cliente['apellidos'];
    tipoDocumentoCliente.innerHTML = pedido.cliente['tipo_documento'];
    numeroDocumentoCliente.value = pedido.cliente['numero_documento'];
    correoCliente.value = pedido.cliente['correo'];
    telefonoCliente.value = pedido.cliente['telefono'];
    paisRecepcion.value = pedido.cliente['pais'];
    regionRecepcion.value = pedido.cliente['region'];
    ciudadRecepcion.value = pedido.cliente['ciudad'];
    direccionRecepcion.value = pedido.cliente['direccion'];
    wspCliente.setAttribute('href', `https://wa.me/${pedido.cliente['telefono']}`);


    // Tab Atención




    // Tab Reclamo

}
function cargarTablaProductos(pedidos) {
    var sumaSubtotal = 0;
    const tablaDatosPedido = document.getElementById('tablaDatosPedido');
    const tablaDatosPedidoBody = tablaDatosPedido.getElementsByTagName('tbody')[0];
    const listaPedidos = JSON.parse(pedidos.list_productos);

    tablaDatosPedidoBody.innerHTML = '';

    listaPedidos.forEach(pedido => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${pedido.cantidad}</td>
            <td>${pedido.nombre}</td>
            <td>${pedido.descripcion}</td>
            <td>${pedido.precio_unitario}</td>
            <td>${pedido.subtotal}</td>
        `;

        tablaDatosPedidoBody.appendChild(row);
        sumaSubtotal += pedido.subtotal;
    });
    montoTotal.innerHTML = `Total: S/ ${sumaSubtotal}`;
}
function cargarTablaHistoriaPedido(pedidos) {
    const tablaDatosPedido = document.getElementById('tablaHistoriaPedidos');
    const tablaHistoriaPedido = tablaDatosPedido.getElementsByTagName('tbody')[0];
    if (pedidos.list_atencion == null) {
        return "No hay historial de pedidos";
    }
    const listaAtencion = JSON.parse(pedidos.list_atencion);

    tablaHistoriaPedido.innerHTML = '';

    listaAtencion.forEach(pedido => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${formatearFecha(pedido.fecha_atencion)}</td>
            <td>${pedido.comentario}</td>
            <td>${pedido.estado}</td>
            <td>${pedido.estado}</td>
            <td>
				<button class="btn btn-primary btn-notificar-email btn-sm">Notificar email</button>
				<button class="btn btn-success btn-notificar-wsp btn-sm">Notificar WhatsApp</button>
			</td>
        `;
        const btnNotificarEmail = row.querySelector('.btn-notificar-email');
        btnNotificarEmail.addEventListener('click', () => notificarEmail(pedido.id));

        const btnNotificarWsp = row.querySelector('.btn-notificar-wsp');
        btnNotificarWsp.addEventListener('click', () => notificarWsp(pedido.id));
        tablaHistoriaPedido.appendChild(row);
    });

}

function notificarEmail(id) {
    console.log("notificar email");
}

function notificarWsp(id) {
    console.log("notificar wsp");
}

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatearFecha(fecha) {
    const date = new Date(fecha);

    const anio = date.getUTCFullYear(); // Obtener el año (ej. 2024)
    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Obtener el mes (ej. 05)
    const dia = ('0' + date.getUTCDate()).slice(-2); // Obtener el día (ej. 27)

    return `${dia}/${mes}/${anio}`;
}

function generarID() {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(aleatorio);
    }

    return id;
}

// Tab atención
const initialState = {
    id: generarID(),
    estado: "",
    notificarCliente: true,
    enlaceSeguimiento: "",
    comentario: "",
    medioPrueba: null,
    fecha_atencion: new Date()
};

function useFormState(initialState) {
    let state = { ...initialState };

    function handleChange(event) {
        const { name, type, value, checked, files } = event.target;
        const newValue = type === 'checkbox' ? checked : (type === 'file' ? files[0] : value);

        state = {
            ...state,
            [name]: newValue
        };

        console.log(state);
    }

    function loadInitialData(form) {
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                const input = form.querySelector(`[name=${key}]`);

                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = state[key];
                    } else if (input.type === 'radio') {
                        input.checked = input.value === state[key];
                    } else if (input.type === 'file') {
                        // No se puede establecer un valor predeterminado para un input de tipo 'file'
                    } else {
                        input.value = state[key];
                    }
                }
            }
        }
    }

    return { handleChange, loadInitialData };
}

async function editarPedido(idPedido) {
    const btnActualizar = document.getElementById('btnActualizarHistoria');
    btnActualizar.addEventListener('click', async (event) => {
        event.preventDefault();
        
    })
    // const btnActualizar = document.getElementById('btnActualizarHistoria');
    // btnActualizar.addEventListener('click', async (event) => {
    //     event.preventDefault(); 
    //     try {
    //         const result = await actualizarPedido(idPedido, {
    //             list_atencion: {...list_atencion, initialState},
    //             estado: initialState.estado
    //         });
    //         console.log('Categoría actualizada:', result);
    //     } catch (error) {
    //         console.error('Error al actualizar la categoría:', error);
    //     }
    // })
   
}

document.addEventListener('DOMContentLoaded', () => {
    const pedidoId = getQueryParameter('id');
    cargarCampos(pedidoId);


    const { handleChange, loadInitialData } = useFormState(initialState);
    loadInitialData(formAtencion);

    formAtencion.addEventListener("change", handleChange);
});