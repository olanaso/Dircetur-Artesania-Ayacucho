import{b as c,h as l,c as d,l as p,g as h,s as m}from"./init-35cba5cd.js";import{l as u,_ as g}from"./viewpartials-7a86f681.js";async function f(t){try{const e={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(c+`/api/mislibros?usuarioid=${t}`,e)).json()}catch(a){console.log("error",a)}}l();(async function(){let t=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await u(t),g(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),b()}catch(a){console.error(a)}})();function b(){d(),y(),p()}async function y(){let t=h("session").usuario;m();let a=await f(t.id);$("#txtcant-mostrar").text(a.length),v(a),l()}async function v(t){$("#resultadobooks").empty();for(let a of t)$("#resultadobooks").append(k(a));$('[data-toggle="tooltip"]').tooltip()}function k({id:t,url_portada:a,titulo:e,valor:s,autores:i}){let o="",n=s==null||s=="null"?0:parseInt(s);for(let r=1;r<=5;r++)r<=n?o+="<span>&#9733;</span>":o+="<span>&#9734;</span>";return`
    <div class="col-12 col-md-2-5">
    <div class="card card-book" style="width: 14rem;">
    <a href="detailbook.html?id=${t}"> <img class="card-img-top" height="195" src="${a}" alt="Card image cap">
    </a>    
    <div class="card-body">
        <a href="detailbook.html?id=${t}">
          <h5 data-toggle="tooltip" title="${e}" class="card-title long-text" >${e}</h5></a>
          <p class="card-text">${i}</p>
          <div class="rating">
            ${o}
          </div>
        </div>
      </div>
</div>
`}
