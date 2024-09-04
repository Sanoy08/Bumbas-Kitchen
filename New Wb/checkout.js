document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const altPhone = document.getElementById('alt-phone').value.trim();

        // Regular expression to validate Indian phone numbers
        const phonePattern = /^[6-9]\d{9}$/;

        if (!phonePattern.test(altPhone)) {
            notification.textContent = 'Give a Valid Number';
            notification.style.display = 'block';

            // Clear the invalid phone number input
            document.getElementById('alt-phone').value = '';
            return;
        }

        // Hide notification if phone number is valid
        notification.style.display = 'none';

        // Prepare order details
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let orderDetails = '';

        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            orderDetails += `${item.quantity} x ${item.name} (₹${item.price.toFixed(2)}) = ₹${itemTotal.toFixed(2)}\n`;
        });

        const message = `
            Name: ${name}
            Address: ${address}
            Alternate Phone: ${altPhone}
            
            ----- Order Details -----
            ${orderDetails}
            Subtotal: ₹${subtotal.toFixed(2)}
        `;

        // Encode message and prepare WhatsApp link
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/918240690254?text=${encodedMessage}`;

        // Debugging output
        console.log('Message:', message);
        console.log('Encoded Message:', encodedMessage);
        console.log('WhatsApp Link:', whatsappLink);

        // Test WhatsApp link in a new tab/window
        window.location.href = whatsappLink;

        // Clear cart after order is placed
        localStorage.removeItem('cart');
    });
});
