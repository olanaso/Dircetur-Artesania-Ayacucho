import"./modulepreload-polyfill-3cfb730f.js";import{_ as B}from"./preload-helper-101896b7.js";import{l as w,f as I,b as D}from"./api-21eb476b.js";import{A as M}from"./alert-3bd678b2.js";import{l as P}from"./viewpartials-ac66bf27.js";import{h as T,l as F}from"./init-b7ef0f37.js";import"./config-d2c69cb0.js";const S=new M;T();(async function(){let e=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await P(e),B(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),O()}catch(a){console.error(a)}})();function O(){setTimeout(function(){F()},500)}const p=10;let t=1,k=0,v={};async function _(){try{let e;if(Object.keys(v).length===0)e=await w(t,p);else{const a={...v,page:t,limit:p};e=await I(a)}A(e.clientes),k=Math.ceil(e.totalItems/p),N(k,e.totalItems)}catch(e){console.error("Error:",e)}}function N(e,a){const b=(t-1)*p+1;let n=t*p;n>a&&(n=a);const m=document.getElementById("paginationInfo");m.innerHTML=`Viendo del ${b} a ${n} de un total de ${a} resultados`;const s=document.getElementById("paginationControls");s.innerHTML="";const c=document.createElement("li");c.className="paginate_button page-item previous",c.id="apiCallbacks_previous",t===1&&c.classList.add("disabled");const u=document.createElement("a");u.className="page-link",u.href="#",u.textContent="Anterior",u.addEventListener("click",()=>g(t-1)),c.appendChild(u),s.appendChild(c);const y=3;if(e<=y)for(let r=1;r<=e;r++){const o=document.createElement("li");o.className="paginate_button page-item",r===t&&o.classList.add("active");const d=document.createElement("a");d.className="page-link",d.href="#",d.textContent=r,d.addEventListener("click",()=>g(r)),o.appendChild(d),s.appendChild(o)}else{const r=document.createElement("li");r.className="paginate_button page-item",t===1&&r.classList.add("active");const o=document.createElement("a");if(o.className="page-link",o.href="#",o.textContent=1,o.addEventListener("click",()=>g(1)),r.appendChild(o),s.appendChild(r),t>Math.floor(y/2)+1){const i=document.createElement("li");i.className="paginate_button page-item disabled",i.id="apiCallbacks_ellipsis";const l=document.createElement("a");l.className="page-link",l.href="#",l.textContent="…",i.appendChild(l),s.appendChild(i)}let d=Math.max(t-Math.floor(y/2),2),x=Math.min(d+y-1,e-1);for(let i=d;i<=x;i++){const l=document.createElement("li");l.className="paginate_button page-item",i===t&&l.classList.add("active");const E=document.createElement("a");E.className="page-link",E.href="#",E.textContent=i,E.addEventListener("click",()=>g(i)),l.appendChild(E),s.appendChild(l)}if(x<e-1){const i=document.createElement("li");i.className="paginate_button page-item disabled",i.id="apiCallbacks_ellipsis";const l=document.createElement("a");l.className="page-link",l.href="#",l.textContent="…",i.appendChild(l),s.appendChild(i)}const L=document.createElement("li");L.className="paginate_button page-item",t===e&&L.classList.add("active");const C=document.createElement("a");C.className="page-link",C.href="#",C.textContent=e,C.addEventListener("click",()=>g(e)),L.appendChild(C),s.appendChild(L)}const f=document.createElement("li");f.className="paginate_button page-item next",f.id="apiCallbacks_next",t===e&&f.classList.add("disabled");const h=document.createElement("a");h.className="page-link",h.href="#",h.textContent="Siguiente",h.addEventListener("click",()=>g(t+1)),f.appendChild(h),s.appendChild(f)}async function g(e){e!==t&&(t=e,await _())}function A(e){$("#listaClientes").empty();let a="";for(let n of e){let m="";n.estado?m='<span class="badge badge-pill badge-success">Activo</span>':m='<span class="badge badge-pill badge-danger">Desactivo</span>',a+=`<tr>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${n.id}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${n.nombres+" "+n.apellidos}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${n.correo}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              ${m}
            </td>
            <td class="border-b border-gray-200 bg-white text-sm">
              <button type="button" class="btn btn-light btn-sm">
                <a href="/clientes-detalle.html?id=${n.id}"><i class="icon icon-eye2"></i></a>
              </button>
              <button type="button" class="btn btn-primary btn-sm ml-2" data-id="${n.id}">
                <i class="icon icon-bin"></i>
              </button>
            </td>
          </tr>`}let b=`
    <table class="table m-0" id="tablaCliente"">
        <thead class="thead-default">
          <tr>
            <th>
              ID
            </th>
            <th>
              Nombres y Apellidos
            </th>
            <th>
              Correo
            </th>
            <th>
              Estado
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>`+a+`
          
        </tbody>
      </table>`;$("#listaClientes").append(b),document.querySelectorAll(".btn-primary.btn-sm.ml-2").forEach(n=>{n.addEventListener("click",()=>{V(n.getAttribute("data-id"))})})}async function V(e){S.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar el slider?","Cancelar","Continuar",async()=>{try{await D(e)?(console.log("Cliente eliminado exitosamente"),await _()):console.error("Error al eliminar la Cliente")}catch(a){console.error("Error:",a)}})}async function q(){document.getElementById("filtrar-Cliente").addEventListener("click",async a=>{a.preventDefault();const b=document.getElementById("nombre-Cliente").value,n=document.getElementById("apellido-Cliente").value,m=document.getElementById("correo-Cliente").value;t=1,v={nombres:b,apellidos:n,correo:m};try{const s={...v,page:t,limit:p},c=await I(s);A(c.clientes),k=Math.ceil(c.totalItems/p),N(k,c.totalItems)}catch(s){console.error("Error al filtrar pedidos:",s)}})}function H(){document.getElementById("limpiar-filtro").addEventListener("click",a=>{a.preventDefault(),document.getElementById("filtrarCliente").reset()})}document.addEventListener("DOMContentLoaded",()=>{_(),q(),H()});
