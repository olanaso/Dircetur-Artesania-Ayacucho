import"./modulepreload-polyfill-3cfb730f.js";import{v as d}from"./validateForm-1578b31b.js";import{b as a}from"./config-ef5f6dbc.js";async function i(t){const s={method:"GET",redirect:"follow"};try{return await(await fetch(a+`/api/search?search=${encodeURIComponent(t)}`,s)).json()}catch(r){throw console.error("Error al buscar los certificados:",r),r}}l();let o=`
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
`;async function l(){$("#btnbuscar").on("click",function(t){d("form",async function(){$("#btnbuscar").prop("disabled",!0).text("Búscando certificados en la base de datos..."),$("#listacertificados").empty(),c()})})}async function c(){$("#listacertificados").append(o);let t=await i($("#searchBox").val());$("#txtcantidadbuscada").text(t.length||0),$("#listacertificados").empty();let s="";for(let e of t)s+=`<tr>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${e.nombres}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${e.curso}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${e.fecha_inicio}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								${e.cod_curso}
							</td>
							<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
								<a href="${e.certificado}" target="_blank"
									class="custom-purple-bg custom-purple-hover-bg text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center">
									<i class="fas fa-certificate mr-2"></i>
									Ver
								</a>
							</td>
						</tr>`;let r=`
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
					<tbody>`+s+`
						
					</tbody>
				</table>
    `;$("#listacertificados").append(r),$("#btnbuscar").prop("disabled",!1).text("Buscar certificado")}
