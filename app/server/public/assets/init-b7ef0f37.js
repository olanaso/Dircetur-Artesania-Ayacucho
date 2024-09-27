import{g as r,b as i,s as l}from"./config-d2c69cb0.js";function u(){$(function(){$(".loading-wrapper").fadeOut(2e3)})}function p(){$(function(){$(".loading-wrapper").show()})}async function f(){const t={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+r("accessToken"),Rol:r("rol")},body:new URLSearchParams({token:r("accessToken")})};try{const e=await(await fetch(i+"/protegido",t)).json();return l("session",e),e.isvalid||(location.href="sinacceso.html"),e}catch(a){console.error("Error:",a)}}function m(){setTimeout(()=>{let t=r("session").usuarios;$("#user-name").text(t.nombre_completo),$("#mlbliestp").text(t.nombre_completo),$("#mlblnombrerol").text(t.rol.denominacion),$("#m_programas").empty();let a="";for(let e of t.menu){if(a+=`
                <li>
            `,e.padreid==0&&e.hijoid==0)a+=` 
                    <a href="${e.enlace}" class="has-arrow1">
                        <span class="${e.estilo}">
                            <i class="${e.imagen}"></i>
                        </span>
                        <span class="nav-title">${e.nombre}</span>
                    </a> 
                `;else if(e.padreid==0&&e.hijoid!=0){a+=` 
                    <a href="${e.enlace}" class="has-arrow" aria-expanded="false">
                        <span class="${e.estilo}">
                            <i class="${e.imagen}"></i>
                        </span>
                        <span class="nav-title">${e.nombre}</span>
                    </a> 
                    <ul class="submenu" style="display: none;" aria-expanded="false">
                `;for(let s of t.menuhijo)s.padreid==e.id&&(a+=`  
                            <li>
                                <a href="${s.enlace}">${s.nombre}</a>
                            </li> 
                        `);a+=`   
                    </ul> 
                `}a+=`  
                </li>
            `}$("#unifyMenu").empty().append(a),$(document).on("click",".has-arrow",function(e){e.preventDefault();const s=$(this).next(".submenu"),n=$(this).attr("aria-expanded")==="true";$(".submenu").slideUp("fast").attr("aria-expanded","false"),$(".has-arrow").removeClass("active").attr("aria-expanded","false"),n||($(this).addClass("active").attr("aria-expanded","true"),s.slideDown("fast").attr("aria-expanded","true"))}),$(document).on("click",".submenu li a",function(e){$(".submenu li a").removeClass("active"),$(this).addClass("active")}),c()},500)}function c(){let a=window.location.pathname.replace("-detalle","");$("#unifyMenu .has-arrow1").each(function(){const e=$(this),s=e.attr("href");if(a===s)return e.addClass("active selected").attr("aria-expanded","true"),e.closest("li").addClass("active selected"),!1}),$("#unifyMenu .submenu li a").each(function(){const e=$(this),s=e.closest(".submenu"),n=s.prev(".has-arrow"),o=e.attr("href");if(a===o)return e.addClass("current-page"),n.addClass("active selected").attr("aria-expanded","true"),s.slideDown("fast").attr("aria-expanded","true"),n.closest("li").addClass("active selected"),!1})}export{f as c,u as h,m as l,p as s};
