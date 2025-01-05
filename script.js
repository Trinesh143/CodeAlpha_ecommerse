// Sample products (would typically be fetched from the backend)
const products = [
    { id: 1, name: "Product 1", price: 10.00 },
    { id: 2, name: "Product 2", price: 20.00 },
    { id: 3, name: "Product 3", price: 15.00 },
    { id: 4, name: "Product 4", price: 25.00 }
];

const cart = [];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

// Function to add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    displayCart();
}

// Function to display the cart
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        cartItems.appendChild(cartItemDiv);
    });

    totalPrice.textContent = total.toFixed(2);
}

// Function to remove product from the cart
function removeFromCart(productId) {
    const cartIndex = cart.findIndex(item => item.id === productId);
    if (cartIndex > -1) {
        cart[cartIndex].quantity -= 1;
        if (cart[cartIndex].quantity === 0) {
            cart.splice(cartIndex, 1);
        }
    }

    displayCart();
}

// Initialize the page
window.onload = function() {
    displayProducts();
    displayCart();
};
