import { loadPartials } from '../utils/viewpartials';
import { hideLoading, checkSession,llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init'
import { getreporte1,getreporte2,getreporte3,getreporte4 } from './api';

import {  } from '../utils/config'
import {  obtenerLibrosLeidosGuardados } from './api'

import '../inicioartesano/style.css'

hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menu.html', container: 'app-side' },


  ]; 
  try {
    await loadPartials(partials);
    import ('../utils/common')

   
    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log('Las vistas parciales se han cargado correctamente!');
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp () {
 
  validarSession();
  setTimeout(function() {
    llenarinformacionIESTPProg();
    marcarSubMenuSeleccionado();
}, 500);
 

}

var editreporte = null;
var editreporte2 = null;
var editreporte3 = null;
var editreporte4 = null;
let usuario = null;
async function validarSession () {
  let result = await checkSession()
  console.log(result)
  if (result.isvalid) {
    usuario = result.usuarios;
    //llenarinformacion(result) 
    visualizarreporte(usuario.datos[0].id);
    const idnombre = document.getElementById("id_nombre");  
    idnombre.innerText = usuario.nombre_completo;  
  
    const idrol = document.getElementById("id_rol");  
    idrol.innerText = usuario.rol.denominacion;   
  } else {
    location.href = "sinacceso.html"
  }
}

async function visualizarreporte (id) {

  editreporte =  await getreporte1(id); 
  const idtotal = document.getElementById("id_total");  
  idtotal.innerText = editreporte[0].pagado;  

  const identregado = document.getElementById("id_entregado");  
  identregado.innerText = editreporte[0].envio;  

  const idpendiente = document.getElementById("id_pendiente");  
  idpendiente.innerText = editreporte[0].pendiente;  

  const idproceso = document.getElementById("id_proceso");  
  idproceso.innerText = editreporte[0].proceso;  
  
  
  editreporte2 =  await getreporte2(id); 

  
  let nro = 0; 
  let htmlContent = '';

  for (let prog of editreporte2) { 

      htmlContent += `
          <li class="row"  style="line-height: 17px !important;">
								<div class="col-6 col-sm-1" style=" padding-right: 0px; padding-left: 7px;">
									<img class="avatar img-fluid"  src="${prog.imagen_principal}" />
								</div>
								<div class="col-6 col-sm-9">
									<h5 style="font-weight: bold;   color: #7d7d7d;">${prog.nombres_es}</h5>   
									<span class="date-time" style="color: #aab3c3;">Categoría	: </span> ${prog.abreviatura}</br> 
									<span class="date-time" style="color: #aab3c3;">Dimensiones	:</span> <strong> alto: </strong> ${prog.alto} - <strong> ancho: </strong> ${prog.ancho}</strong>  </br> 
									<span class="date-time" style="color: #aab3c3;">Material	:</span> ${prog.materiales_es}</br> 
									<span class="date-time" style="color: #aab3c3;">Cantidad	:</span> ${prog.cantidad} </br> 
								</div>  
								
                `

                if (prog.tipo_estado==1){
                  htmlContent += ` 
                
                    <div class="col-6 col-sm-1 ">
                  <span style="color: var(--green);font-weight: bold;">en stock</span>
                  </div> 
                      <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: var(--success);">
										<i class="icon-tick"> </i>
									</span> 
                  </div> 
                `   
                } else if (prog.tipo_estado==2){
                  htmlContent += ` 
                   <div class="col-6 col-sm-1 ">
                  <span style="color: orange; font-weight: bold;">poco stock</span>
                  </div> 
                    <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: var(--orange);">
										<i class="icon-info-large"> </i>
									</span> 
                    </div>  
                `   
                } else if (prog.tipo_estado==3){
                  htmlContent += ` 
                  
                   <div class="col-6 col-sm-1 ">
                  <span style="color: var(--red);font-weight: bold;">Agotado</span>
                       </div> 
                   <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: #da1113;">
										<i class="icon-minus2"> </i>
									</span> 
                  </div> 
                  
                `   
                } 

              htmlContent += ` 
								 
          </li>
          <hr>

      `; 
      nro++;
  }

  $('#lista-producto').empty().append(htmlContent);


  editreporte3 =  await getreporte3(id); 
  
  
  let nro1 = 0; 
  let htmlContent1 = '';

  for (let prog1 of editreporte3) { 

    let fechaPedido = prog1.fecha_pedido; // Suponiendo que prog1.fecha_pedido contiene la fecha como una cadena

// Extraer los primeros 10 caracteres
    let fechaCorta = fechaPedido.substring(0, 10);
    
    let hora = fechaPedido.substring(11, 19);

    htmlContent1 += `
          <li class="row"  style="line-height: 17px !important;">
								<div class="col-6 col-sm-1" style=" padding-right: 0px; padding-left: 7px;">
									<span class="icon">
								    <i class="icon-shopping-basket"></i>
							    </span>
								</div>
								<div class="col-6 col-sm-7">
									<h5 style="font-weight: bold;   color: #7d7d7d;"> Orden # ${prog1.num_pedido}</h5>   
									<span class="date-time" style="color: #aab3c3;"> ${fechaCorta} </span> </br>   
									<span class="date-time" style="color: #aab3c3;"> ${hora} </span> </br> 
								</div>  
								
                `

                if (prog1.estado=="pagado" || prog1.estado=="finalizado"|| prog1.estado=="envio"){
                  htmlContent1 += ` 
                
                    <div class="col-6 col-sm-2 ">
                  <span style="color: var(--green);font-weight: bold;">${prog1.estado}</span>
                  </div> 
                      <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: var(--success);">
										<i class="icon-tick"> </i>
									</span> 
                  </div> 
                `   
                } else if (prog1.estado=="pendiente" || prog1.estado=="Proceso" ){
                  htmlContent1 += ` 
                   <div class="col-6 col-sm-2 ">
                  <span style="color: orange; font-weight: bold;">${prog1.estado}</span>
                  </div> 
                    <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: var(--orange);">
										<i class="icon-info-large"> </i>
									</span> 
                    </div>  
                `   
                } else if (prog1.estado=="anulado"  ){
                  htmlContent1 += ` 
                  
                   <div class="col-6 col-sm-2 ">
                  <span style="color: var(--red);font-weight: bold;">${prog1.estado}</span>
                       </div> 
                   <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: #da1113;">
										<i class="icon-minus2"> </i>
									</span> 
                  </div> 
                  
                `   
                } 

                htmlContent1 += ` 
								 
          </li>
          <hr>

      `; 
      nro1++;
  }

  $('#lista-pedidos').empty().append(htmlContent1);




  editreporte4 =  await getreporte4(id); 

  
  let listd1 = '';
  let listnombre = '';


	var d1, data, chartOptions;
  let d2 = [];

  for (let prog4 of editreporte4) { 
    listd1 += prog4.columna1+ ';'
    listnombre += prog4.columna2 + ','
  }
 
    let listd1Array = listd1.slice(0, -1).split(';'); 
    let listd1Array2 = listnombre.slice(0, -1).split(','); 

        // Iterar sobre cada propiedad del objeto data
    for (let key in listd1Array) {
      // Convertir cada string en un array usando JSON.parse
      let pair = JSON.parse(listd1Array[key]);
      // Agregar el array convertido a d1
      d2.push(pair);
    }
  
  d1 =d2;   
   

	// Definir los nombres de las categorías
	 var categoryNames = listd1Array2;

	// Mapear los datos con los nombres de las categorías
	data = categoryNames.map(function (catName, index) {
		return {
			label: catName,
			data: [d1[index]] // Usar los datos correspondientes a cada categoría
		};
	});

	chartOptions = {
		xaxis: {

		},
		legend: {
			position: 'se'
		},
		grid: {
			hoverable: true,
			clickable: false,
			borderWidth: 1,
			tickColor: '#f5f6fa',
			borderColor: '#f5f6fa',
		},
		shadowSize: 0,
		bars: {
			horizontal: true,
			show: true,
			barWidth: .7,
			fill: true,
			lineWidth: 0,
			fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
		},

		tooltip: true,

		tooltipOpts: {
			content: '%s: %x'
		},
		colors: ['#007ae1', '#e5e8f2', '#ff5661'],
	};

	var holder = $('#horizontal-chart');

	if (holder.length) {
		$.plot(holder, data, chartOptions);
	}
  
  

}

function llenarinformacion (datos) {
  let usuario=getDataFromLocalStorage('session').usuarios;



} 
 

function limpiarDatos(){
  // localStorage.removeItem('session');
  // localStorage.removeItem('usuario');
  // localStorage.removeItem('accessToken');
}
 
 