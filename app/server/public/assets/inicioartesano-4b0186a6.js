import"./modulepreload-polyfill-3cfb730f.js";import{l as O,_ as C}from"./viewpartials-7a86f681.js";import{h as I,l as P,c as B}from"./init-52a8aa54.js";import{b as p}from"./config-ef5f6dbc.js";async function z(o){try{const t={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(p+"/reporte1/"+o,t)).json()}catch(s){console.log("error",s)}}async function A(o){try{const t={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(p+"/productoartesanos/"+o,t)).json()}catch(s){console.log("error",s)}}async function S(o){try{const t={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(p+"/reporte2/"+o,t)).json()}catch(s){console.log("error",s)}}async function j(o){try{const t={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(p+"/pedidodetalle/"+o,t)).json()}catch(s){console.log("error",s)}}I();(async function(){let o=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await O(o),C(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),q()}catch(s){console.error(s)}})();function q(){G(),setTimeout(function(){P()},500)}var c=null,w=null,_=null,k=null;let d=null;async function G(){let o=await B();if(console.log(o),o.isvalid){d=o.usuarios,L(d.datos[0].id);const s=document.getElementById("id_nombre");s.innerText=d.nombre_completo;const t=document.getElementById("id_rol");t.innerText=d.rol.denominacion}else location.href="sinacceso.html"}async function L(o){c=await z(o);const s=document.getElementById("id_total");s.innerText=c[0].pagado;const t=document.getElementById("id_entregado");t.innerText=c[0].envio;const l=document.getElementById("id_pendiente");l.innerText=c[0].pendiente;const i=document.getElementById("id_proceso");i.innerText=c[0].proceso,w=await A(o);let a="";for(let e of w)a+=`
          <li class="row"  style="line-height: 17px !important;">
								<div class="col-6 col-sm-1" style=" padding-right: 0px; padding-left: 7px;">
									<img class="avatar img-fluid"  src="${e.imagen_principal}" />
								</div>
								<div class="col-6 col-sm-9">
									<h5 style="font-weight: bold;   color: #7d7d7d;">${e.nombres_es}</h5>   
									<span class="date-time" style="color: #aab3c3;">Categoría	: </span> ${e.abreviatura}</br> 
									<span class="date-time" style="color: #aab3c3;">Dimensiones	:</span> <strong> alto: </strong> ${e.alto} - <strong> ancho: </strong> ${e.ancho}</strong>  </br> 
									<span class="date-time" style="color: #aab3c3;">Material	:</span> ${e.materiales_es}</br> 
									<span class="date-time" style="color: #aab3c3;">Cantidad	:</span> ${e.cantidad} </br> 
								</div>  
								
                `,e.tipo_estado==1?a+=` 
                
                    <div class="col-6 col-sm-1 ">
                  <span style="color: var(--green);font-weight: bold;">en stock</span>
                  </div> 
                      <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: var(--success);">
										<i class="icon-tick"> </i>
									</span> 
                  </div> 
                `:e.tipo_estado==2?a+=` 
                   <div class="col-6 col-sm-1 ">
                  <span style="color: orange; font-weight: bold;">poco stock</span>
                  </div> 
                    <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: var(--orange);">
										<i class="icon-info-large"> </i>
									</span> 
                    </div>  
                `:e.tipo_estado==3&&(a+=` 
                  
                   <div class="col-6 col-sm-1 ">
                  <span style="color: var(--red);font-weight: bold;">Agotado</span>
                       </div> 
                   <div class="col-6 col-sm-1 ">
									<span class="icon" style="float: none;background: #da1113;">
										<i class="icon-minus2"> </i>
									</span> 
                  </div> 
                  
                `),a+=` 
								 
          </li>
          <hr>

      `;$("#lista-producto").empty().append(a),_=await S(o);let n="";for(let e of _){let r=e.fecha_pedido,T=r.substring(0,10),H=r.substring(11,19);n+=`
          <li class="row"  style="line-height: 17px !important;">
								<div class="col-6 col-sm-1" style=" padding-right: 0px; padding-left: 7px;">
									<span class="icon">
								    <i class="icon-shopping-basket"></i>
							    </span>
								</div>
								<div class="col-6 col-sm-7">
									<h5 style="font-weight: bold;   color: #7d7d7d;"> Orden # ${e.num_pedido}</h5>   
									<span class="date-time" style="color: #aab3c3;"> ${T} </span> </br>   
									<span class="date-time" style="color: #aab3c3;"> ${H} </span> </br> 
								</div>  
								
                `,e.estado=="pagado"||e.estado=="finalizado"||e.estado=="envio"?n+=` 
                
                    <div class="col-6 col-sm-2 ">
                  <span style="color: var(--green);font-weight: bold;">${e.estado}</span>
                  </div> 
                      <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: var(--success);">
										<i class="icon-tick"> </i>
									</span> 
                  </div> 
                `:e.estado=="pendiente"||e.estado=="Proceso"?n+=` 
                   <div class="col-6 col-sm-2 ">
                  <span style="color: orange; font-weight: bold;">${e.estado}</span>
                  </div> 
                    <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: var(--orange);">
										<i class="icon-info-large"> </i>
									</span> 
                    </div>  
                `:e.estado=="anulado"&&(n+=` 
                  
                   <div class="col-6 col-sm-2 ">
                  <span style="color: var(--red);font-weight: bold;">${e.estado}</span>
                       </div> 
                   <div class="col-6 col-sm-2 ">
									<span class="icon" style="float: none;background: #da1113;">
										<i class="icon-minus2"> </i>
									</span> 
                  </div> 
                  
                `),n+=` 
								 
          </li>
          <hr>

      `}$("#lista-pedidos").empty().append(n),k=await j(o);let m="",f="";var g,h,u;let y=[];for(let e of k)m+=e.columna1+";",f+=e.columna2+",";let v=m.slice(0,-1).split(";"),x=f.slice(0,-1).split(",");for(let e in v){let r=JSON.parse(v[e]);y.push(r)}g=y;var E=x;h=E.map(function(e,r){return{label:e,data:[g[r]]}}),u={xaxis:{},legend:{position:"se"},grid:{hoverable:!0,clickable:!1,borderWidth:1,tickColor:"#f5f6fa",borderColor:"#f5f6fa"},shadowSize:0,bars:{horizontal:!0,show:!0,barWidth:.7,fill:!0,lineWidth:0,fillColor:{colors:[{opacity:1},{opacity:1}]}},tooltip:!0,tooltipOpts:{content:"%s: %x"},colors:["#007ae1","#e5e8f2","#ff5661"]};var b=$("#horizontal-chart");b.length&&$.plot(b,h,u)}
