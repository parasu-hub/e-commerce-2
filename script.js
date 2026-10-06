// ===============================
// PRODUCTS
// ===============================

const products = [
    {
        id: 1,
        name: "Pro Max Smartphone 5G",
        price: 24999,
        oldPrice: 32999,
        discount: "24% OFF",
        rating: "4.5",
        details: "8GB RAM | 128GB Storage",
        icon: "📱",
        category: "Mobiles"
    },

    {
        id: 2,
        name: "UltraBook Pro Laptop",
        price: 49990,
        oldPrice: 65999,
        discount: "24% OFF",
        rating: "4.6",
        details: "Intel i5 | 16GB RAM | 512GB SSD",
        icon: "💻",
        category: "Laptops"
    },

    {
        id: 3,
        name: "Wireless Noise Cancelling Headphones",
        price: 1499,
        oldPrice: 2999,
        discount: "50% OFF",
        rating: "4.3",
        details: "Bluetooth | 40 Hours Battery",
        icon: "🎧",
        category: "Audio"
    },

    {
        id: 4,
        name: "Smart Watch AMOLED",
        price: 1999,
        oldPrice: 3999,
        discount: "50% OFF",
        rating: "4.4",
        details: "Fitness Tracking | Bluetooth",
        icon: "⌚",
        category: "Watches"
    }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("shopkartCart")) || [];


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(productList = products) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px;background:white;border-radius:10px;">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    productList.forEach(product => {

        const productHTML = `
            <div class="product">

                <div class="wishlist" onclick="toggleWishlist(this)">
                    ♡
                </div>

                <div class="product-image">
                    ${product.icon}
                </div>

                <div class="product-content">

                    <div class="rating">
                        ⭐ ${product.rating}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="details">
                        ${product.details}
                    </p>

                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                        <del>
                            ₹${product.oldPrice.toLocaleString("en-IN")}
                        </del>
                    </div>

                    <p class="discount">
                        ${product.discount}
                    </p>

                    <button
                        class="add-cart"
                        onclick="addToCart('${product.name}', ${product.price})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        container.innerHTML += productHTML;
    });
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();
    updateCart();

    showMessage("✅ Product added to cart");

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "shopkartCart",
        JSON.stringify(cart)
    );

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒
                <h3>Your cart is empty</h3>
                <p>Add products to see them here.</p>
            </div>
        `;

        return;
    }


    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                    <button
                        class="remove"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();
    updateCart();

}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showMessage("Product removed from cart");

}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


// ===============================
// WISHLIST
// ===============================

function toggleWishlist(element) {

    element.classList.toggle("active");

    if (element.classList.contains("active")) {

        element.textContent = "♥";

        showMessage("❤️ Added to wishlist");

    } else {

        element.textContent = "♡";

        showMessage("Removed from wishlist");

    }

}


// ===============================
// SEARCH
// ===============================

function searchProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const selectedCategory =
        document.getElementById("categorySelect").value;


    let filtered = products.filter(product => {

        const matchesText =
            product.name.toLowerCase().includes(searchText) ||
            product.details.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesText && matchesCategory;

    });

    displayProducts(filtered);

    scrollToProducts();

}


// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory(category) {

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);

    scrollToProducts();

    showMessage(category + " products");

}


// ===============================
// SHOW ALL PRODUCTS
// ===============================

function showAllProducts() {

    displayProducts(products);

    scrollToProducts();

}


// ===============================
// SCROLL PRODUCTS
// ===============================

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// MESSAGE
// ===============================

function showMessage(message) {

    const box =
        document.getElementById("messageBox");

    box.textContent = message;

    box.style.display = "block";

    setTimeout(() => {

        box.style.display = "none";

    }, 2000);

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        showMessage("🛒 Your cart is empty");

        return;
    }

    showMessage("✅ Checkout is ready!");

}


// ===============================
// NAVIGATION MESSAGE
// ===============================

function showMessageForNavigation(name) {

    showMessage(name);

}


// ===============================
// INITIAL LOAD
// ===============================

displayProducts();

updateCart();