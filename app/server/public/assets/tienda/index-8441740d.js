import"../modulepreload-polyfill-3cfb730f.js";import{l}from"../viewpartials-ac66bf27.js";import{b as i}from"../config-64035b4f.js";async function d(){try{const s={method:"GET",headers:new Headers,redirect:"follow"};return await(await fetch(i+"/portada/",s)).json()}catch(o){console.log("error",o)}}(async function(){let o=[{path:"../partials/tienda/header.html",container:"header"},{path:"../partials/tienda/footer.html",container:"footer"}];try{await l(o),console.log("Las vistas parciales se han cargado correctamente!"),n()}catch(s){console.error(s)}})();function n(){c()}async function c(){let o=await d();p(o.sliders),h(o.categorias),u(o.productosOferta),C(o.productosDestacados),f(o.productosRecientes)}function p(o){let s=`
    
    `;for(let t of o)s=s+`
        <div class="item">
			<div class="img-fill">
				<img src="${t.imagen.slice(1,-1)}" alt="">
				<div class="info">
					<div>
						<h5 style="text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 6px 6px 12px rgba(0,0,0,0.5);
">${t==null?void 0:t.descripcion}</h5>
						<h3>Buscar la perfecta  <em>Artesania</em>?</h3>
						<h6 class="secondary-button">
							<a href="busqueda.html" style="color:#fff">Buscar aquí <i class="fa fa-search"></i></a>
						</h6>
					</div>
				</div>
			</div>
		</div>
        `;$("#slidersList").append(s),$(".Modern-Slider").slick({autoplay:!0,autoplaySpeed:1e4,speed:900,slidesToShow:1,slidesToScroll:1,pauseOnHover:!1,dots:!0,pauseOnDotsHover:!0,cssEase:"linear",fade:!0,draggable:!1,prevArrow:'<button class="PrevArrow"></button>',nextArrow:'<button class="NextArrow"></button>'})}function h(o){let s="";for(let t of o)s=s+`
        <div class="item car-item">
            <div class="thumb-content">
            <a href="busqueda.html?id_categoria=${t==null?void 0:t.id}"><img style="widht:187px;height:141px" src="${(t==null?void 0:t.foto_referente)||"https://via.placeholder.com/187x141"}" alt=""></a>
            </div>
            <div class="down-content">
            <a href="busqueda.html?id_categoria=${t==null?void 0:t.id}">
            <h4>${t==null?void 0:t.denominacion}</h4>
            </a>
            <span>Categoría: ${t==null?void 0:t.abreviatura}</span>
            </div>
        </div>
        `;$("#owl-top-features").append(s),$("#owl-top-features").owlCarousel({pagination:!1,paginationNumbers:!1,autoplay:!0,loop:!0,margin:10,nav:!0,responsive:{0:{items:1},400:{items:2},600:{items:3},800:{items:4},1e3:{items:5}}})}function e(o){return o.toLocaleString("es-US",{minimumFractionDigits:2,maximumFractionDigits:2})}function u(o){var t,r;let s=" ";for(let a of o)s=s+`
       	<div class="col-md-4 col-sm-12">
							<div class="car-item wow fadeIn" data-wow-duration="0.75s">
								<div class="thumb-content">
									<div class="car-banner oferta">
                                   
										<a href="producto.html?id=${a.id}">
                                        
                                       -${((t=a==null?void 0:a.lst_ofertas[0])==null?void 0:t.porcentajeDescuento)||""}%
                                        </a>
									</div>
									<div class="thumb-inner photo-prod">
										<a href="producto.html?id=${a.id}"><img style="height:250px" src="${(a==null?void 0:a.imagen_principal)||"https://via.placeholder.com/400x200"}" alt=""></a>
									</div>
								</div>
								<div class="down-content">

									<div class="d-flex justify-content-between align-items-center mb-2">
										<span class="text-muted"></span>
										<span class="text-muted"><s>S/.  ${e(a==null?void 0:a.precio)||""}</s></span>
									</div>
									  <a href="producto.html?id=${a.id}" style="color:#000">
									
									<h5 title="${(a==null?void 0:a.nombres_es)||""}" class="card-title font-weight-bold product-description">${(a==null?void 0:a.nombres_es)||""}</h5>
</a>
									<p class="h4 text-danger font-weight-bold">S/.${e((r=a==null?void 0:a.lst_ofertas[0])==null?void 0:r.precioOfertado)||""} </p>
									<p class="card-text text-muted">Categoría: ${a==null?void 0:a.categoria}</p>
									<div class="d-flex align-items-center mt-3" title="Artesano">
									<a href="artesano.html?id=${a==null?void 0:a.artesano_id}">
                                    <img class="rounded-circle mr-2"
											src="${(a==null?void 0:a.foto1)||"https://via.placeholder.com/40"}"
											alt="Jose Mendoza" style="width: 40px; height: 40px;">
                                            </a>
										<span class="text-dark"> <a style: "color:#dedede!important" href="artesano.html?id=${a==null?void 0:a.artesano_id}"> ${(a==null?void 0:a.artesano)||""}</a></span>
	
                                        	<div class="line-dec2" style:"float:right"></div>
								
									</div>
									<div class="d-flex mt-4">

                                    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-light"><a class="" href="producto.html?id=${a.id}">Ver más</a></button>
  <button type="button" class="btn btn-light btn-comprar" producto_id="${a.id}"><svg
												width="15" height="15" viewBox="0 0 15 15" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
													fill="black" />
											</svg> Comprar</button>
  <button type="button" class="btn btn-light btn-favoritos" producto_id="${a.id}">	<svg width="15" height="14" viewBox="0 0 15 14" fill="none"
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


        `;$("#listaProductosOfertados").append(s)}function f(o){let s=" ";for(let t of o)s=s+`
       	<div class="col-md-4 col-sm-6">
							<div class="car-item wow fadeIn" data-wow-duration="0.75s">
								<div class="thumb-content">
									<div class="car-banner nuevo-producto">
										<a href="producto.html?id=${t.id}">Lo nuevo</a>
									</div>
									<div class="thumb-inner photo-prod">
										<a href="producto.html?id=${t.id}"><img style="height:250px" src="${(t==null?void 0:t.imagen_principal)||"https://via.placeholder.com/400x200"}" alt=""></a>
									</div>
								</div>
								<div class="down-content">
  <a href="producto.html?id=${t.id}" style="color:#000">
									
									<h5 title="${(t==null?void 0:t.nombres_es)||""}" class="card-title font-weight-bold product-description">${(t==null?void 0:t.nombres_es)||""}</h5>
</a>
									<p class="h4 text-danger font-weight-bold">S/.${e(t==null?void 0:t.precio)||""} </p>
									<p class="card-text text-muted">Categoría: ${t==null?void 0:t.categoria}</p>
									<div class="d-flex align-items-center mt-3" title="Artesano">
										<img class="rounded-circle mr-2"
											src="${(t==null?void 0:t.foto1)||"https://via.placeholder.com/40"}"
											alt="Jose Mendoza" style="width: 40px; height: 40px;">
										<span class="text-dark">
                                        <a style: "color:#dedede!important" href="artesano.html?id=${t==null?void 0:t.artesano_id}"> ${(t==null?void 0:t.artesano)||""}</a>
                                       
                                         
                                         </span>
                                        	<div class="line-dec2"></div>
								
									</div>
										<div class="d-flex mt-4">

                                    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-light"><a class="" href="producto.html?id=${t.id}">Ver más</a></button>
  <button type="button" class="btn btn-light btn-comprar" producto_id="${t.id}"><svg
												width="15" height="15" viewBox="0 0 15 15" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
													fill="black" />
											</svg> Comprar</button>
  <button type="button" class="btn btn-light btn-favoritos" producto_id="${t.id}">	<svg width="15" height="14" viewBox="0 0 15 14" fill="none"
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


        `;$("#listaProductosNovedades").append(s)}function C(o){let s=" ";for(let t of o)s=s+`
       <div class="item wow fadeIn card " data-wow-duration="0.75s">
						<div class="img-contenedor-destacados">
                          <a href="producto?id=${t.id}" style="color:#000">
							<img class="img-destacados"
								src="${(t==null?void 0:t.imagen_principal)||"https://via.placeholder.com/400x200"}" />
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
                            <a href="producto.html?id=${t.id}" style="color:#000">
							<h5 title="${(t==null?void 0:t.nombres_es)||""}" class="card-title font-weight-bold product-description">${t.nombres_es||"-"}</h5>
                            </a>
							<p class="h4 text-danger font-weight-bold">S/.${e(t==null?void 0:t.precio)||""}</p>
							<p class="card-text text-muted">Categoría: ${t==null?void 0:t.categoria}</p>


							<div class="author-rate">
								<img src="${(t==null?void 0:t.foto1)||"https://via.placeholder.com/40"}" alt="">
								<h4><a style: "color:#dedede!important" href="artesano.html?id=${t==null?void 0:t.artesano_id}"> ${(t==null?void 0:t.artesano)||""}</a></h4>
								<div class="line-dec2"></div>
								<span class="btn  btn-light">Artesano</span>
							</div>
						</div>
					</div>


        `;$("#owl-testimonials").append(s),$("#owl-testimonials").owlCarousel({pagination:!0,paginationNumbers:!1,autoplay:!0,loop:!0,margin:10,nav:!0,responsive:{0:{items:1},600:{items:2},1e3:{items:3}}})}
