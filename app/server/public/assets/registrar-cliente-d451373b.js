import"./modulepreload-polyfill-3cfb730f.js";import"./principal-90e94c9b.js";import{s}from"./toast-8abe4fe9.js";import{b as n,s as a}from"./config-ef5f6dbc.js";import"./viewpartials-7a86f681.js";import"./init-52a8aa54.js";import"./navbar-79b7ff75.js";async function d(e){e.usuarioid!==0&&(e.id=e.usuarioid);const r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};try{const o=await(await fetch(n+"/usuario_save/",r)).json();return o&&o.data.token&&(a("accessToken",o.data.token),a("rol",o.data.rolid),a("id",o.data.id),a("idCLiente",o.data.idCliente)),o}catch(t){console.error("Error:",t)}}async function p(e){const r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};try{const o=await(await fetch(n+"/cliente/save",r)).json();return o.id&&a("idCliente",o.id),o}catch(t){console.log("error",t)}}$(document).ready(function(){$("#btnregistrar").click(async function(e){e.preventDefault(),f()&&m()})});function f(){let e=!0;return $("#registerForm input[required]").each(function(){$(this).val()===""?(e=!1,$(this).css("border","1px solid red")):$(this).css("border","")}),e||s("Por favor, complete todos los campos requeridos."),e}async function m(){let e=$("#nombre").val(),r=$("#apellidos").val(),t=$("#correo").val(),o=$("#contraseña").val(),c=$("#telefono").val();try{const i=await p({nombres:e,apellidos:r,correo:t,clave:o,telefono:c}),l=await d({usuario:t,nombre_completo:`${e} ${r}`,correo:t,clave:o,rolid:3,tipousuario:3,estado:1});i&&l&&(s("success","Cliente registrado correctamente"),window.location.href="/principal.html")}catch(i){s("error"),console.error(i)}}