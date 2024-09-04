document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.querySelector('.cart-summary');
    const totalPriceElement = document.getElementById('total-price');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <img src="Elements/${item.name.toLowerCase().replace(/\s+/g, '')}.jpg" alt="${item.name}">
            <div class="item-info">
                <h2>${item.name}</h2>
                <p class="price">₹${item.price}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-item-name="${item.name}"></p>
            </div>
            <button class="remove-button" onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItemDiv);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'flex';

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (event) => {
            updateQuantity(event.target.dataset.itemName);
        });
    });
});

// Update quantity of an item
function updateQuantity(itemName) {
    const quantityInput = document.querySelector(`.quantity-input[data-item-name="${itemName}"]`);
    const newQuantity = parseInt(quantityInput.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => {
        if (item.name === itemName) {
            item.quantity = newQuantity;
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
}

// Remove item from cart
function removeFromCart(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
}

