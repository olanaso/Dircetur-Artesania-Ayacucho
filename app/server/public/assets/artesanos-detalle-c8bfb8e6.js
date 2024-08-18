import"./modulepreload-polyfill-3cfb730f.js";import{l as ie,_ as re}from"./viewpartials-7a86f681.js";import{F as le}from"./uploadJorge-fc196769.js";import{A as ce}from"./alert-3bd678b2.js";import{c as de,b,a as J}from"./config-ef5f6dbc.js";import{h as Z,l as se,s as ue}from"./init-52a8aa54.js";import{s as u}from"./toast-8abe4fe9.js";/* empty css              */async function me(r){try{const i={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(de+"/dni/"+r,i)).json()}catch(t){console.log("error",t)}}async function pe(r,t){const i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({artesano:r,usuario:t})};try{return await(await fetch(b+"/artesano/saveusuarioartesano/",i)).json()}catch(c){console.error("Error:",c)}}async function ge(r){try{const i={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(b+"/artesano/"+r,i)).json()}catch(t){console.log("error",t)}}async function ve(){try{const t={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(b+"/departamento",t)).json()}catch(r){console.log("error",r)}}async function $e(r){try{const i={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(b+"/ubigeo-provincias/"+r,i)).json()}catch(t){console.log("error",t)}}async function fe(r){try{const i={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(b+"/ubigeo-distritos/"+r,i)).json()}catch(t){console.log("error",t)}}async function be(r){try{const i={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(b+"/usuario/"+r,i)).json()}catch(t){console.log("error",t)}}const x=new ce;Z();(async function(){let r=[{path:"partials/shared/header.html",container:"app-header"},{path:"partials/shared/menu.html",container:"app-side"}];try{await ie(r),re(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),he()}catch(t){console.error(t)}})();function he(){setTimeout(function(){se()},500),ye()}var C=0,N=0;let P=0,w=0,M=0;var s=null,q=null;let O=0,_=0;async function ye(){$("#btnvalidar").on("click",async function(r){event.preventDefault();var t=document.getElementById("usuario").value,i=document.getElementById("contrasena").value,c=document.getElementById("repetirContrasena").value,o=!1;if(t.trim()===""){u("El campo usuario es obligatorio"),o=!0;return}else if(/^\w+$/.test(t))usuarioError.textContent="";else{u("El usuario solo puede contener letras, números y guiones bajos"),o=!0;return}if(i.trim()===""){u("El campo contraseña es obligatorio"),o=!0;return}else if(!/^\w+$/.test(i)){u("El contraseña solo puede contener letras, números y guiones bajos"),o=!0;return}if(c.trim()===""){u("Debe repetir la contraseña"),o=!0;return}else if(c!==i){u("Las contraseñas no coinciden"),o=!0;return}o||u("Se valido con exito")}),$("#btnguardarcambio").on("click",async function(r){debugger;r.preventDefault();{let I=$("#dni").val(),h=$("#ruc").val(),e=$("#nombres").val(),n=$("#apellidos").val(),d=$("#correo").val(),g=$("#celular").val(),m=$("#lugar_nacimiento").val(),v=$("#distrito").val(),f=$("#lengua_materna").val();var t=document.getElementById("imagenFoto1"),i=document.getElementById("imagenFoto2"),c=t.src,o=i.src;let y=[],a={id:1,nombretaller:$("#nombretaller").val(),horarioatencion:$("#horarioatencion").val(),ructaller:$("#ructaller").val(),direccionfisica:$("#direccionfisica").val(),latitud:$("#latitud").val(),longitud:$("#longitud").val()};y.push(a);let k=JSON.stringify(y),B=[],T={id:1,descripcionhabilidades:$("#descripcionhabilidades").val(),tipoartesania:$("#tipoartesania").val(),ceramica:$("#ceramica").is(":checked")?1:0,piedra:$("#piedra").is(":checked")?1:0,talabarteria:$("#talabarteria").is(":checked")?1:0,otro:$("#otro").is(":checked")?1:0,desotro:$("#desotro").val()};B.push(T);let X=JSON.stringify(B),H=[];$("#listaContacto tr").each(function(){let l=$(this),E={id:l.find("td").eq(0).text(),valor:l.find("td.ocultar").text(),tipo:l.find("td").eq(2).text(),Usuario:l.find("td").eq(3).text(),Enlace:l.find("td").eq(4).text()};H.push(E)});let Y=JSON.stringify(H),R=[];$("#listaMediopago tr").each(function(){let l=$(this),E={id:l.find("td").eq(0).text(),valor:l.find("td.ocultar").eq(0).text(),Pago:l.find("td").eq(2).text(),Banco:l.find("td.ocultar").eq(1).text(),Titular:l.find("td").eq(4).text(),Corriente:l.find("td").eq(5).text(),Interbancaria:l.find("td").eq(6).text(),Boleta:l.find("td.ocultar").eq(2).text(),Factura:l.find("td.ocultar").eq(3).text(),Recibo:l.find("td.ocultar").eq(4).text(),Local:l.find("td.ocultar").eq(5).text(),Departamental:l.find("td.ocultar").eq(6).text(),Internacional:l.find("td.ocultar").eq(7).text()};R.push(E)});let ee=JSON.stringify(R),U=[];$("#listaReconocimiento tr").each(function(){let l=$(this),E={id:l.find("td").eq(0).text(),Título:l.find("td").eq(1).text(),Entidad:l.find("td").eq(2).text(),Descripcion:l.find("td").eq(3).text()};U.push(E)});let te=JSON.stringify(U),z=$("#usuario").val(),oe=$("#contrasena").val(),j=[];$("#videoList tr").each(function(){let l=$(this),E={id:l.find("td").eq(0).text(),nombre:l.find("td").eq(1).text(),src:l.find("a").attr("href")};j.push(E)});let ae=JSON.stringify(j),V=[];$("#videoList2 tr").each(function(){let l=$(this),E={id:l.find("td").eq(0).text(),nombre:l.find("td").eq(1).text(),src:l.find("a").attr("href")};V.push(E)});let ne=JSON.stringify(V);x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas guardar?","Cancelar","Continuar",async()=>{try{ue();debugger;let l={id:N,usuarioid:N,usuario:z,nombre_completo:e+" "+n,clave:oe,rolid:2,tipousuario:2,estado:1,usuario:z};await pe({artesanoId:C,dni:I,ruc:h,nombres:e,apellidos:n,correo:d,celular:g,lugar_nacimiento:m,ubigeo:v,lengua_materna:f,foto1:c,foto2:o,lst_taller:k,lst_especialidadtecnicas:X,lst_contactos:Y,lst_mediospago:ee,lst_reconocimientos:te,usuario_id:N,lst_videoenlace:ne,lst_videos:ae},l)?(u("Se actualizo los datos correctamente"),Z(),$("#myModal").css("display","none")):u("Ocurrio un error.")}catch(l){console.error("Error al eliminar la foto de perfil:",l)}})}})}async function Ee(r){s=await ge(r),N=s.usuario_id,$("#dni").val(s.dni),$("#ruc").val(s.ruc),$("#nombres").val(s.nombres),$("#apellidos").val(s.apellidos),$("#correo").val(s.correo),$("#celular").val(s.celular),$("#lugar_nacimiento").val(s.lugar_nacimiento),await K(),$("#region").val(s.ubigeo.substring(0,2)),await Q(s.ubigeo.substring(0,2)),$("#provincia").val(s.ubigeo.substring(0,4)),await W(s.ubigeo.substring(0,4)),$("#distrito").val(s.ubigeo),$("#lengua_materna").val(s.lengua_materna),document.getElementById("imagenFoto1").src=s.foto1,document.getElementById("imagenFoto2").src=s.foto2;const t=JSON.parse(s.lst_taller);JSON.parse(t).forEach(a=>{$("#nombretaller").val(a.nombretaller),$("#horarioatencion").val(a.horarioatencion),$("#ructaller").val(a.ructaller),$("#direccionfisica").val(a.direccionfisica),$("#latitud").val(a.latitud),$("#longitud").val(a.longitud)});const c=JSON.parse(s.lst_especialidadtecnicas);JSON.parse(c).forEach(a=>{$("#descripcionhabilidades").val(a.descripcionhabilidades),$("#tipoartesania").val(a.tipoartesania),a.ceramica===1?document.getElementById("ceramica").checked=!0:document.getElementById("ceramica").checked=!1,a.piedra===1?document.getElementById("piedra").checked=!0:document.getElementById("piedra").checked=!1,a.talabarteria===1?document.getElementById("talabarteria").checked=!0:document.getElementById("talabarteria").checked=!1;var p=document.getElementById("desotro");a.otro===1?(document.getElementById("otro").checked=!0,p.disabled=!1,$("#desotro").val(a.desotro)):(document.getElementById("otro").checked=!1,p.disabled=!0)});const I=JSON.parse(s.lst_contactos);JSON.parse(I).forEach(a=>{P++;let p=`  
                  <tr>
                    <td>${P}</td>
                    <td class="ocultar">${a.valor}</td> 
                    <td>${a.tipo}</td> 
                    <td>${a.Usuario}</td> 
                    <td>${a.Enlace}</td> 
                    <td>
                        <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Contacto">
                        <i class="icon icon-bin"></i>
                        </button> 
        
                    </td>
                </tr>

              `;document.getElementById("listaContacto").insertAdjacentHTML("beforeend",p)});const e=JSON.parse(s.lst_mediospago);JSON.parse(e).forEach(a=>{w++;let p=`   
                    <tr>
                      <td>${w}</td>
                      <td class="ocultar">${a.valor}</td> 
                      <td>${a.Pago}</td> 
                      <td class="ocultar">${a.Banco}</td> 
                      <td>${a.Titular}</td> 
                      <td>${a.Corriente}</td> 
                      <td>${a.Interbancaria}</td>  
                      <td class="ocultar">${a.Boleta}</td> 
                      <td class="ocultar">${a.Factura}</td> 
                      <td class="ocultar">${a.Recibo}</td> 
                      <td class="ocultar">${a.Local}</td> 
                      <td class="ocultar">${a.Departamental}</td> 
                      <td class="ocultar">${a.Internacional}</td> 
                      <td>
                          <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-Mediopago">
                              <i class="icon icon-pencil"></i>
                          </button>
                          <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Mediopago">
                            <i class="icon icon-bin"></i>
                          </button> 
          
                      </td>
                </tr>

              `;document.getElementById("listaMediopago").insertAdjacentHTML("beforeend",p)});const d=JSON.parse(s.lst_reconocimientos);JSON.parse(d).forEach(a=>{M++;let p=`   
                    <tr>
                        <td>${M}</td> 
                        <td class="titulo">${a.Título}</td> 
                        <td class="entidad">${a.Entidad}</td> 
                        <td class="descripcion">${a.Descripcion}</td>  
                        <td> 

                        <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-reconocimiento">
                                    <i class="icon icon-pencil"></i>
                        </button>
                        <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-reconocimiento">
                                  <i class="icon icon-bin"></i>
                        </button> 
            
                        </td>
                    </tr>

              `;document.getElementById("listaReconocimiento").insertAdjacentHTML("beforeend",p)}),q=await be(s.usuario_id),$("#usuario").val(q.usuario),$("#contrasena").val(q.clave),$("#repetirContrasena").val(q.clave);const m=JSON.parse(s.lst_videos);JSON.parse(m).forEach(a=>{O++;let p=`
              <tr>
                  <td>${O}</td>
                  <td>${a.nombre}</td>
                  <td><a href="${a.src}" target="_blank">Video subido</a></td>
                  <td>
                      <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${a.src}">Ver</button>  
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video">
                      <i class="icon icon-bin"></i> 
                  </td>
              </tr>
              `;document.getElementById("videoList").insertAdjacentHTML("beforeend",p)});const f=JSON.parse(s.lst_videoenlace);JSON.parse(f).forEach(a=>{_++;let p=` 
              <tr>
                  <td>${_}</td>
                  <td>${a.nombre}</td>
                  <td><a href="${a.src}" target="_blank">${a.src}</a></td>
                  <td>
                      <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${a.src}">Ver</button> 
                      
                      <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video1">
                      <i class="icon icon-bin"></i> 
                  </td>
              </tr>
              `;document.getElementById("videoList2").insertAdjacentHTML("beforeend",p)})}const S=document.getElementById("region"),L=document.getElementById("provincia"),F=document.getElementById("distrito");S.addEventListener("change",function(){var r=document.getElementById("region"),t=r.value;Q(t)});L.addEventListener("change",function(){var r=document.getElementById("provincia"),t=r.value;W(t)});async function K(){try{const r=await ve();S.innerHTML="";let t=document.createElement("option");t.value="0",t.textContent="Seleccionar",S.appendChild(t),r.forEach(i=>{let c=document.createElement("option");c.value=i.iddepartamento,c.textContent=i.departamento,S.appendChild(c)})}catch(r){console.error("Error al llenar el select:",r)}}async function Q(r){try{const t=await $e(r);L.innerHTML="";let i=document.createElement("option");i.value="0",i.textContent="Seleccionar",L.appendChild(i),t.forEach(c=>{let o=document.createElement("option");o.value=c.idprovincia,o.textContent=c.provincia,L.appendChild(o)})}catch(t){console.error("Error al llenar el select:",t)}}async function W(r){try{const t=await fe(r);F.innerHTML="";let i=document.createElement("option");i.value="0",i.textContent="Seleccionar",F.appendChild(i),t.forEach(c=>{let o=document.createElement("option");o.value=c.ubigeo,o.textContent=c.distrito,F.appendChild(o)})}catch(t){console.error("Error al llenar el select:",t)}}function Ie(){$("#home-tab2, #home-tab3, #home-tab4, #home-tab5, #home-tab6").addClass("disabled")}$(document).ready(function(){K(),document.getElementById("guardarMediopagoBtn").style.display="inline-block",document.getElementById("editarMediopagoBtn").style.display="none",document.getElementById("guardarreconocimientoBtn").style.display="inline-block",document.getElementById("editarreconocimientoBtn").style.display="none",C=new URLSearchParams(window.location.search).get("id");var t=document.getElementById("tituloartesano");C!=0?(t.innerText="Editar artesano",$("#btnguardarcambio").text("Actualizar"),Ee(C)):(Ie(),t.innerText="Nuevo artesano"),$("#addcontactoButton").on("click",function(){let e=$("#tiporedsocial").val(),n=$("#usuarionumero").val(),d=$("#enlacecontacto").val();if(e==="0"){u("Por favor de seleccionar tipo.");return}if(n===""){u("Por favor, ingresar usuario / número.");return}if(d===""){u("Por favor, ingresar enlace de contacto.");return}const m=document.getElementById("tiporedsocial").options;let v="",f="";for(let a=0;a<m.length;a++)v=m[a].text,f=m[a].value,console.log(`Texto: ${v}, Valor: ${f}`);P++;let y=`
        <tr>
            <td>${P}</td>
            <td class="ocultar">${f}</td> 
            <td>${v}</td> 
            <td>${n}</td> 
            <td>${d}</td> 
            <td>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Contacto">
                <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;$("#listaContacto").append(y),$("#tiporedsocial").val(0),$("#usuarionumero").val(""),$("#enlacecontacto").val("")}),$(document).on("click",".btn-delete-Contacto",function(){x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar?","Cancelar","Continuar",async()=>{try{$(this).closest("tr").remove(),P--,$("#listaContacto tr").each(function(e,n){$(n).find("td:first").text(e+1)})}catch(e){console.error("Error al eliminar:",e)}})}),$("#guardarMediopagoBtn").on("click",function(){let e=$("#tipomediopago").val(),n=$("#nombrebanco").val(),d=$("#nombretitular").val(),g=$("#cuentacorriente").val(),m=$("#cuentainterbancaria").val(),v=$("#boleta").is(":checked")?1:0,f=$("#factura").is(":checked")?1:0,y=$("#recibohonorario").is(":checked")?1:0,a=$("#local").is(":checked")?1:0,p=$("#departamental").is(":checked")?1:0,k=$("#internacional").is(":checked")?1:0;if(e==="0"){u("Por favor de seleccionar tipo.");return}if(n===""||d===""||g===""||m===""){u("Por favor, todos los campos *.");return}let B=$("#tipomediopago").val(),T=$("#tipomediopago option:selected").text();w++;let D=`
        <tr>
            <td>${w}</td>
            <td class="ocultar">${B}</td> 
            <td>${T}</td> 
            <td class="ocultar">${n}</td> 
            <td>${d}</td> 
            <td>${g}</td> 
            <td>${m}</td> 
            <td class="ocultar">${v}</td> 
            <td class="ocultar">${f}</td> 
            <td class="ocultar">${y}</td> 
            <td class="ocultar">${a}</td> 
            <td class="ocultar">${p}</td> 
            <td class="ocultar">${k}</td> 
            <td>
                <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-Mediopago">
                    <i class="icon icon-pencil"></i>
                </button>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-Mediopago">
                <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;$("#listaMediopago").append(D),$("#tipomediopago").val(0),$("#nombrebanco").val(""),$("#nombretitular").val(""),$("#cuentacorriente").val(""),$("#cuentainterbancaria").val(""),$("#boleta").prop("checked",!1),$("#factura").prop("checked",!1),$("#recibohonorario").prop("checked",!1),$("#local").prop("checked",!1),$("#departamental").prop("checked",!1),$("#internacional").prop("checked",!1),$("#addmediopagoModal").modal("hide")});var i=0,c=document.getElementById("addmediopagoModalLabel");$("#addmediopagoModal").on("shown.bs.modal",function(){i!==1&&($("#tituloreconocimiento").val(""),$("#entidadreconoce").val(""),$("#descripcionreconocimiento").val(""),c.innerText="Nuevo medio de pago")}),$("#addmediopagoModal").on("hide.bs.modal",function(){$("#tipomediopago").val(0),$("#nombrebanco").val(""),$("#nombretitular").val(""),$("#cuentacorriente").val(""),$("#cuentainterbancaria").val(""),$("#boleta").prop("checked",!1),$("#factura").prop("checked",!1),$("#recibohonorario").prop("checked",!1),$("#local").prop("checked",!1),$("#departamental").prop("checked",!1),$("#internacional").prop("checked",!1),i=0,c.innerText="Nuevo medio de pago"}),$("#listaMediopago").on("click",".btn-edit-Mediopago",function(){o=$(this).closest("tr");let e=o.find("td:eq(1)").text();o.find("td:eq(2)").text();let n=o.find("td:eq(3)").text(),d=o.find("td:eq(4)").text(),g=o.find("td:eq(5)").text(),m=o.find("td:eq(6)").text(),v=o.find("td:eq(7)").text(),f=o.find("td:eq(8)").text(),y=o.find("td:eq(9)").text(),a=o.find("td:eq(10)").text(),p=o.find("td:eq(11)").text(),k=o.find("td:eq(12)").text();$("#tipomediopago").val(e),$("#nombrebanco").val(n),$("#nombretitular").val(d),$("#cuentacorriente").val(g),$("#cuentainterbancaria").val(m),v==1?document.getElementById("boleta").checked=!0:document.getElementById("boleta").checked=!1,f==1?document.getElementById("factura").checked=!0:document.getElementById("factura").checked=!1,y==1?document.getElementById("recibohonorario").checked=!0:document.getElementById("recibohonorario").checked=!1,a==1?document.getElementById("local").checked=!0:document.getElementById("local").checked=!1,p==1?document.getElementById("departamental").checked=!0:document.getElementById("departamental").checked=!1,k==1?document.getElementById("internacional").checked=!0:document.getElementById("internacional").checked=!1,document.getElementById("guardarMediopagoBtn").style.display="none",document.getElementById("editarMediopagoBtn").style.display="inline-block",c.innerText="Editar medio de pago",i=1,$("#addmediopagoModal").modal("show")}),$(document).on("click",".btn-delete-Mediopago",function(){x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar?","Cancelar","Continuar",async()=>{try{$(this).closest("tr").remove(),w--,$("#listaMediopago tr").each(function(e,n){$(n).find("td:first").text(e+1)})}catch(e){console.error("Error al eliminar:",e)}})}),$("#editarMediopagoBtn").on("click",function(){let e=$("#tipomediopago").val(),n=$("#tipomediopago option:selected").text(),d=$("#nombrebanco").val(),g=$("#nombretitular").val(),m=$("#cuentacorriente").val(),v=$("#cuentainterbancaria").val(),f=$("#boleta").is(":checked")?1:0,y=$("#factura").is(":checked")?1:0,a=$("#recibohonorario").is(":checked")?1:0,p=$("#local").is(":checked")?1:0,k=$("#departamental").is(":checked")?1:0,B=$("#internacional").is(":checked")?1:0;o.find("td:eq(1)").text(e),o.find("td:eq(2)").text(n),o.find("td:eq(3)").text(d),o.find("td:eq(4)").text(g),o.find("td:eq(5)").text(m),o.find("td:eq(6)").text(v),o.find("td:eq(7)").text(f),o.find("td:eq(8)").text(y),o.find("td:eq(9)").text(a),o.find("td:eq(10)").text(p),o.find("td:eq(11)").text(k),o.find("td:eq(12)").text(B),document.getElementById("guardarMediopagoBtn").style.display="inline-block",document.getElementById("editarMediopagoBtn").style.display="none",$("#tipomediopago").val(0),$("#nombrebanco").val(""),$("#nombretitular").val(""),$("#cuentacorriente").val(""),$("#cuentainterbancaria").val(""),$("#boleta").prop("checked",!1),$("#factura").prop("checked",!1),$("#recibohonorario").prop("checked",!1),$("#local").prop("checked",!1),$("#departamental").prop("checked",!1),$("#internacional").prop("checked",!1),$("#addmediopagoModal").modal("hide"),i=0}),$("#guardarreconocimientoBtn").on("click",function(){let e=$("#tituloreconocimiento").val(),n=$("#entidadreconoce").val(),d=$("#descripcionreconocimiento").val();if(e===""||n===""||d===""){u("Por favor, todos los campos *.");return}M++;let g=`
        <tr>
            <td>${M}</td> 
            <td class="titulo">${e}</td> 
            <td class="entidad">${n}</td> 
            <td class="descripcion">${d}</td>  
            <td>
                  <button type="button" data-toggle="tooltip" title="Editar" class="btn btn-warning btn-sm btn-edit-reconocimiento">
                            <i class="icon icon-pencil"></i>
                 </button>
                <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-reconocimiento">
                      <i class="icon icon-bin"></i>
                </button> 

            </td>
        </tr>
    `;$("#listaReconocimiento").append(g),$("#tituloreconocimiento").val(""),$("#entidadreconoce").val(""),$("#descripcionreconocimiento").val(""),$("#addreconocimmientoModal").modal("hide")});let o;var I=document.getElementById("addreconocimmientoModalLabel"),h=0;$("#listaReconocimiento").on("click",".btn-edit-reconocimiento",function(){o=$(this).closest("tr");let e=o.find(".titulo").text(),n=o.find(".entidad").text(),d=o.find(".descripcion").text();$("#tituloreconocimiento").val(e),$("#entidadreconoce").val(n),$("#descripcionreconocimiento").val(d),document.getElementById("guardarreconocimientoBtn").style.display="none",document.getElementById("editarreconocimientoBtn").style.display="inline-block",$("#addreconocimmientoModal").modal("show"),I.innerText="Editar Reconocimiento",h=1}),$(document).on("click",".btn-delete-reconocimiento",function(){x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar?","Cancelar","Continuar",async()=>{try{$(this).closest("tr").remove(),w--,$("#listaReconocimiento tr").each(function(e,n){$(n).find("td:first").text(e+1)})}catch(e){console.error("Error al eliminar:",e)}})}),$("#addreconocimmientoModal").on("shown.bs.modal",function(){if(h!==1){$("#tituloreconocimiento").val(""),$("#entidadreconoce").val(""),$("#descripcionreconocimiento").val("");var e=document.getElementById("addreconocimmientoModalLabel");e.innerText="Nuevo reconocimiento"}}),$("#addreconocimmientoModal").on("hide.bs.modal",function(){$("#tituloreconocimiento").val(""),$("#entidadreconoce").val(""),$("#descripcionreconocimiento").val(""),h=0;var e=document.getElementById("addreconocimmientoModalLabel");e.innerText="Nuevo reconocimiento"}),$("#editarreconocimientoBtn").on("click",function(){let e=$("#tituloreconocimiento").val(),n=$("#entidadreconoce").val(),d=$("#descripcionreconocimiento").val();o.find(".titulo").text(e),o.find(".entidad").text(n),o.find(".descripcion").text(d),document.getElementById("guardarreconocimientoBtn").style.display="inline-block",document.getElementById("editarreconocimientoBtn").style.display="none",$("#tituloreconocimiento").val(""),$("#entidadreconoce").val(""),$("#descripcionreconocimiento").val(""),$("#addreconocimmientoModal").modal("hide"),h=0}),$("#guardarPrincipalBtn").on("click",function(){let e=$("#principalImagePreview").attr("src"),n=$("#principalImageName").val();if($("#imageName").val(),$("#imagePreview").attr("src"),!e||!n){u("Por favor, suba una imagen.");return}$("#imagenFoto1").attr("src",e),$("#imagenFoto1Modal").modal("hide"),$("#imagenPrincipalForm")[0].reset(),$("#principalImagePreview").hide()}),$("#limpiarFoto1Btn").on("click",function(){$("#imagenFoto1").attr("src","/img/sin_imagen.jpg")}),$("#guardarPrincipal2Btn").on("click",function(){let e=$("#principalImage2Preview").attr("src"),n=$("#principalImage2Name").val();if($("#imageName").val(),$("#imagePreview").attr("src"),!e||!n){u("Por favor, suba una imagen.");return}$("#imagenFoto2").attr("src",e),$("#imagenFoto2Modal").modal("hide"),$("#imagenPrincipal2Form")[0].reset(),$("#principalImage2Preview").hide()}),$("#limpiarFoto2Btn").on("click",function(){$("#imagenFoto2").attr("src","/img/sin_imagen.jpg")}),$("#addVideoLink").on("click",function(){let e=$("#linkVideoName").val(),n=$("#videoLink").val();if(!e||!n){u("Por favor, complete todos los campos *.");return}var d=document.getElementById("videoLink").value;document.getElementById("message");var g=new RegExp("^(https?:\\/\\/)?((([a-zA-Z0-9]{1,}\\.)?[a-zA-Z0-9]{2,}\\.[a-zA-Z]{2,})|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?(\\#[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$","i");if(!g.test(d)){u("URL no válida."),$("#videoLink").val("");return}_++;let m=`
          <tr>
              <td>${_}</td>
              <td>${e}</td>
              <td><a href="${n}" target="_blank">${n}</a></td>
              <td>
                  <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${n}">Ver</button> 
                  
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video1">
                  <i class="icon icon-bin"></i> 
              </td>
          </tr>
      `;$("#videoList2").append(m),$("#linkForm")[0].reset()}),$(document).on("click",".btn-delete-video1",function(){x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar?","Cancelar","Continuar",async()=>{try{$(this).closest("tr").remove(),contadorImagenes--,$("#videoList2 tr").each(function(e,n){$(n).find("td:first").text(e+1)})}catch(e){console.error("Error al eliminar:",e)}})}),$(document).on("click",".btn-view-video",function(){let e=$(this).data("link"),n=e;e.includes("youtube.com/watch")?n=`https://www.youtube.com/embed/${new URLSearchParams(new URL(e).search).get("v")}`:e.includes("youtu.be")&&(n=`https://www.youtube.com/embed/${e.split("/").pop()}`),$("#videoPlayer").attr("src",n),$("#videoModal").modal("show")}),$("#videoModal").on("hidden.bs.modal",function(){$("#videoPlayer").attr("src","")}),$("#uploadVideo").on("change",function(){let e=$(this).prop("files")[0];if(e){let n=(e.size/1048576).toFixed(2);if($("#fileSize").text(`${n}mb`),e.size>100*1024*1024)$("#uploadProgress").addClass("bg-danger").text("100%"),$("#uploadProgress").css("width","100%");else{let d=(e.size/104857600*100).toFixed(0);$("#uploadProgress").removeClass("bg-danger").addClass("bg-success").text(`${d}%`),$("#uploadProgress").css("width",`${d}%`)}}else $("#fileSize").text("100mb"),$("#uploadProgress").removeClass("bg-danger bg-success").text("0%"),$("#uploadProgress").css("width","0%")}),$("#cancelUpload").on("click",function(){$("#uploadVideo").val(""),$("#fileSize").text("100mb"),$("#uploadProgress").removeClass("bg-danger bg-success").text("0%"),$("#uploadProgress").css("width","0%")}),$("#registerVideo").on("click",function(){let e=$("#videoName").val(),n=$("#uploadVideo").prop("files")[0];if(!e||!n){u("Por favor, complete todos los campos *.");return}if(n.size>100*1024*1024){u("El archivo no debe pesar más de 100mb.");return}O++;var d=document.getElementById("videoPreview"),g=d.src;let m=g,v=`
          <tr>
              <td>${O}</td>
              <td>${e}</td>
              <td><a href="${m}" target="_blank">Video subido</a></td>
              <td>
                  <button type="button" class="btn btn-info btn-sm btn-view-video" data-link="${m}">Ver</button>  
                  <button type="button" data-toggle="tooltip"  title="Eliminar" class="btn btn-primary btn-sm btn-delete-video">
                  <i class="icon icon-bin"></i> 
              </td>
          </tr>
      `;$("#videoList").append(v),$("#videoForm")[0].reset(),$("#fileSize").text("100mb"),$("#uploadProgress").removeClass("bg-danger bg-success").text("0%"),$("#uploadProgress").css("width","0%")}),$(document).on("click",".btn-delete-video",function(){x.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar?","Cancelar","Continuar",async()=>{try{$(this).closest("tr").remove(),contadorImagenes--,$("#videoList tr").each(function(e,n){$(n).find("td:first").text(e+1)})}catch(e){console.error("Error al eliminar:",e)}})})});document.addEventListener("DOMContentLoaded",()=>{A({fileInputId:"uploadPrincipalImage",progressBarId:"progressBar",statusElementId:"status",uploadUrl:b+"/artesano/fileupload",callback:Be,folder:"/artesano/img/"})});document.addEventListener("DOMContentLoaded",()=>{A({fileInputId:"uploadVideo",progressBarId:"progressBar",statusElementId:"status",uploadUrl:b+"/producto/fileupload",callback:ke,folder:"/producto/video/"})});function ke(r){$("#videoPreview").attr("src",J(b)+r.path).show()}function Be(r){let t=$("#uploadPrincipalImage").prop("files")[0];if(t){let i=new FileReader;i.onload=function(c){$("#principalImagePreview").attr("src",J(b)+r.path).show(),$("#principalImageName").val(t.name)},i.readAsDataURL(t)}else u("Por favor, seleccione un archivo para visualizar.")}document.addEventListener("DOMContentLoaded",()=>{A({fileInputId:"uploadPrincipal2Image",progressBarId:"progressBar2",statusElementId:"status",uploadUrl:b+"/artesano/fileupload",callback:xe,folder:"/artesano/img/"})});function xe(r){let t=$("#uploadPrincipal2Image").prop("files")[0];if(t){let i=new FileReader;i.onload=function(c){$("#principalImage2Preview").attr("src",J(b)+r.path).show(),$("#principalImage2Name").val(t.name)},i.readAsDataURL(t)}else u("Por favor, seleccione un archivo para visualizar.")}function A({fileInputId:r,progressBarId:t,statusElementId:i,uploadUrl:c,folder:o,callback:I}){const h=document.getElementById(r),e=h.name,n=document.getElementById(t),d=document.getElementById(i);h&&n&&d?new le(c,n,d,I,e,o).attachToFileInput(h):console.error("Initialization failed: One or more elements not found.")}const G=document.getElementById("dni"),we=document.getElementById("nombres"),Pe=document.getElementById("apellidos");G.addEventListener("input",async function(){const r=G.value.trim();if(r.length==8){const i=await me(r);i!=null?(we.value=i.nombres,Pe.value=i.apellidoPaterno+" "+i.apellidoMaterno):(u("El DNI no esta registrado en reniec"),$("#nombres").val(""),$("#apellidos").val(""))}});document.getElementById("otro").addEventListener("change",function(){var r=this,t=document.getElementById("desotro");t.disabled=!r.checked,$("#desotro").val("")});
