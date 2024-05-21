
import { validarHTML5 } from '../utils/validateForm';
import { buscarCertificados } from './api';

import './styles.css'



activarEventoBusqueda();



let skeletonLoading = `
 <div class="w-full max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div class="flex p-4 bg-gray-200 text-gray-500 uppercase font-semibold text-xs">
            <div class="flex-1">NOMBRES COMPLETOS</div>
            <div class="flex-1">CURSO</div>
            <div class="flex-1">FECHA DE EMISIÓN</div>
            <div class="flex-1">CÓDIGO</div>
            <div class="flex-1">CERTIFICADO</div>
        </div>
        <div class="animate-pulse divide-y divide-gray-200">
            <!-- Fila 1 -->
            <div class="flex p-4 space-x-4">
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
            <!-- Fila 2 -->
            <div class="flex p-4 space-x-4">
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
            <!-- Fila 3 -->
            <div class="flex p-4 space-x-4">
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                <div class="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
`
async function activarEventoBusqueda () {

    $('#btnbuscar').on('click', function (event) {
        //event.preventDetault()
        validarHTML5('form', async function () {
            // alert(1)
            $("#btnbuscar").prop("disabled", true).text("Búscando certificados en la base de datos...");
            $('#listacertificados').empty()
            buscarCertificado()
            // console.log(certificados)
        })

    });

}


async function buscarCertificado () {
    $('#listacertificados').append(skeletonLoading)
    let certificados = await buscarCertificados($('#searchBox').val());
    $('#txtcantidadbuscada').text(certificados.length || 0)
    $('#listacertificados').empty()
    // Obtener la referencia del elemento HTML donde se insertará la tabla
    let filas = ''
    for (let data of certificados) {
        filas += `<tr>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${data.nombres}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${data.curso}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${data.fecha_inicio}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${data.cod_curso}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<a href="${data.certificado}" target="_blank"
									class="custom-purple-bg custom-purple-hover-bg text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center">
									<i class="fas fa-certificate mr-2"></i>
									Ver
								</a>
							</td>
						</tr>`
    }

    let tabla_resultado = `
    	<table class="min-w-full leading-normal mt-2">
					<thead>
						<tr>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-purple-100 text-left text-xs font-semibold custom-purple-text uppercase tracking-wider">
								Nombres completos
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-purple-100 text-left text-xs font-semibold custom-purple-text uppercase tracking-wider">
								Curso
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-purple-100 text-left text-xs font-semibold custom-purple-text uppercase tracking-wider">
								Fecha de emisión
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-purple-100 text-left text-xs font-semibold custom-purple-text uppercase tracking-wider">
								Código
							</th>
							<th
								class="px-5 py-3 border-b-2 border-gray-200 bg-purple-100 text-left text-xs font-semibold custom-purple-text uppercase tracking-wider">
								Certificado
							</th>
						</tr>
					</thead>
					<tbody>`+ filas + `
						
					</tbody>
				</table>
    `
    $('#listacertificados').append(tabla_resultado)
    //$('#listacertificados').append()

    $("#btnbuscar").prop("disabled", false).text("Buscar certificado");


}


