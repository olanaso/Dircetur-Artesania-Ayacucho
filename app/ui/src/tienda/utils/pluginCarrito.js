export class ShoppingCart {
    constructor(products) {
        this.products = products;
        this.subtotal = 0;
        this.totalItems = 0;
        this.injectStyles(); // Inyectar estilos
        this.renderCart();
    }

    // Método para inyectar estilos CSS en el documento
    injectStyles () {
        const styles = `

        
                    .shopping-cart-sidebar {
                        position: fixed;
                        right: 0;
                        top: 0;
                        width: 350px;
                        height: 100%;
                        background-color: white;
                        box-shadow: -2px 0px 5px rgba(0,0,0,0.5);
                        z-index: 1050;
                        display: none;
                    }

                    .shopping-cart-item {
                        padding: 10px 0;
                        border-bottom: 1px solid #f1f1f1;
                    }

                    .shopping-cart-item-img {
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                        margin-right: 10px;
                    }

                    .shopping-cart-header {
                        padding: 15px;
                        border-bottom: 1px solid #f1f1f1;
                    }

                    .shopping-cart-body {
                        padding: 15px;
                        overflow-y: auto;
                        max-height: 70vh;
                    }

                    .shopping-cart-footer {
                        padding: 15px;
                        border-top: 1px solid #f1f1f1;
                        text-align: center;
                    }

                    .shopping-cart-button {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: white;
                        border: 1px solid #ddd;
                        padding: 10px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }

                    .shopping-cart-button img {
                        width: 24px;
                        margin-right: 10px;
                    }

                    .shopping-cart-remove-product {
                        cursor: pointer;
                        color: red;
                        font-size: 20px;
                    }
                `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // Método para renderizar el carrito
    renderCart () {
        const cartHtml = `
                    <div id="shopping-cart-sidebar" class="shopping-cart-sidebar">
                        <div class="shopping-cart-header">
                            <h4 class="d-inline-block">CARRITO DE COMPRAS</h4>
                            <button type="button" class="close float-right" aria-label="Cerrar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="shopping-cart-body">
                            <!-- Aquí se generarán los productos dinámicamente -->
                        </div>
                        <div class="shopping-cart-footer">
                            <h5>Subtotal: <span id="shopping-cart-subtotal">S/0</span></h5>
                           
                            <h6 class="secondary-button">
							<a href="carrito-de-compra.html" style="color:#fff" tabindex="-1">Ver carrito <i class="fa fa-shopping-cart"></i></a>
						</h6>
                           
                        </div>
                    </div>
                `;

        // Insertar el HTML en el contenedor especificado
        $('#shopping-cart-container').html(cartHtml);

        this.updateCart();
        this.attachEvents();
    }

    // Método para actualizar el carrito
    updateCart () {
        const cartBody = $('.shopping-cart-body');
        const cartSubtotal = $('#shopping-cart-subtotal');
        const cartTotalItems = $('#shopping-cart-total-items');
        const cartTotalPrice = $('#shopping-cart-total-price');

        cartBody.empty();
        this.subtotal = 0;
        this.totalItems = 0;

        const groupedByArtesano = this.products.reduce((acc, product) => {
            if (!acc[product.artesano]) {
                acc[product.artesano] = [];
            }
            acc[product.artesano].push(product);
            return acc;
        }, {});

        for (const artesano in groupedByArtesano) {
            const artesanoProducts = groupedByArtesano[artesano];
            cartBody.append(`<h5>Artesano: ${artesano}</h5>`);

            artesanoProducts.forEach(product => {
                const productHtml = `
                            <div class="shopping-cart-item d-flex justify-content-between align-items-center">
                                <div class="item-details d-flex align-items-center">
                                    <img src="${product.objeto.imagen_principal}" class="img-fluid shopping-cart-item-img" alt="${product.objeto.descripcion_es}">
                                    <div>
                                        <h6>${product.objeto.descripcion_es}</h6>
                                        <p class="text-muted">${product.cantidad} × S/${product.objeto.precio}</p>
                                    </div>
                                </div>
                                <span class="shopping-cart-remove-product text-danger" data-id="${product.id}">&times;</span>
                            </div>
                        `;
                cartBody.append(productHtml);

                this.subtotal += product.objeto.precio * product.cantidad;
                this.totalItems += product.cantidad;
            });
        }

        cartSubtotal.text('S/' + this.subtotal);
        cartTotalPrice.text('S/' + this.subtotal);
        cartTotalItems.text(this.totalItems + ' items');
    }

    // Método para mostrar el carrito
    showCart () {
        $('#shopping-cart-sidebar').show();
    }

    // Método para ocultar el carrito
    hideCart () {
        $('#shopping-cart-sidebar').hide();
    }

    // Método para eliminar un producto del carrito
    removeProduct (productId) {
        this.products = this.products.filter(product => product.id !== productId);
        this.updateCart();
    }

    // Método para adjuntar eventos
    attachEvents () {
        // Mostrar carrito
        $('.open-cart').on('click', () => this.showCart());

        // Cerrar carrito
        $('.close').on('click', () => this.hideCart());

        // Eliminar productos
        $(document).on('click', '.shopping-cart-remove-product', (e) => {
            const productId = $(e.target).data('id');
            this.removeProduct(productId);
        });
    }
}