

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortada, postIndicadores } from './api';
import { custom, menuselec } from '../utils/common.js';

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
    menuselec()

    // import('../utils/common');

    console.log('Las vistas parciales se han cargado correctamente!');

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp () {
  cargarDataPortada()
  cargarCarrito()
  buscarArtesania()
  enviarIndicadores()
}

const enviarIndicadores = async () => {
  const cliente = JSON.parse(localStorage.getItem('cliente') || '{}');

  let nombreCompleto = null;

  if (cliente?.nombres && cliente?.apellidos) {
    nombreCompleto = cliente?.nombres + ' ' + cliente?.apellidos;
  } else if (cliente?.nombres) {
    nombreCompleto = cliente?.nombres;
  } else if (cliente?.apellidos) {
    nombreCompleto = cliente?.apellidos;
  }

  const data = {
    cliente: nombreCompleto,
    clienteid: cliente?.id || null,
    fecha_cliente: new Date().toISOString(),
    url: window.location.href,
  }

  await postIndicadores(data);
}

function buscarArtesania () {
  function realizarBusqueda () {
    let valor = $('#txt-busqueda').val();
    location.href = "busqueda.html?nombre_producto=" + valor;
  }

  // Ejecutar búsqueda al hacer clic en el botón
  $('#btn-buscar').on('click', function (e) {
    realizarBusqueda();
  });

  // Ejecutar búsqueda al presionar Enter o Tab en el campo de texto
  $('#txt-busqueda').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault(); // Evitar la acción predeterminada para evitar un cambio de campo en el caso de Tab
      realizarBusqueda();
    }
  });
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
  loadProductosRecientes(resultado.productosRecientes)
  loadProductosDestacados(resultado.productosDestacados)
  loadArtesanosDestacados(resultado.artesanos)

  loadProductosOferta(resultado.productosOferta)
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

  let html = ``
  for (let item of data) {
    html = html + `
        <div class="item car-item">
            <div class="thumb-content">
            <a href="busqueda.html?id_categoria=${item?.id}"><img style="widht:187px;height:141px;object-fit:cover;" src="${item?.foto_referente || "https://via.placeholder.com/187x141"}" alt=""></a>
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
  // Convierte el valor a un número si es una cadena
  let numeroConvertido = parseFloat(numero);

  // Verifica que la conversión fue exitosa
  if (isNaN(numeroConvertido)) {
    return numero;
  }

  return numeroConvertido.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getClassByDescriptionLength (description) {
  return description.length > 120 ? "long-description" : "";
}

function loadProductosOferta (data) {

  let html = ` `
  let activo = data.length == 0
  activo ? $('#section-artesanias-oferta').css('display', 'none') : null;
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
    console.log("ofertas", item)
    html = html + `
     
<div class="card">
    <div class="card-image">
      <span class="new-label" style="background:yellow;color:#000">DESCUENTO: ${item?.lst_ofertas[0]?.porcentajeDescuento || ""}% </span>
      <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
      <img onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/400X200.png?text=En proceso de carga';" style="height:300px; width:100%; object-fit: cover;  transform: scale(0.8);  transform-origin: center;  " src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt="Producto Artesanal" />
      </a>
    </div>
    <div class="card-content">
     <a  href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}"> <h2 class="product-title">${item?.nombres_es || ""}</h2></a>
      <span class="text-muted">
                    <s> ${formatearNumero(item?.precio) || ""} PEN</s>
                </span> 
     <p class="product-price">${formatearNumero(item?.lst_ofertas[0]?.precioOfertado) || ""} PEN </p>
      <p class="product-category">${item?.categoria}</p>
    </div>
    <div class="card-footer">
      <div class="artisan-info">
        <img
          src="${item?.foto1 || "https://via.placeholder.com/50"}"
          alt="Foto del artesano"
          class="artisan-photo"
        />
        <div>
       <a href="artesano.html?id=${item?.artesano_id}">  
          <p class="artisan-name">${item?.artesano || ""}</p></a>
          <p class="artisan-role">Artesano</p>
        </div>
    </div>
      <div class="card-actions">
        <a class="btn-buttons favorite" title="Añadir a favoritos" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
          <i class="fas fa-heart"></i>
        </a>
        <a class="btn-buttons cart" title="Añadir al carrito" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">
          <i class="fas fa-shopping-cart"></i>
        </a>
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
  <div class="card">
    <div class="card-image">
      <span class="new-label" style="background:#A9E8F5;color:#000">Nuevo</span>
      <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
      <img style="height:300px; width:100%; object-fit: cover;  transform: scale(0.8);  transform-origin: center;  " src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt="Producto Artesanal" />
      </a>
    </div>
    <div class="card-content">
     <a  href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}"> <h2 class="product-title">${item?.nombres_es || ""}</h2></a>
      <p class="product-price">${formatearNumero(item?.precio) || ""} PEN</p>
      <p class="product-category">${item?.categoria}</p>
    </div>
    <div class="card-footer">
      <div class="artisan-info">
        <img
          src="${item?.foto1 || "https://via.placeholder.com/50"}"
          alt="Foto del artesano"
          class="artisan-photo"
        />
        <div>
       <a href="artesano.html?id=${item?.artesano_id}">  
          <p class="artisan-name">${item?.artesano || ""}</p></a>
          <p class="artisan-role">Artesano</p>
        </div>
      </div>
      <div class="card-actions">
        <a class="btn-buttons favorite" title="Añadir a favoritos" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
          <i class="fas fa-heart"></i>
        </a>
        <a class="btn-buttons cart" title="Añadir al carrito" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">
          <i class="fas fa-shopping-cart"></i>
        </a>
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

         <div class="card">
    <div class="card-image">
      <span class="new-label" style="background:orange;">Destacado</span>
      <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
      <img style="height:300px; width:100%; object-fit: cover;  transform: scale(0.8);  transform-origin: center;  " src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt="Producto Artesanal" />
      </a>
    </div>
    <div class="card-content"
    style="margin-left:15px; margin-buttom:15px; padding:0px"
    >
     <a  href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}"> <h2 class="product-title">${item?.nombres_es || ""}</h2></a>
      <p class="product-price">${formatearNumero(item?.precio) || ""} PEN</p>
      <p class="product-category">${item?.categoria}</p>
    </div>
    
      <div class="artisan-info" >
        <img
          src="${item?.foto1 || "https://via.placeholder.com/50"}"
          alt="Foto del artesano"
          class="artisan-photo"
          style="height:50px; width:50px; border-radius:0px; margin-left:15px"
        />
        <div>
       <a href="artesano.html?id=${item?.artesano_id}" style="margin-left:15px; margin-buttom:15px">  
          <p class="artisan-name">${item?.artesano || ""}</p></a>
          <p class="artisan-role">Artesano</p>
        </div>
      </div>
      <div class="card-actions" style="margin-left:15px; margin-bottom: 10px;">
        <a class="btn favorite" title="Añadir a favoritos" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
          <i class="fas fa-heart"></i>
        </a>
        <a class="btn cart" title="Añadir al carrito" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">
          <i class="fas fa-shopping-cart"></i>
        </a>
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



function loadArtesanosDestacados (data) {

  let html = ` `
  for (let item of data) {




    //alert(item.imagen)
    html = html + `
 
         <div class="card"  style="height:380px;">
    <div class="card-image">
      <span class="new-label" style="background:#22a7f2;">destacado</span>
      <a href="artesano.html?id=${item.id}">
      <img style="height:300px; width:100%; object-fit: cover;  transform: scale(1);  transform-origin: center;  " 
      src="${item?.foto1 || "https://via.placeholder.com/400x200"}" alt="Artesano" />
      </a>
    </div>
    <div class="card-content"
    style="margin-left:15px; margin-buttom:15px; padding:0px"
    >
     <a  href="artesano.html?id=${item.id}"> <h2 class="product-title">${item?.nombres} ${item?.apellidos}</h2></a>
     
      <p class="product-category">${item?.categoria_artesano}</p>
    </div>
    
     
      
        </div>
      </div>
    
   
  </div>


      


        `
  }
  $('#owl-testimonials_artesanos').append(html)


  $('#owl-testimonials_artesanos').owlCarousel({
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
      },
      1600: {
        items: 4
      }
    }
  })
}

