import { googleTranslateElementInit } from "./translate";
import { baseUrl, getDataFromLocalStorage } from '../../utils/config';

export function custom () {



    $('.preloader').fadeOut();
    $('.animated-row').each(function () {
        var $this = $(this);
        $this.find('.animate').each(function (i) {
            var $item = $(this);
            var animation = $item.data('animate');
            $item.on('inview', function (event, isInView) {
                if (isInView) {
                    setTimeout(function () {
                        $item.addClass('animated ' + animation).removeClass('animate');
                    }, i * 50);
                } else if (!screencheck(767)) {
                    $item.removeClass('animated ' + animation).addClass('animate');
                }
            });
        });
    });




    $('a[href="#search"]').on('click', function (event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });

    $('#search, #search button.close').on('click keyup', function (event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });


    //Do not include! This prevents the form from submitting for DEMO purposes only!
    $('form').submit(function (event) {
        event.preventDefault();
        return false;
    })


    // Header Type = Fixed
    $(window).on("scroll", function () {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 300) {
            $('.site-header').addClass('scrolled-header animated fadeInDown');
        } else {
            $('.site-header').removeClass('scrolled-header animated fadeInDown');
        }
    });


    menu()
    badgesdata()
    checkSession()
    generarTypeHead_ante();

    setTimeout(function (e) {
        googleTranslateElementInit();
    }, 2000)

}


export function badgesdata () {
    let artesanias = getDataFromLocalStorage('artesanias') || []
    $('#badge_cant_prod_carrito').text(artesanias.length)

    let artesaniasdeseadas = getDataFromLocalStorage('artesaniasdeseadas') || []
    $('#badge_cant_prod_deseado').text(artesaniasdeseadas.length)

}

