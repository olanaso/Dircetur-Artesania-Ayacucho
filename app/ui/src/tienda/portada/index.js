

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortada } from './api';
import { custom } from '../utils/common.js';

import { ShoppingCart } from "../utils/pluginCarrito.js";

// Toggle para abrir/cerrar el menú en dispositivos móviles


(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);
        custom()
        // import('../utils/common');

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    }
})();


function startApp () {
    cargarDataPortada()
    //  cargarCarrito()
}


function cargarCarrito () {
    const dataGuardada = localStorage.getItem('artesanias');
    let products = dataGuardada ? JSON.parse(dataGuardada) : [];


    const shoppingCart = new ShoppingCart(products);
}



async function cargarDataPortada () {

    let resultado = await getPortada()
    loadSlider(resultado.sliders)
    loadCategorias(resultado.categorias)
    loadProductosOferta(resultado.productosOferta)
    loadProductosDestacados(resultado.productosDestacados)
    loadProductosRecientes(resultado.productosRecientes)
}



function loadSlider (data) {

    let html = `
    
    `
    for (let item of data) {
        //alert(item.imagen)
        html = html + `
        <div class="item">
			<div class="img-fill">
				<img src="${item.imagen.slice(1, -1)}" alt="">
				<div class="info">
					<div>
						<h5 style="text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 6px 6px 12px rgba(0,0,0,0.5);
">${item?.descripcion}</h5>
						<h3>Buscar la perfecta  <em>Artesania</em>?</h3>
						<h6 class="secondary-button">
							<a href="busqueda.html" style="color:#fff">Buscar aquí <i class="fa fa-search"></i></a>
						</h6>
					</div>
				</div>
			</div>
		</div>
        `
    }
    $('#slidersList').append(html)


    $(".Modern-Slider").slick({
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        fade: true,
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>',
    });
}


function loadCategorias (data) {
    console.log(data)

    let html = ``
    for (let item of data) {
        html = html + `
        <div class="item car-item">
            <div class="thumb-content">
            <a href="busqueda.html?id_categoria=${item?.id}"><img style="widht:187px;height:141px" src="${item?.foto_referente || "https://via.placeholder.com/187x141"}" alt=""></a>
            </div>
            <div class="down-content">
            <a href="busqueda.html?id_categoria=${item?.id}">
            <h4>${item?.denominacion}</h4>
            </a>
            <span>Categoría: ${item?.abreviatura}</span>
            </div>
        </div>
        `
    }
    $('#owl-top-features').append(html)
    //Convertir el carusssel
    $('#owl-top-features').owlCarousel({
        pagination: false,
        paginationNumbers: false,
        autoplay: true,
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            600: {
                items: 3
            },
            800: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
}
function formatearNumero (numero) {
    return numero.toLocaleString('es-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function getClassByDescriptionLength (description) {
    return description.length > 120 ? "long-description" : "";
}

function loadProductosOferta (data) {

    let html = ` `
    for (let item of data) {
        //alert(item.imagen)

        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.artesano,
            datos: {
                imagen_principal: item.imagen_principal,
                precio: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio)
            },
        }

        let artenia_deseados = {
            id: item.id + '-' + item.artesano_id,
            artesania: {
                id: item.id,
                nombre_es: item.nombres_es,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen_principal,
                url_carrito: encodeURIComponent(JSON.stringify(artenia_anviar_carrito))
            },
            artesano: {
                id: item.artesano_id,
                nombres: item.artesano,
                foto1: item.foto1,
            }
        }
        html = html + `
       	<div class="col-md-4 col-sm-12">
							<div class="car-item wow fadeIn" data-wow-duration="0.75s">
								<div class="thumb-content">
									<div class="car-banner oferta">
                                   
										<a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                                        
                                       -${item?.lst_ofertas[0]?.porcentajeDescuento || ""}%
                                        </a>
									</div>
									<div class="thumb-inner photo-prod">
										<a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}"><img style="height:250px" src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt=""></a>
									</div>
								</div>
								<div class="down-content">

									<div class="d-flex justify-content-between align-items-center mb-2">
										<span class="text-muted"></span>
										<span class="text-muted"><s>S/.  ${formatearNumero(item?.precio) || ""}</s></span>
									</div>
									  <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
									
									<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item?.nombres_es || ""}</h5>
</a>
									<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.lst_ofertas[0]?.precioOfertado) || ""} </p>
									<p class="card-text text-muted">Categoría: ${item?.categoria}</p>
									<div class="d-flex align-items-center mt-3" title="Artesano">
									<a href="artesano.html?id=${item?.artesano_id}">
                                    <img class="rounded-circle mr-2"
											src="${item?.foto1 || "https://via.placeholder.com/40"}"
											alt="Jose Mendoza" style="width: 40px; height: 40px;">
                                            </a>
										<span class="text-dark"> <a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a></span>
	
                                        	<div class="line-dec2" style:"float:right"></div>
								
									</div>
									<div class="d-flex mt-4">

                                    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-light"><a class="" href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">Ver más</a></button>
  <button type="button" class="btn btn-light btn-comprar" producto_id="${item.id}">
  <svg
												width="15" height="15" viewBox="0 0 15 15" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
													fill="black" />
											</svg> <a class="" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">Comprar</a> </button>
  <button type="button" class="btn btn-light btn-favoritos" producto_id="${item.id}">	<svg width="15" height="14" viewBox="0 0 15 14" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M7.5 13.7625L6.4125 12.7725C2.55 9.27 0 6.9525 0 4.125C0 1.8075 1.815 0 4.125 0C5.43 0 6.6825 0.6075 7.5 1.56C8.3175 0.6075 9.57 0 10.875 0C13.185 0 15 1.8075 15 4.125C15 6.9525 12.45 9.27 8.5875 12.7725L7.5 13.7625Z"
													fill="red" />
											</svg> Favorito</button>
</div>
										
                                       

									
									
									</div>

								</div>
							</div>
						</div>


        `
    }
    $('#listaProductosOfertados').append(html)


}




function loadProductosRecientes (data) {

    let html = ` `
    for (let item of data) {
        //alert(item.imagen)

        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.artesano,
            datos: {
                imagen_principal: item.imagen_principal,
                precio: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio)
            },
        }

        let artenia_deseados = {
            id: item.id + '-' + item.artesano_id,
            artesania: {
                id: item.id,
                nombre_es: item.nombres_es,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen_principal,
                url_carrito: encodeURIComponent(JSON.stringify(artenia_anviar_carrito))
            },
            artesano: {
                id: item.artesano_id,
                nombres: item.artesano,
                foto1: item.foto1,
            }
        }

        html = html + `
       	<div class="col-md-4 col-sm-6">
							<div class="car-item wow fadeIn" data-wow-duration="0.75s">
								<div class="thumb-content">
									<div class="car-banner nuevo-producto">
										<a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">Lo nuevo</a>
									</div>
									<div class="thumb-inner photo-prod">
										<a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}"><img style="height:250px" src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt=""></a>
									</div>
								</div>
								<div class="down-content">
  <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
									
									<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item?.nombres_es || ""}</h5>
</a>

									<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.precio) || ""} </p>
									<p class="card-text text-muted">Categoría: ${item?.categoria}</p>
									<div class="d-flex align-items-center mt-3" title="Artesano">
										<img class="rounded-circle mr-2"
											src="${item?.foto1 || "https://via.placeholder.com/40"}"
											alt="Jose Mendoza" style="width: 40px; height: 40px;">
										<span class="text-dark">
                                        <a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a>
                                       
                                         
                                         </span>
                                        	<div class="line-dec2"></div>
								
									</div>
										<div class="d-flex mt-4">

                                    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-light"><a class="" href="producto.html?id=${item.id}">Ver más</a></button>
  <button type="button" class="btn btn-light btn-comprar" producto_id="${item.id}">
   <a class="" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">                                              
  <svg
												width="15" height="15" viewBox="0 0 15 15" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
													fill="black" />
											</svg> Comprar</a></button>
  <button type="button" class="btn btn-light btn-favoritos" producto_id="${item.id}">	
   <a class="" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M7.5 13.7625L6.4125 12.7725C2.55 9.27 0 6.9525 0 4.125C0 1.8075 1.815 0 4.125 0C5.43 0 6.6825 0.6075 7.5 1.56C8.3175 0.6075 9.57 0 10.875 0C13.185 0 15 1.8075 15 4.125C15 6.9525 12.45 9.27 8.5875 12.7725L7.5 13.7625Z"
													fill="red" />
											</svg>
                                           Favorito  </a></button>
</div>
										
                                       

									
									
									</div>

								</div>
							</div>
						</div>


        `
    }
    $('#listaProductosNovedades').append(html)


}


