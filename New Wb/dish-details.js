document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dishName = urlParams.get('name');
    const dishDescription = urlParams.get('description');
    const dishPrice = urlParams.get('price');
    const dishImage = urlParams.get('image');

    // Set dish details on the page
    document.getElementById('dish-name').textContent = dishName;
    document.getElementById('dish-description').textContent = dishDescription;
    document.getElementById('dish-price').textContent = `₹${dishPrice}`;
    document.getElementById('dish-image').src = dishImage;

    // Add to Cart functionality
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === dishName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: dishName, description: dishDescription, price: parseFloat(dishPrice), quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Show sliding notification
        showNotification(quantity, dishName);
    });

    // Function to show a sliding notification
    function showNotification(quantity, itemName) {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');

        // Format the notification message
        notificationMessage.textContent = `Added ${quantity} plate${quantity > 1 ? 's' : ''} of "${itemName}" to Your Cart`;
        notification.classList.add('show'); // Slide in

        // Automatically hide the notification after a few seconds
        setTimeout(() => {
            notification.classList.remove('show'); // Slide out
            notification.classList.add('hide');
            setTimeout(() => {
                notification.classList.remove('hide'); // Reset position
            }, 500); // Duration of the slide-out transition
        }, 1000); // Display for 1 seconds
    }
});
