import{b as d,h as p,l as u,c as m}from"./init-35cba5cd.js";import{l as h,_ as f}from"./viewpartials-7a86f681.js";async function g(a){try{const o={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(d+"/api/libro-inicio?usuarioid="+a.id,o)).json()}catch(e){console.log("error",e)}}p();(async function(){let a=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await h(a),f(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),b()}catch(e){console.error(e)}})();function b(){_(),setTimeout(function(a){u()},500)}let l=null;async function _(){let a=await m();console.log(a),a.isvalid?(l=a.usuario,y(a),k(l)):location.href="sinacceso.html"}function y(a){$("#mlbliestp").text(a.usuario.iestp.nombre),$("#m_programas").empty();let e=1;for(let o of a.usuario.programas)$("#m_programas").append(`
        <li>${e}.- ${o.denominacion}</li>
      `),e++}async function k(a){let{libguardados:e,librecientes:o}=await g(a);$("#books_recientes").empty();for(let t of o)$("#books_recientes").append(n(t));$("#books_guardados").empty();for(let t of e)$("#books_guardados").append(n(t));$('[data-toggle="tooltip"]').tooltip()}function n({id:a,url_portada:e,titulo:o,valor:t,autores:i}){let r="",c=t==null||t=="null"?0:parseInt(t);for(let s=1;s<=5;s++)s<=c?r+="<span>&#9733;</span>":r+="<span>&#9734;</span>";return`
    <div class="col-12 col-md-2-5">
    <div class="card card-book" style="width: 14rem;">
    <a href="detailbook.html?id=${a}"> <img class="card-img-top" height="195" src="${e}" alt="Card image cap">
    </a>    
    <div class="card-body">
        <a href="detailbook.html?id=${a}">
          <h5 data-toggle="tooltip" title="${o}" class="card-title long-text" >${o}</h5></a>
          <p class="card-text">${i}</p>
          <div class="rating">
            ${r}
          </div>
        </div>
      </div>
</div>
`}
