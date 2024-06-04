import{b as s,h as r,l as t,c as i,g as c}from"./init-35cba5cd.js";import{l as n,_ as l}from"./viewpartials-7a86f681.js";async function d(a){try{const e={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(s+"/api/listarProgramasIESTPSeleccionado?iestpid="+a,e)).json()}catch(o){console.log("error",o)}}r();(async function(){let a=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menuadmin.html",container:"app-side"}];try{await n(a),l(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),p()}catch(o){console.error(o)}})();function p(){m(),u(),t()}async function m(){(await i()).usuario.rolid!=1&&(location.href="sinacceso.html")}async function u(){let a=c("session").usuario,o=await d(a.iestpid);$("#liprogramas").empty();for(let e of o)$("#liprogramas").append(`
    <div class="col-12 col-md-6 font-weight-bold" style="margin-top: 5px;">
															<div class="custom-control custom-switch">
																<input ${e.seleccionado==1?"checked":""} type="checkbox" class="custom-control-input" id="${e.denominacion}">
																<label class="custom-control-label" for="${e.denominacion}">${e.denominacion}</label>
															</div>	
														</div>
    `)}