function loadProductosDestacados (data) {

    let html = ` `
    for (let item of data) {

        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.artesano,
            datos: {
                imagen_principal: item.imagen_principal,
                precio: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio)
            },
        }

        let artenia_deseados = {
            id: item.id + '-' + item.artesano_id,
            artesania: {
                id: item.id,
                nombre_es: item.nombres_es,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen_principal,
                url_carrito: encodeURIComponent(JSON.stringify(artenia_anviar_carrito))
            },
            artesano: {
                id: item.artesano_id,
                nombres: item.artesano,
                foto1: item.foto1,
            }
        }


        //alert(item.imagen)
        html = html + `
       <div class="item wow fadeIn card " data-wow-duration="0.75s">
						<div class="img-contenedor-destacados">
                          <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<img class="img-destacados"
								src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" />
                                   </a>
						</div>
						<ul class="star-rating">
							<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>
						</ul>
						<div class="line-dec"></div>

						<div class="card-body">
							<!-- <div class="d-flex justify-content-between align-items-center mb-2">
								<span class="badge badge-danger" style="color: #fff;">-15%</span>
								<span class="text-muted"><s>S/. 1770.00</s></span>
							</div> -->
                            <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item.nombres_es || "-"}</h5>
                            </a>
							<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.precio) || ""}</p>
							<p class="card-text text-muted">Categoría: ${item?.categoria}</p>


							<div class="author-rate">
								<img src="${item?.foto1 || "https://via.placeholder.com/40"}" alt="">
								<h4><a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a></h4>
								<div class="line-dec2"></div>
								
                                <a href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}" title="Ir a carrito de compras">Comprar <i class="fa fa-shopping-cart"></i></a>
							</div>
						</div>
					</div>


        `
    }
    $('#owl-testimonials').append(html)


    $('#owl-testimonials').owlCarousel({
        pagination: true,
        paginationNumbers: false,
        autoplay: true,
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
}


