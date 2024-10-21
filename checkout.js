// Initialize EmailJS
(function() {
    emailjs.init("sIyJRex9GWYK4DwEz"); // Replace with your EmailJS user ID
})();

// Function to display the order in a table on the checkout page
function displayOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from local storage
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    
    orderList.innerHTML = ''; // Clear previous order
    let totalPrice = 0;

    // Create table for order details
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    
    const tbody = table.querySelector('tbody');

    // Populate table with cart items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal; // Calculate total price

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr); // Add row to table
    });

    // Append total price row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2" style="text-align: right;"><strong>Total:</strong></td>
        <td>$${totalPrice.toFixed(2)}</td>
    `;
    tbody.appendChild(totalRow); // Add total row to table

    orderList.appendChild(table); // Add table to order list
    totalPriceElement.textContent = totalPrice.toFixed(2); // Update total price display
}

// Function to remove all items from the cart
function removeAll() {
    localStorage.removeItem('cart'); // Clear the cart from local storage
    displayOrder(); // Refresh the order display
}

// Function to place an order
function placeOrder() {
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const specialMessage = document.getElementById('special-message').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from local storage

    // Prepare order details as plain text for the email
    let orderDetailsText = 'Order Details:\n\n'; // Start with the order details title
    let totalPrice = 0; // Initialize total price

    // Populate order details text
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal; // Update total price
        orderDetailsText += `${item.name}: Quantity: ${item.quantity}, Price: $${itemTotal.toFixed(2)}\n`;
    });

    orderDetailsText += `\nTotal: $${totalPrice.toFixed(2)}\n`; // Append total price

    // Prepare the email parameters
    const templateParams = {
        phone: phone,
        email: email,
        message: specialMessage,
        orderDetails: orderDetailsText, // Send the plain text string
    };

    // Send email
    emailjs.send('service_vmu1wg9', 'template_hsyesw3', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Order placed successfully!');
            localStorage.removeItem('cart'); // Clear the cart
            goBackToMenu(); // Navigate back to the menu
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to place the order. Please try again.');
        });
}

// Function to go back to menu
function goBackToMenu() {
    window.location.href = 'index.html'; // Navigate back to menu page
}

// Display the order when the page loads
window.onload = displayOrder;