export function checkSession () {
    const avatarContainer = document.getElementById('avatarContainer');
    const session = getDataFromLocalStorage('idCliente');

    if (session) {
        fetch(`${baseUrl}/cliente/${session}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    localStorage.setItem('cliente', JSON.stringify(data));

                    const avatarImage = new Image();
                    avatarImage.src = data.foto_perfil;

                    data.nombres = data.nombres || 'Usuario';
                    data.apellidos = data.apellidos || 'Anónimo';

                    const initial = data.nombres.charAt(0).toUpperCase() + data.apellidos.charAt(0).toUpperCase();

                    const logoutButton = document.createElement('button');
                    logoutButton.id = 'logoutButton';
                    logoutButton.className = 'btn-logout';
                    logoutButton.style.display = 'none';
                    logoutButton.textContent = 'Cerrar sesión';

                    avatarImage.onerror = function () {
                        avatarContainer.innerHTML = `
                            <div class="avatar">
                                <div class='avatar-initial' title="Bienvenido: ${data.nombres + ' ' + data.apellidos}">${initial}</div>
                            </div>
                        `;
                        avatarContainer.appendChild(logoutButton);
                    };

                    avatarImage.onload = function () {
                        avatarContainer.innerHTML = `
                            <div class="avatar"  title="Bienvenido: ${data.nombres + ' ' + data.apellidos}">
                                <img src="${data.foto_perfil}" alt="Profile Picture" class="avatar-image">
                            </div>
                        `;
                        avatarContainer.appendChild(logoutButton);
                    };

                    showHideLogoutButton(avatarContainer, logoutButton);
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
}

export function showHideLogoutButton (avatarContainer, logoutButton) {
    avatarContainer.addEventListener('mouseover', () => {
        logoutButton.style.display = 'block';
    });

    avatarContainer.addEventListener('mouseout', () => {
        logoutButton.style.display = 'none';
    });

    logoutButton.addEventListener('mouseover', () => {
        logoutButton.style.display = 'block';
    });

    logoutButton.addEventListener('mouseout', () => {
        logoutButton.style.display = 'none';
    });

    logoutButton.addEventListener('click', () => {
        logout();
    });
}


function logout () {
    localStorage.removeItem('idCliente');
    localStorage.removeItem('cliente');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '/tienda/index.html';
}

export function menu () {
    // Menu Function for DropDown

    $.fn.menumaker = function (options) {
        var cssmenu = $(this),
            settings = $.extend(
                {
                    title: "Menu",
                    format: "dropdown",
                    sticky: false
                },
                options
            );

        return this.each(function () {
            cssmenu.prepend('<div id="menu-button">' + settings.title + "</div>");
            $(this)
                .find("#menu-button")
                .on("click", function () {

                    $(this).toggleClass("menu-opened");
                    var mainmenu = $(this).next("ul");
                    if (mainmenu.hasClass("open")) {
                        mainmenu.hide().removeClass("open");
                    } else {
                        mainmenu.show().addClass("open");
                        if (settings.format === "dropdown") {
                            mainmenu.find("ul").show();
                        }
                    }
                });

            cssmenu
                .find("li ul")
                .parent()
                .addClass("has-sub");

            var multiTg = function () {
                cssmenu
                    .find(".has-sub")
                    .prepend('<span class="submenu-button"></span>');
                cssmenu.find(".submenu-button").on("click", function () {
                    $(this).toggleClass("submenu-opened");
                    if (
                        $(this)
                            .siblings("ul")
                            .hasClass("open")
                    ) {
                        $(this)
                            .siblings("ul")
                            .removeClass("open")
                            .hide();
                    } else {
                        $(this)
                            .siblings("ul")
                            .addClass("open")
                            .show();
                    }
                });
            };

            if (settings.format === "multitoggle") multiTg();
            else cssmenu.addClass("dropdown");

            if (settings.sticky === true) cssmenu.css("position", "fixed");

            var resizeFix = function () {
                if ($(window).width() > 768) {
                    cssmenu.find("ul").show();
                }

                if ($(window).width() <= 768) {
                    cssmenu
                        .find("ul")
                        .hide()
                        .removeClass("open");
                }
            };
            resizeFix();
            return $(window).on("resize", resizeFix);
        });
    };



    $("#cssmenu").menumaker({
        title: "Menu",
        format: "multitoggle"
    });

}


export function menuselec () {
    const currentPath = window.location.pathname.split("/").pop(); // Obtener el nombre del archivo actual
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        // Comparar href con la ruta actual y agregar la clase 'active' si coinciden
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
}



export async function generarTypeHead_ante () {
    try {
        // Obtener el tipo de libro por defecto
        // let textobusqueda = ;

        document.getElementById('searchInput').style.width = '300px';
        // Configurar Bloodhound para la búsqueda
        var books = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('titulo'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: `${baseUrl}/buscar-producto?limit=9&nombre_producto=%QUERY`, // URL del API que busca los libros
                wildcard: '%QUERY',
                transform: function (response) {
                    // Adaptar la respuesta del servidor al formato que necesita Bloodhound
                    return response.datos.map(book => ({
                        id: book.id,
                        title: book.nombres_es.trim(), // Asegurarse de eliminar espacios en blanco
                        autores: book.artesano,
                        cover_image: book.imagen_principal,
                        categoria: book.categoria
                    }));
                }
            }
        });
        // Inicializar el typeahead
        $('#searchInput').typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 4
            },
            {
                name: 'autores',
                display: 'title',
                source: books,
                templates: {
                    suggestion: function (data) {
                        return `
                            <div class="tt-suggestion d-flex align-items-center">
                                <img src="${data.cover_image}" alt="${data.title}" style="max-width: 40px; margin-right: 10px;">
                                <div>
                                    <div class="book-title">${data.title}</div>
                                    <small class="text-muted">${data.autores}</small>
                                     <p class="text-muted">${data.categoria}</p>
                                </div>
                            </div>
                        `;
                    }
                }
            }
        );
        // Evento para capturar la selección del usuario
        $('#searchInput').bind('typeahead:select', function (ev, suggestion) {
            console.log('Libro seleccionado:', suggestion);
            window.location.href = "busqueda.html?nombre_producto=" + suggestion.title
            //location.href = 
        });
    } catch (error) {
        console.error('Error generando el typeahead:', error);
    }
}


export function formatearNumero (numero) {
    return numero.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}