import { baseUrl,getDataFromLocalStorage } from './config';
import {saveDataToLocalStorage} from '../utils/config'

export async function validateToken (usuario, clave) {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            token: getDataFromLocalStorage('accessToken')
        }),
    };

    try {
        const response = await fetch(baseUrl + "/api/protegido", settings);
        const data = await response.json();
        saveDataToLocalStorage('session',data)
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}

export function hideLoading(){
    $(function() {
        $(".loading-wrapper").fadeOut(2000);
    });
}

export function showLoading(){
    $(function() {
        $(".loading-wrapper").show();
    });
}


export function obtenerIESTP(){
    $(function() {
        $(".loading-wrapper").fadeOut(2000);
    });
}

export async function checkSession(){
    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: getDataFromLocalStorage('accessToken')
        }),
      };
    
      try {
        const response = await fetch(baseUrl+"/protegido", settings);
        const data = await response.json();
        saveDataToLocalStorage('session',data)
        if(!data.isvalid){
            location.href = "sinacceso.html"
        }
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}


export function llenarinformacionIESTPProg () {
 

    setTimeout(() => {
        let usuario=getDataFromLocalStorage('session').usuarios;
        $('#user-name').text(usuario.nombre_completo)
        $('#mlbliestp').text(usuario.nombre_completo)
       // $('#mlbliestp').text(usuario.nombre_completo)
        $('#mlblnombrerol').text(usuario.rol.denominacion)
        //$('#logoiestpheader').attr('src',usuario.rol.denominacion)
        $('#m_programas').empty(); 
    
    
        let nro = 0;
        let nroitem = 0;
        let htmlContent = '';
    
        for (let prog of usuario.menu) {
            nroitem = 1;
    
            htmlContent += `
                <li>
            `;
    
            if (prog.padreid == 0 && prog.hijoid == 0) {
                htmlContent += ` 
                    <a href="${prog.enlace}" class="has-arrow1">
                        <span class="${prog.estilo}">
                            <i class="${prog.imagen}"></i>
                        </span>
                        <span class="nav-title">${prog.nombre}</span>
                    </a> 
                `;
            } else if (prog.padreid == 0 && prog.hijoid != 0) {
                htmlContent += ` 
                    <a href="${prog.enlace}" class="has-arrow" aria-expanded="false">
                        <span class="${prog.estilo}">
                            <i class="${prog.imagen}"></i>
                        </span>
                        <span class="nav-title">${prog.nombre}</span>
                    </a> 
                    <ul class="submenu" style="display: none;" aria-expanded="false">
                `;
    
                for (let progitem of usuario.menuhijo) {
                    if (progitem.padreid == prog.id) {
                        htmlContent += `  
                            <li>
                                <a href="${progitem.enlace}">${progitem.nombre}</a>
                            </li> 
                        `;
                        nroitem++;
                    }
                }
    
                htmlContent += `   
                    </ul> 
                `;
            }
    
            htmlContent += `  
                </li>
            `;
            nro++;
        }
    
        $('#unifyMenu').empty().append(htmlContent);
    
    
    
            // Event listener para el toggle del submenú
            $(document).on('click', '.has-arrow', function(e) {
                e.preventDefault();
                const $submenu = $(this).next('.submenu');
                const isExpanded = $(this).attr('aria-expanded') === 'true';
    
                // Cerrar todos los submenús
                $('.submenu').slideUp('fast').attr('aria-expanded', 'false');
                $('.has-arrow').removeClass('active').attr('aria-expanded', 'false');
    
                // Abrir el submenú clickeado si no está abierto
                if (!isExpanded) {
                    $(this).addClass('active').attr('aria-expanded', 'true');
                    $submenu.slideDown('fast').attr('aria-expanded', 'true');
                }
            });
    
            // Event listener opcional para clic en elemento de submenú
            $(document).on('click', '.submenu li a', function(e) {
                // Remover clase activa de todos los elementos de submenú
                $('.submenu li a').removeClass('active');
    
                // Agregar clase activa al elemento de submenú clickeado
                $(this).addClass('active');
            });

            marcarSubMenuSeleccionado();
    }, 80); // Simula un proceso que tarda 1 segundo
        
    
    
 
    
     
  }
  // Función para marcar el submenú y sus elementos como activos
  export function marcarSubMenuSeleccionado() { 
    const currentPath = window.location.pathname; // Obtener la ruta actual
    let currentPath2 = currentPath.replace("-detalle", "");

    // Iterar sobre los elementos del menú principal
    $('#unifyMenu .has-arrow1').each(function() {
        const $this = $(this);
        const href = $this.attr('href');

        // Verificar si la ruta actual coincide con el enlace del menú principal
        if (currentPath2 === href) {
            // Marcar el menú principal como activo
            $this.addClass('active selected').attr('aria-expanded', 'true');
            $this.closest('li').addClass('active selected');

            // Salir del bucle each una vez que se encuentra el elemento activo
            return false;
        }
    });

    // Iterar sobre los elementos del submenú
    $('#unifyMenu .submenu li a').each(function() {
        const $this = $(this);
        const $submenu = $this.closest('.submenu');
        const $parentMenuItem = $submenu.prev('.has-arrow');

        // Obtener la ruta del enlace del elemento del submenú
        const href = $this.attr('href');

        // Verificar si la ruta actual coincide con el enlace del elemento del submenú
        if (currentPath2 === href) {
            // Expandir el submenú y marcar como activo
            $this.addClass('current-page');
            $parentMenuItem.addClass('active selected').attr('aria-expanded', 'true');
            $submenu.slideDown('fast').attr('aria-expanded', 'true');

            // Marcar como activo el contenedor del menú principal
            $parentMenuItem.closest('li').addClass('active selected');

            // Salir del bucle each una vez que se encuentra el elemento activo
            return false;
        }
    });
}