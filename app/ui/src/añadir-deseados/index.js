let currentPage = 1;
const productsPerPage = 3;
const products = [
    { id: 1, name: 'Producto 1', price: 100, maker: 'Artesano 1', quantity: 1, image: 'img/car_item_2.jpg' },
    { id: 2, name: 'Producto 2', price: 200, maker: 'Artesano 2', quantity: 1, image: 'img/olla.jpg' },
    { id: 3, name: 'Producto 3', price: 300, maker: 'Artesano 3', quantity: 1, image: 'product-image3.jpg' },
    { id: 4, name: 'Producto 4', price: 400, maker: 'Artesano 4', quantity: 1, image: 'product-image4.jpg' },
    { id: 5, name: 'Producto 5', price: 500, maker: 'Artesano 5', quantity: 1, image: 'product-image5.jpg' },
    { id: 6, name: 'Producto 6', price: 600, maker: 'Artesano 6', quantity: 1, image: 'product-image6.jpg' },
    { id: 7, name: 'Producto 7', price: 700, maker: 'Artesano 7', quantity: 1, image: 'product-image7.jpg' }
];

function renderProducts() {
    const productContainer = document.querySelector('.product-list');
    productContainer.classList.add('fade-out');

    productContainer.innerHTML = '';
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fa fa-trash trash-icon"></i>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-maker">Hecho por: ${product.maker}</p>
                <div class="product-quantity">
                 <button class="btn-quantity" onclick="decreaseQuantity(${product.id})">-</button>
                 <span class="quantity-box" data-product-id="${product.id}">${product.quantity}</span>
                 <button class="btn-quantity" onclick="increaseQuantity(${product.id})">+</button>
                </div>
            </div>
            <div class="product-price">
                <p class="price-label">Precio:</p>
                <p class="price-value">S/${product.price}</p>
            </div>
            <div class="product-actions">
                <div class="custom-button-wrapper custom-button">
                    <div class="custom-text">Añadir al carrito</div>
                    <span class="custom-icon">
                        <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                        </svg>
                    </span>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    productContainer.classList.remove('fade-out');
    productContainer.classList.add('fade-in');
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbersContainer = document.querySelector('.page-numbers');
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.classList.add('page-number');
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            updatePaginationButtons();
        });
        pageNumbersContainer.appendChild(pageNumber);
    }

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageButtons = document.querySelectorAll('.page-number');

    pageButtons.forEach((button, index) => {
        button.classList.remove('active');
        if (index + 1 === currentPage) {
            button.classList.add('active');
        }
    });

    document.querySelector('.btn-prev').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.querySelector('.btn-next').style.display = currentPage < totalPages ? 'inline-block' : 'none';
}
document.querySelector('.btn-prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        updatePaginationButtons();
    }
});

document.querySelector('.btn-next').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        updatePaginationButtons();
    }
});


function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.quantity++;
        updateQuantity(product);
    }
}

function decreaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.quantity > 1) {
        product.quantity--;
        updateQuantity(product);
    }
}

function updateQuantity(product) {
    const quantitySpan = document.querySelector(`.quantity-box[data-product-id="${product.id}"]`);
    if (quantitySpan) {
        quantitySpan.textContent = product.quantity;
    }
}

renderProducts();
renderPagination();
updateQuantity();