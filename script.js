// Initialize EmailJS
(function() {
    emailjs.init("sIyJRex9GWYK4DwEz"); // Replace with your EmailJS user ID
})();

let cart = [];

// Sample menu items with prices and descriptions
const menuItems = [
    { name: 'Pizza', price: 10, description: 'A delicious cheesy pizza with fresh toppings.' },
    { name: 'Burger', price: 8, description: 'Juicy grilled burger with lettuce, tomato, and cheese.' },
    { name: 'Pasta', price: 12, description: 'Classic Italian pasta with rich marinara sauce.' },
    { name: 'Salad', price: 7, description: 'Fresh green salad with a mix of vegetables.' },
    { name: 'Dessert', price: 5, description: 'A sweet treat to finish your meal.' }
];

// Function to create menu
function createMenu() {
    const menuDiv = document.getElementById('menu');
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `
            <span><strong>${item.name}</strong> - $${item.price}</span>
            <p>${item.description}</p> <!-- Add description here -->
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.name}', 'minus')">-</button>
                <span id="quantity-${item.name}">0</span>
                <button onclick="updateQuantity('${item.name}', 'plus')">+</button>
            </div>
        `;
        menuDiv.appendChild(div);
    });
}

// Function to update quantity
function updateQuantity(itemName, action) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    let quantity = parseInt(quantityElement.textContent);

    if (action === 'plus') {
        quantity++;
    } else if (action === 'minus' && quantity > 0) {
        quantity--;
    }

    quantityElement.textContent = quantity;

    if (quantity > 0) {
        addToCart(itemName, quantity);
    } else {
        removeFromCart(itemName);
    }
}

// Function to add items to the cart
function addToCart(itemName, quantity) {
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity = quantity;
    } else {
        cart.push({ name: itemName, price: menuItems.find(i => i.name === itemName).price, quantity: quantity });
    }
    showPopup(`${itemName} added to cart!`);
    document.getElementById('checkout-btn').style.display = 'block'; // Show checkout button
}

// Function to remove items from the cart
function removeFromCart(itemName) {
    cart = cart.filter(i => i.name !== itemName);
}

// Function to show popup notification
function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000); // Show for 2 seconds
}

// Function to go to checkout page

function goToCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in local storage
    window.location.href = 'checkout.html'; // Navigate to checkout page
}

// Initialize menu
createMenu();
