import"./modulepreload-polyfill-3cfb730f.js";import{_ as y}from"./preload-helper-101896b7.js";import{o as m,a as E,e as I}from"./api-98903e41.js";import{F as v}from"./upload-fc196769.js";import{A as C}from"./alert-3bd678b2.js";import{l as w}from"./viewpartials-ac66bf27.js";import{h as _,l as B}from"./init-bc9bbeea.js";import{b as u,a as P}from"./config-64035b4f.js";const p=new C;_();(async function(){let t=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await w(t),y(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),T()}catch(e){console.error(e)}})();function T(){setTimeout(function(){B()},500)}let g="";const x=document.getElementById("id-orden-pedido"),D=document.getElementById("num-pedido"),S=document.getElementById("fecha-pedido"),k=document.getElementById("comprobante-solicitado");document.getElementById("imagen-Compra");const A=document.getElementById("nombre-artesano"),L=document.getElementById("nombre-cliente"),R=document.getElementById("tipo-doc-cliente"),H=document.getElementById("numDocum-cliente"),M=document.getElementById("correo-cliente"),U=document.getElementById("telefono-cliente"),N=document.getElementById("wsp-cliente"),z=document.getElementById("wsp-reclamos"),O=document.getElementById("pais-recepcion"),F=document.getElementById("region-recepcion"),V=document.getElementById("ciudad-recepcion"),q=document.getElementById("direccion-recepcion"),J=document.getElementById("total-pedido");async function f(t){const e=await m(t);j(e),W(e),G(e),x.innerHTML=`Orden # ${e.num_pedido}`,D.value=e.num_pedido,S.value=d(e.fecha_pedido),k.value=e.comprobante_solic,A.value=e.artesano.nombres+" "+e.artesano.apellidos,L.value=e.cliente.nombres+" "+e.cliente.apellidos,R.innerHTML=e.cliente.tipo_documento,H.value=e.cliente.numero_documento,M.value=e.cliente.correo,U.value=e.cliente.telefono,O.value=e.cliente.pais,F.value=e.cliente.region,V.value=e.cliente.ciudad,q.value=e.cliente.direccion,N.setAttribute("href",`https://wa.me/${e.cliente.telefono}`),z.setAttribute("href",`https://wa.me/${e.cliente.telefono}`),$("#imagen-Compra").attr("src",e.imagen_pago)}function j(t){var e=0;const i=document.getElementById("tablaDatosPedido").getElementsByTagName("tbody")[0],a=JSON.parse(t.list_productos);i.innerHTML="",a.forEach(o=>{const r=document.createElement("tr");r.innerHTML=`
            <td>${o.cantidad}</td>
            <td>${o.nombre}</td>
            <td>${o.descripcion}</td>
            <td>${o.precio_unitario}</td>
            <td>${o.subtotal}</td>
        `,i.appendChild(r),e+=o.subtotal}),J.innerHTML=`Total: S/ ${e}`}function W(t){const n=document.getElementById("tablaHistoriaPedidos").getElementsByTagName("tbody")[0];if(t.list_atencion==null)return"No hay historial de pedidos";const i=JSON.parse(t.list_atencion);n.innerHTML="",i.forEach(a=>{const o=document.createElement("tr");let r="";switch(a.estado){case"pendiente":r="badge badge-pill badge-warning text-white";break;case"pagado":r="badge badge-pill badge-success";break;case"envio":r="badge badge-pill badge-info";break;case"finalizado":r="badge badge-pill badge-primary";break;case"anulado":r="badge badge-pill badge-danger";break;default:r=""}o.innerHTML=`
            <td>${d(a.fecha_atencion)}</td>
            <td>${a.comentario}</td>
            <td><span class="${r}">${a.estado}</span></td>
            <td>${a.enlaceSeguimiento==""?"":` <a href="${a.enlaceSeguimiento}"  class="font-italic text-info" target="_blank">Ver enlace</a>`}</td>
            <td>${a.medioPrueba==""?"":` <a href="${a.medioPrueba}"  class="font-italic text-info" target="_blank">Ver prueba</a>`}</td>
            <td>
				<button class="btn btn-primary btn-notificar-email btn-sm">Email</button>
				<button class="btn btn-success btn-notificar-wsp btn-sm">WhatsApp</button>
			</td>
        `,o.querySelector(".btn-notificar-email").addEventListener("click",async()=>await b(t.cliente.correo,a)),o.querySelector(".btn-notificar-wsp").addEventListener("click",()=>h(t.cliente.telefono,a)),n.appendChild(o)})}function G(t){const n=document.getElementById("tablaHistoriaReclamos").getElementsByTagName("tbody")[0];if(n.innerHTML="",t.list_reclamo==null){const a=document.createElement("tr");a.innerHTML='<td colspan="2">No hay historial de reclamos</td>',n.appendChild(a);return}JSON.parse(t.list_reclamo).forEach(a=>{const o=document.createElement("tr");o.innerHTML=`
            <td>${d(a.fecha)}</td>
            <td>${a.reclamo}</td>
        `,n.appendChild(o)})}function Y(t){return new URLSearchParams(window.location.search).get(t)}function d(t){const e=new Date(t),n=e.getUTCFullYear(),i=("0"+(e.getUTCMonth()+1)).slice(-2);return`${("0"+e.getUTCDate()).slice(-2)}/${i}/${n}`}function Q(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let n=0;n<5;n++){const i=Math.floor(Math.random()*e.length);t+=e.charAt(i)}return t}async function K(t){const e=document.getElementById("form-actualizar-historia");e.addEventListener("submit",async n=>{if(n.preventDefault(),!e.checkValidity()){e.reportValidity();return}try{const i=await m(t);let a=i.list_atencion?JSON.parse(i.list_atencion):[];const o={id:Q(),estado:e.estado.value,notificarCliente:e.notificarCliente.checked,enlaceSeguimiento:e.enlaceSeguimiento.value,comentario:e.comentario.value,medioPrueba:g,fecha_atencion:new Date().toISOString()};a.unshift(o);const r={list_atencion:a,estado:e.estado.value};p.createAlertDialog("confirm","Confirmar","¿Estás seguro que quieres actualizar el pedido?","Cancelar","Continuar",async()=>{await E(t,r),o.notificarCliente&&(await b(i.cliente.correo,o),h(i.cliente.telefono,o)),e.reset(),await f(t)})}catch(i){console.error("Error al actualizar el pedido:",i)}})}async function b(t,e){p.createAlertDialog("confirm","Confirmar","¿Estás seguro que quieres enviar notificación al correo del cliente?","Cancelar","Continuar",async()=>{try{const n={from:"tineo.max.clever@cidie.edu.pe",to:"clever.max159@gmail.com",subject:`Pedido #${e.id}`,email_html:`
                        <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 20px auto;
                                    background-color: #fff;
                                    padding: 20px;
                                    border-radius: 10px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    border-bottom: 1px solid #ddd;
                                    padding-bottom: 10px;
                                    margin-bottom: 20px;
                                }
                                .header h1 {
                                    margin: 0;
                                    font-size: 24px;
                                    color: #333;
                                }
                                .content {
                                    line-height: 1.6;
                                    color: #555;
                                }
                                .content p {
                                    margin: 0 0 10px;
                                }
                                .footer {
                                    text-align: center;
                                    border-top: 1px solid #ddd;
                                    padding-top: 10px;
                                    margin-top: 20px;
                                    color: #888;
                                    font-size: 12px;
                                }
                                .highlight {
                                    font-weight: bold;
                                    color: #333;
                                }
                                .link {
                                    color: #1a73e8;
                                    text-decoration: none;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Información de tu Pedido</h1>
                                </div>
                                <div class="content">
                                    <p>Tu pedido está siendo atendido.</p>
                                    <p><span class="highlight">Estado:</span> ${e.estado}</p>
                                    <p><span class="highlight">Comentario:</span> ${e.comentario}</p>
                                    <p><span class="highlight">Fecha de atención:</span> ${d(e.fecha_atencion)}</p>
                                    ${e.enlaceSeguimiento?`<p><span class="highlight">Enlace de seguimiento:</span> <a class="link" href="${e.enlaceSeguimiento}" target="_blank">Ver</a></p>`:""}
                                    ${e.medioPrueba?`<p><span class="highlight">Medio de prueba:</span> <a class=link href="${e.medioPrueba}" target="_blank">Ver</a></p>`:""}
                                </div>
                                <div class="footer">
                                    <p>Gracias por tu preferencia.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `};return await I(n)}catch(n){console.error("Error al enviar el correo:",n)}})}function h(t,e){var n=encodeURIComponent(t),i=encodeURIComponent(e.estado||""),a=encodeURIComponent(e.enlaceSeguimiento||""),o=encodeURIComponent(e.comentario||""),r=encodeURIComponent(e.medioPrueba||""),s=encodeURIComponent(d(e.fecha_atencion)||""),l="https://wa.me/"+n+"?text=",c="*Estimado/a,*%0A%0A";c+="*Le informamos sobre el estado de su atención:*%0A%0A",c+="*==============================*%0A",i!==""&&(c+="*Estado:* "+i+"%0A"),a!==""&&(c+="*Enlace de seguimiento:* "+a+"%0A"),o!==""&&(c+="*Comentario:* "+o+"%0A"),r!==""&&(c+="*Medio de prueba:* "+r+"%0A"),s!==""&&(c+="*Fecha de atención:* "+s+"%0A"),c+="*==============================*%0A",c+="%0A",c+="Si tiene alguna pregunta o necesita más información, no dude en contactarnos.%0A%0A",c+="¡Gracias por su preferencia!.%0A",l+=c,window.open(l,"_blank").focus()}document.addEventListener("DOMContentLoaded",()=>{const t=Y("id");f(t),K(t),X({fileInputId:"myfile",progressBarId:"progressBar",statusElementId:"status",uploadUrl:u+"/pedido/fileupload",folder:"/pedidos/",callback:Z})});function X({fileInputId:t,progressBarId:e,statusElementId:n,uploadUrl:i,folder:a,callback:o}){const r=document.getElementById(t),s=r.name,l=document.getElementById(e),c=document.getElementById(n);r&&l&&c?new v(i,l,c,o,s,a).attachToFileInput(r):console.error("Initialization failed: One or more elements not found.")}function Z(t){alert("registro del archivo correctamente"),g=P(u)+"/"+t.ruta}
