import"./modulepreload-polyfill-3cfb730f.js";import{_ as l}from"./preload-helper-101896b7.js";import{b as i}from"./config-64035b4f.js";import{l as p}from"./viewpartials-ac66bf27.js";import{h as d,l as m}from"./init-bc9bbeea.js";import{s}from"./toast-8abe4fe9.js";async function n(o,e){try{return console.log(e),console.log(`${i}/reporte?reportType=${o}`),await(await fetch(`${i}/reporte?reportType=${o}`)).json()}catch(a){throw console.error("Error al encontrar las clientes:",a),a}}function c(o,e,a="SELECT * FROM"){var r=alasql(a+" ? ",[o]),t=[{sheetid:"Reporte",headers:!0}];alasql(`SELECT INTO XLSX("${e}.xlsx",?) FROM ?`,[t,[r]])}d();(async function(){let o=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await p(o),l(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),u()}catch(e){console.error(e)}})();function u(){setTimeout(function(){m()},500)}document.getElementById("reportType").addEventListener("change",function(){});document.getElementById("btn-exportarexcel").addEventListener("click",async function(o){o.preventDefault();const e=document.getElementById("reportType").value;if(e==0){s("Escoge el tipo de reporte");return}switch(e){case"productos":const a=await n(e);c(a,"productos.xls","select artesano_id as id, nombres_es as nombre, resumen_es as resumen, descripcion_es as descripcion, cualidades_es as cualidades,  palabra_clave_es as palabraclave, numero_piezas_es as numero_piezas, alto, ancho, materiales_es as materiales, precio, peso, tecnicas_es as tecnicas,  cantidad, cantidad_minima, restar_stock, tipo_estado, fecha_disponible, igv, precios_envio, precio_local, precio_nacional, precio_extranjero, tiempo_elaboracion, tiempo_envio, preventas from "),s("Generando reporte");break;case"artesanos":const r=await n(e);c(r,"artesanos.xls","select dni, ruc, nombres, apellidos, correo, celular, telefonos, ubigeo, lugar_nacimiento, lengua_materna,  estado from "),s("Generando reporte");break;case"clientes":const t=await n(e);c(t,"clientes.xls","select nombres, apellidos, correo, telefono, direccion, pais, region, ciudad, tipo_documento, numero_documento, direccion_envio, estado from "),s("Generando reporte");break}});