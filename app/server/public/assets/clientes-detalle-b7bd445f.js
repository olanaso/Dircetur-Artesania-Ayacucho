import"./modulepreload-polyfill-3cfb730f.js";import{_ as L}from"./preload-helper-101896b7.js";import{a as d,o as v}from"./api-7a026d77.js";import{b as i,a as h}from"./config-64035b4f.js";import{F as O}from"./uploadVictor-fc196769.js";import{A as F}from"./alert-3bd678b2.js";import{l as U}from"./viewpartials-ac66bf27.js";import{h as j,l as A}from"./init-bc9bbeea.js";async function M(t){try{const e=await fetch(`${i}/web/sendemail`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json();return e.ok?console.log("Correo enviado correctamente:",o):console.error("Error al enviar el correo:",o.error),o}catch(e){throw console.error("Error al enviar el correo:",e),e}}let b=[];async function E(){try{b=await(await fetch(`${i}/paises`)).json(),N()}catch(t){console.error("Error loading data:",t)}}function N(){const t=document.getElementById("pais");t.innerHTML="<option>Seleccione su País</option>",b.forEach(e=>{const o=document.createElement("option");o.value=e.id,o.textContent=e.name,t.appendChild(o)}),t.addEventListener("change",C)}function C(t){console.log("target para region recibido: ",t.target.value);const e=parseInt(t.target.value);J(e)}async function J(t){const e=await H(t),o=document.getElementById("region");o.innerHTML="<option>Seleccione su Región</option>",e.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,o.appendChild(a)}),o.addEventListener("change",w)}async function w(t){console.log("target para ciudad recibido: ",t.target.value);const e=parseInt(t.target.value);q(e)}async function q(t){try{const e=await G(t),o=document.getElementById("ciudad");o.innerHTML="<option>Seleccione su Ciudad</option>",e.forEach(n=>{const a=document.createElement("option");a.value=n.id,a.textContent=n.name,o.appendChild(a)})}catch(e){console.error("Error loading data:",e)}}async function H(t){try{return await(await fetch(`${i}/regiones?pais_id=${t}`)).json()}catch(e){console.error("Error loading data:",e)}}async function G(t){try{return await(await fetch(`${i}/ciudades?region_id=${t}`)).json()}catch(e){console.error("Error loading data:",e)}}const I=new F;j();(async function(){let t=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await U(t),L(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),V()}catch(e){console.error(e)}})();function V(){setTimeout(function(){A()},500)}let m=null;const x=document.getElementById("nombreC"),_=document.getElementById("apellidosC"),B=document.getElementById("correoC"),R=document.getElementById("telefonoC"),P=document.getElementById("direccionC"),l=document.getElementById("pais"),r=document.getElementById("region"),s=document.getElementById("ciudad"),k=document.getElementById("tipo_documento"),D=document.getElementById("inputDocumentoTipo"),z=document.getElementById("dirEnvio");document.getElementById("usuarioC");document.getElementById("contraseñaC");document.getElementById("rContraseñaC");const Y=document.getElementById("estado");function c(t){return new URLSearchParams(window.location.search).get(t)}async function p(t){const e=await v(t);if(console.log("cliente: ",e),x.value=e.nombres,_.value=e.apellidos,B.value=e.correo,R.value=e.telefono,P.value=e.direccion,k.value=e.tipo_documento,D.value=e.numero_documento,z.value=e.direccion_envio,console.log("longitud pais: ",l.options.length),K(e),e.foto_perfil=="")$("#imagenPrincipal").attr("src",m);else{let o=e.foto_perfil.replace(/"/g,"");$("#imagenPrincipal").attr("src",o)}Q(e.list_reclamos),Y.checked=!e.estado}function Q(t){const e=JSON.parse(t);if(e!=null){$("#listReclamos").empty();let o="";for(let a of e)console.log("data: ",a),o+=`
                <tr>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        ${a.reclamo_id}
                    </td>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        ${a.descripcion}
                    </td>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        <button type="button" class="btn btn-light btn-sm btn-verR" data-toggle="modal" data-target="#modalverReclamo" data-id="${a.reclamo_id}""><i class="icon icon-eye2"></i></button>
                    </td>
                </tr>`;let n=`
            <table class="table m-0" id="tablaReclamos">
                <thead class="thead-default">
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`+o+`
                    
                </tbody>
            </table>`;$("#listReclamos").append(n)}}async function K(t){await E();for(let e=0;e<l.options.length;e++)if(l.options[e].textContent===t.pais){l.selectedIndex=e,C({target:l});break}await y(r);for(let e=0;e<r.options.length;e++)if(console.log(r.options.length),r.options[e].textContent===t.region){r.selectedIndex=e,await w({target:r});break}await y(s);for(let e=0;e<s.options.length;e++)if(s.options[e].textContent===t.ciudad){s.selectedIndex=e;break}}function y(t){return new Promise(e=>{const o=()=>{t.options.length>1?e():setTimeout(o,100)};o()})}$(document).on("click","#actualizar-informacion",async function(t){t.preventDefault();try{I.createAlertDialog("confirm","Confirmar","¿Estás seguro que quieres actualizar?","Cancelar","Continuar",async()=>{try{const e=await d(c("id"),{nombres:x.value,apellidos:_.value,correo:B.value,telefono:R.value,direccion:P.value,pais:l.selectedOptions[0].text,region:r.selectedOptions[0].text,ciudad:s.selectedOptions[0].text,tipo_documento:k.value,numero_documento:D.value,direccion_envio:z.value});console.log("Cliente actualizada:",e)}catch(e){console.error("Error:",e)}})}catch(e){console.error("Error al actualizar el cliente:",e)}});$(document).on("click",".btn-editarF",async function(t){$("#ClienteImagePreview").attr("src",$("#imagenPrincipal").attr("src")).show()});$(document).on("click","#btn-actualizarFoto",async function(t){t.preventDefault();try{const e=await d(c("id"),{foto_perfil:m});console.log("Foto perfil actualizada:",e),$("#imagenPrincipalModal").modal("hide"),p(c("id"))}catch(e){console.error("Error al actualizar el cliente:",e)}});$(document).on("click",".btn-eliminarF",async function(t){t.preventDefault(),I.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar el slider?","Cancelar","Continuar",async()=>{try{const e=await d(c("id"),{foto_perfil:""});console.log("Foto perfil eliminada:",e),p(c("id"))}catch(e){console.error("Error al eliminar la foto de perfil:",e)}})});$(document).on("click","#actualizar-cuenta",async function(t){});async function W(t){$(document).on("click",".btn-verR",async function(e){const o=$(this).data("id");try{const n=await v(t);for(let a of JSON.parse(n.list_reclamos))console.log(a),a.reclamo_id==o&&($("#modalverReclamo #codVenta").val(a.codigo_venta),$("#modalverReclamo #fechaReclamo").val(a.fecha_reclamo),$("#modalverReclamo #descripcionR").val(a.descripcion),$("#modalverReclamo #estadoR").val(a.estado))}catch(n){console.error("Error:",n)}})}async function X(t,e){try{const o={from:"tineo.max.clever@cidie.edu.pe",to:"victorheli2101@gmail.com",subject:"Mensaje de activación de cuenta",email_html:`
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
                            <h1>Información de cuenta</h1>
                        </div>
                        <div class="content">
                            <p>${e}.</p>
                        </div>
                    </div>
                </body>
                </html>
            `};return await M(o)}catch(o){console.error("Error al enviar el correo:",o)}}$(document).on("click","#notificaEstado",async function(t){t.preventDefault();const e=document.getElementById("mensajeEstado");X("correoCliente",e.value),$("#mensajeEstado").val("")});function Z({fileInputId:t,progressBarId:e,statusElementId:o,uploadUrl:n,folder:a,callback:S}){const u=document.getElementById(t),T=u.name,g=document.getElementById(e),f=document.getElementById(o);u&&g&&f?new O(n,g,f,S,T,a).attachToFileInput(u):console.error("Initialization failed: One or more elements not found.")}document.getElementById("myfile").addEventListener("change",function(){var t=this.files[0],e=t.type,o=["image/png","image/jpeg"];o.includes(e)||(alert("Solo se permiten archivos PNG o JPG"),this.value="")});function ee(t){alert("registro correcto"),alert(t.ruta);let e=$("#myfile").prop("files")[0];if(e){let o=new FileReader;o.onload=function(n){$("#ClienteImagePreview").attr("src",h(i)+"/"+t.ruta).show(),$("#principalImageName").val(e.name)},o.readAsDataURL(e),m=h(i)+"/"+t.ruta}else alert("Por favor, seleccione un archivo para visualizar.")}document.addEventListener("DOMContentLoaded",t=>{t.preventDefault(),E().then(()=>{const e=c("id");p(e),W(e);const o=document.getElementById("estado");o.addEventListener("change",async function(){const n=!!o.checked;try{const a=await d(c("id"),{estado:!n});console.log("Estado actualizado:",a)}catch(a){console.error("Error al actualizar el estado:",a)}}),Z({fileInputId:"myfile",progressBarId:"progressBar",statusElementId:"status",uploadUrl:i+"/fileupload4",folder:"/cliente/img/",callback:ee})})});
