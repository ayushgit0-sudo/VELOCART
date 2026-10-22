// ==========================================
// VELOCART - E-COMMERCE APPLICATION
// ==========================================


// ==========================================
// PRODUCT DATABASE
// ==========================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        icon: "🎧",
        description: "Premium wireless audio with deep bass."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        icon: "⌚",
        description: "Track your fitness and daily activity."
    },

    {
        id: 3,
        name: "Gaming Mouse",
        category: "electronics",
        price: 1499,
        icon: "🖱️",
        description: "High precision mouse for gaming."
    },

    {
        id: 4,
        name: "Mechanical Keyboard",
        category: "electronics",
        price: 3299,
        icon: "⌨️",
        description: "Fast and responsive mechanical keys."
    },

    {
        id: 5,
        name: "Classic Sneakers",
        category: "fashion",
        price: 2999,
        icon: "👟",
        description: "Comfortable sneakers for everyday use."
    },

    {
        id: 6,
        name: "Oversized Hoodie",
        category: "fashion",
        price: 1799,
        icon: "👕",
        description: "Premium oversized casual hoodie."
    },

    {
        id: 7,
        name: "Urban Jacket",
        category: "fashion",
        price: 3499,
        icon: "🧥",
        description: "Modern jacket designed for everyday style."
    },

    {
        id: 8,
        name: "Classic Backpack",
        category: "accessories",
        price: 1299,
        icon: "🎒",
        description: "Durable backpack for work and travel."
    },

    {
        id: 9,
        name: "Premium Sunglasses",
        category: "accessories",
        price: 999,
        icon: "🕶️",
        description: "Minimal sunglasses with a premium look."
    },

    {
        id: 10,
        name: "Leather Wallet",
        category: "accessories",
        price: 799,
        icon: "👝",
        description: "Compact wallet with a clean design."
    },

    {
        id: 11,
        name: "Fitness Band",
        category: "electronics",
        price: 1999,
        icon: "⌁",
        description: "Monitor activity, steps and workouts."
    },

    {
        id: 12,
        name: "Running Shoes",
        category: "fashion",
        price: 2499,
        icon: "🏃",
        description: "Lightweight shoes built for running."
    }

];


// ==========================================
// CART
// ==========================================

let cart =
    JSON.parse(localStorage.getItem("veloCart")) || [];


// ==========================================
// ELEMENTS
// ==========================================

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const filters =
    document.querySelectorAll(".filter");

const cartBtn =
    document.getElementById("cartBtn");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const notification =
    document.getElementById("notification");


// Current category

let currentCategory = "all";


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {

    productGrid.innerHTML = "";


    if (productList.length === 0) {

        productGrid.innerHTML = `

            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px;
                color: #777;
            ">

                <h3>No products found</h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;
    }


    productList.forEach(product => {

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                ${product.icon}

            </div>


            <div class="product-info">

                <span class="product-category">

                    ${product.category}

                </span>


                <h3 class="product-name">

                    ${product.name}

                </h3>


                <p class="product-description">

                    ${product.description}

                </p>


                <div class="product-bottom">

                    <strong class="product-price">

                        ₹${product.price.toLocaleString("en-IN")}

                    </strong>


                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})">

                        Add to Cart

                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


// ==========================================
// FILTER + SEARCH + SORT
// ==========================================

function updateProducts() {

    let filteredProducts =
        [...products];


    // CATEGORY

    if (currentCategory !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category ===
                    currentCategory
            );

    }


    // SEARCH

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (search !== "") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(search)
                    ||
                    product.category
                        .toLowerCase()
                        .includes(search)
            );

    }


    // SORT

    const sort =
        sortSelect.value;


    if (sort === "low") {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    displayProducts(
        filteredProducts
    );

}


// ==========================================
// CATEGORY FILTERS
// ==========================================

filters.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            this.classList.add(
                "active"
            );


            currentCategory =
                this.dataset.category;


            updateProducts();

        }
    );

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    updateProducts
);


// ==========================================
// SORT
// ==========================================

sortSelect.addEventListener(
    "change",
    updateProducts
);


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            icon: product.icon,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showNotification(
        `${product.name} added to cart`
    );

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "veloCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }


    cart.forEach(item => {

        const cartElement =
            document.createElement("div");


        cartElement.className =
            "cart-item";


        cartElement.innerHTML = `

            <div class="cart-item-icon">

                ${item.icon}

            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>


                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)">

                        +

                    </button>

                </div>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>

        `;


        cartItems.appendChild(
            cartElement
        );

    });


    updateCartSummary();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCart();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    updateCart();

}


// ==========================================
// CART SUMMARY
// ==========================================

function updateCartSummary() {

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;

}


// ==========================================
// OPEN CART
// ==========================================

cartBtn.addEventListener(
    "click",
    () => {

        cartOverlay.classList.add(
            "show"
        );

    }
);


// ==========================================
// CLOSE CART
// ==========================================

closeCart.addEventListener(
    "click",
    () => {

        cartOverlay.classList.remove(
            "show"
        );

    }
);


// ==========================================
// CLICK OUTSIDE CART
// ==========================================

cartOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            cartOverlay
        ) {

            cartOverlay.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// CHECKOUT
// ==========================================

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showNotification(
                "Your cart is empty"
            );

            return;

        }


        showNotification(
            "Checkout system coming soon"
        );

    }
);


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {

    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2500);

}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

displayProducts(products);

updateCart();