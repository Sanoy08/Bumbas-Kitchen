document.addEventListener('DOMContentLoaded', () => {
    // Create and append the Back-to-Top button
    const createBackToTopButton = () => {
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
        return backToTopButton;
    };

    // Show or hide the Back-to-Top button based on scroll position
    const handleScroll = (button) => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    };

    // Smooth scroll back to top when the button is clicked
    const handleBackToTopClick = (button) => {
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Update menu items based on search input
    const updateMenuItems = (searchInput, menuItems, noResults) => {
        const query = searchInput.value.trim().toLowerCase();
        let hasResults = false;

        menuItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            if (name.includes(query)) {
                item.style.display = 'block';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });

        noResults.style.display = hasResults ? 'none' : 'block';
    };

    // Debounce function to limit the rate of the search input handling
    const debounce = (func, wait = 200) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Update the dish information in the menu
    const updateMenuItemsData = (menuItems) => {
        menuItems.forEach(item => {
            const dataName = item.getAttribute('data-name');
            const link = item.querySelector('a');
            const image = link.querySelector('img');
            const itemInfo = item.querySelector('.item-info');

            // Extract the dish name and price from data-name
            const [dishName, price] = dataName.split('₹').map(part => part.trim());

            // Set the item name and price
            itemInfo.querySelector('h2').textContent = dishName;
            itemInfo.querySelector('.price').textContent = `₹${price}`;

            // Update the link with the correct dish details
            const url = new URL(link.href, window.location.href);
            url.searchParams.set('name', dishName);
            url.searchParams.set('description', `Delicious ${dishName} with a great taste.`);
            url.searchParams.set('price', `${price}`);
            url.searchParams.set('image', `Elements/${dishName.toLowerCase().replace(/\s+/g, '')}.jpg`);
            link.href = url.toString();

            // Update the image source and alt text
            image.src = `Elements/${dishName.toLowerCase().replace(/\s+/g, '')}.jpg`;
            image.alt = dishName;
        });
    };

    // GSAP Animations
    const animateMenuItems = () => {
        gsap.utils.toArray('.menu-item').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%", // Adjust the start position of the animation
                    end: "top 50%",   // Adjust the end position of the animation
                    scrub: true,      // Smoothly animate as you scroll
                },
                y: 50,              // Start position for the animation (50px below the original position)
                opacity: 0,        // Start opacity (invisible)
                duration: 1,       // Duration of the animation
                ease: "power2.out" // Animation easing
            });
        });
    };
    
    

    // Main Function to Initialize All Features
    const init = () => {
        const backToTopButton = createBackToTopButton();
        handleScroll(backToTopButton);
        handleBackToTopClick(backToTopButton);

        const searchInput = document.getElementById('search-input');
        const menuItems = document.querySelectorAll('.menu-item');
        const noResults = document.getElementById('no-results');

        const debouncedUpdateMenuItems = debounce(() => updateMenuItems(searchInput, menuItems, noResults));
        searchInput.addEventListener('input', debouncedUpdateMenuItems);

        updateMenuItemsData(menuItems);
        animateMenuItems(); // Call the GSAP animation function
    };

    init();
});
document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dishName = urlParams.get('name');
    const dishDescription = urlParams.get('description');
    const dishPrice = urlParams.get('price');
    const dishImage = urlParams.get('image');

    // Set dish details on the page
    if (dishName) document.getElementById('dish-name').textContent = dishName;
    if (dishDescription) document.getElementById('dish-description').textContent = dishDescription;
    if (dishPrice) document.getElementById('dish-price').textContent = `₹${dishPrice}`;
    if (dishImage) document.getElementById('dish-image').src = dishImage;

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
        }, 3000); // Display for 3 seconds
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    // Smoothly scroll the cart button into view when the page loads
    const cartButton = document.getElementById('cart-button');
    cartButton.scrollIntoView({ behavior: 'smooth', block: 'end' });
});
